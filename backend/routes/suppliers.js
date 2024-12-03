const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, count: suppliers.length, data: suppliers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });
        res.json({ success: true, data: supplier });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', authorize('manager', 'admin'), async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json({ success: true, message: 'Supplier added successfully', data: supplier });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id', authorize('manager', 'admin'), async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });
        res.json({ success: true, message: 'Supplier updated successfully', data: supplier });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/:id', authorize('admin'), async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });
        res.json({ success: true, message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
