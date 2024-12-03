const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Medicine = require('../models/Medicine');
const Customer = require('../models/Customer');
const { protect } = require('../middleware/auth');

router.use(protect);

// GET dashboard summary
router.get('/dashboard', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalMedicines = await Medicine.countDocuments({ isActive: true });
        const lowStock = await Medicine.countDocuments({ isActive: true, $expr: { $lte: ['$quantity', '$reorderLevel'] } });
        const totalCustomers = await Customer.countDocuments({ isActive: true });

        const todaySalesData = await Sale.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: '$total' }, count: { $sum: 1 } } }
        ]);

        const todaySales = todaySalesData[0] || { total: 0, count: 0 };

        res.json({
            success: true,
            data: {
                totalMedicines,
                lowStock,
                totalCustomers,
                todaySales: todaySales.total,
                todayTransactions: todaySales.count
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET sales report
router.get('/sales', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let match = {};

        if (startDate && endDate) {
            match.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const salesData = await Sale.aggregate([
            { $match: match },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    total: { $sum: '$total' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({ success: true, data: salesData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET inventory report
router.get('/inventory', async (req, res) => {
    try {
        const medicines = await Medicine.find({ isActive: true }).select('name category quantity reorderLevel unitPrice sellingPrice expiryDate');

        const totalValue = medicines.reduce((sum, med) => sum + (med.quantity * med.unitPrice), 0);
        const lowStockItems = medicines.filter(med => med.quantity <= med.reorderLevel);

        const today = new Date();
        const thirtyDays = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        const expiringSoon = medicines.filter(med => new Date(med.expiryDate) <= thirtyDays && new Date(med.expiryDate) >= today);

        res.json({
            success: true,
            data: {
                totalMedicines: medicines.length,
                totalValue,
                lowStockCount: lowStockItems.length,
                lowStockItems,
                expiringSoonCount: expiringSoon.length,
                expiringSoon
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET top selling medicines
router.get('/top-selling', async (req, res) => {
    try {
        const topSelling = await Sale.aggregate([
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.medicineName',
                    totalQuantity: { $sum: '$items.quantity' },
                    totalRevenue: { $sum: '$items.subtotal' },
                    salesCount: { $sum: 1 }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 10 }
        ]);

        res.json({ success: true, data: topSelling });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
