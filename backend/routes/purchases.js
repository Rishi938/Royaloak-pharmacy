const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Medicine = require('../models/Medicine');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const { status, supplier } = req.query;
        let query = {};
        if (status) query.status = status;
        if (supplier) query.supplier = supplier;

        const purchases = await Purchase.find(query)
            .populate('supplier', 'name companyName')
            .populate('orderedBy', 'fullName')
            .populate('receivedBy', 'fullName')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: purchases.length, data: purchases });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', authorize('manager', 'admin'), async (req, res) => {
    try {
        const purchaseData = {
            ...req.body,
            orderedBy: req.user.id
        };
        const purchase = await Purchase.create(purchaseData);
        res.status(201).json({ success: true, message: 'Purchase order created successfully', data: purchase });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id/receive', authorize('pharmacist', 'manager', 'admin'), async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id);
        if (!purchase) return res.status(404).json({ success: false, message: 'Purchase not found' });

        // Update inventory for each item
        for (const item of purchase.items) {
            if (item.medicine) {
                await Medicine.findByIdAndUpdate(item.medicine, { $inc: { quantity: item.quantity } });
            }
        }

        purchase.status = 'received';
        purchase.actualDelivery = new Date();
        purchase.receivedBy = req.user.id;
        await purchase.save();

        res.json({ success: true, message: 'Purchase received and inventory updated', data: purchase });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
