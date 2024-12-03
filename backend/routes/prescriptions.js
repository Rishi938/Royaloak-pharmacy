const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const { status, customer } = req.query;
        let query = {};
        if (status) query.status = status;
        if (customer) query.customer = customer;

        const prescriptions = await Prescription.find(query)
            .populate('customer', 'name email phone')
            .populate('medications.medicine', 'name')
            .populate('filledBy', 'fullName')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: prescriptions.length, data: prescriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate('customer')
            .populate('medications.medicine')
            .populate('filledBy');
        if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found' });
        res.json({ success: true, data: prescription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', authorize('pharmacist', 'admin'), async (req, res) => {
    try {
        const prescription = await Prescription.create(req.body);
        res.status(201).json({ success: true, message: 'Prescription created successfully', data: prescription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id/fill', authorize('pharmacist', 'admin'), async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndUpdate(
            req.params.id,
            { status: 'filled', filledBy: req.user.id, filledDate: new Date() },
            { new: true }
        );
        if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found' });
        res.json({ success: true, message: 'Prescription filled successfully', data: prescription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
