const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Medicine = require('../models/Medicine');
const Customer = require('../models/Customer');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// GET all sales
router.get('/', async (req, res) => {
    try {
        const { startDate, endDate, customer, paymentStatus } = req.query;
        let query = {};

        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (customer) query.customer = customer;
        if (paymentStatus) query.paymentStatus = paymentStatus;

        const sales = await Sale.find(query)
            .populate('customer', 'name email phone')
            .populate('soldBy', 'fullName username')
            .populate('items.medicine', 'name')
            .sort({ createdAt: -1 })
            .limit(100);

        res.json({
            success: true,
            count: sales.length,
            data: sales
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET single sale
router.get('/:id', async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id)
            .populate('customer')
            .populate('soldBy', 'fullName username')
            .populate('items.medicine');

        if (!sale) {
            return res.status(404).json({ success: false, message: 'Sale not found' });
        }

        res.json({ success: true, data: sale });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST create sale
router.post('/', async (req, res) => {
    try {
        const { customer, customerName, items, paymentMethod, discount, notes } = req.body;

        // Calculate totals and update inventory
        let subtotal = 0;
        const processedItems = [];

        for (const item of items) {
            const medicine = await Medicine.findById(item.medicine);

            if (!medicine) {
                return res.status(404).json({
                    success: false,
                    message: `Medicine ${item.medicine} not found`
                });
            }

            if (medicine.quantity < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${medicine.name}. Available: ${medicine.quantity}`
                });
            }

            const itemSubtotal = medicine.sellingPrice * item.quantity;
            subtotal += itemSubtotal;

            processedItems.push({
                medicine: medicine._id,
                medicineName: medicine.name,
                quantity: item.quantity,
                unitPrice: medicine.sellingPrice,
                subtotal: itemSubtotal,
                discount: item.discount || 0
            });

            // Update medicine stock
            medicine.quantity -= item.quantity;
            await medicine.save();
        }

        const tax = subtotal * 0.05; // 5% tax
        const totalDiscount = discount || 0;
        const total = subtotal + tax - totalDiscount;

        const sale = await Sale.create({
            customer,
            customerName,
            items: processedItems,
            subtotal,
            tax,
            discount: totalDiscount,
            total,
            paymentMethod,
            soldBy: req.user.id,
            amountPaid: total,
            notes
        });

        // Update customer total purchases
        if (customer) {
            await Customer.findByIdAndUpdate(customer, {
                $inc: { totalPurchases: total }
            });
        }

        res.status(201).json({
            success: true,
            message: 'Sale created successfully',
            data: sale
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET sales stats
router.get('/stats/summary', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todaySales = await Sale.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: '$total' }, count: { $sum: 1 } } }
        ]);

        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthlySales = await Sale.aggregate([
            { $match: { createdAt: { $gte: thisMonth } } },
            { $group: { _id: null, total: { $sum: '$total' }, count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                today: todaySales[0] || { total: 0, count: 0 },
                thisMonth: monthlySales[0] || { total: 0, count: 0 }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
