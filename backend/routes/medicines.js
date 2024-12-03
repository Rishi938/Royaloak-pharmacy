const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   GET /api/medicines
// @desc    Get all medicines
// @access  Private
router.get('/', async (req, res) => {
    try {
        const { category, search, lowStock, expiring } = req.query;
        let query = { isActive: true };

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { genericName: { $regex: search, $options: 'i' } },
                { manufacturer: { $regex: search, $options: 'i' } }
            ];
        }

        if (lowStock === 'true') {
            query.$expr = { $lte: ['$quantity', '$reorderLevel'] };
        }

        const medicines = await Medicine.find(query)
            .populate('supplier', 'name companyName')
            .sort({ createdAt: -1 });

        // Filter expiring if needed
        let filteredMedicines = medicines;
        if (expiring === 'true') {
            const thirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            filteredMedicines = medicines.filter(m => new Date(m.expiryDate) <= thirtyDays);
        }

        res.json({
            success: true,
            count: filteredMedicines.length,
            data: filteredMedicines
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/medicines/:id
// @desc    Get single medicine
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id)
            .populate('supplier', 'name companyName phone email');

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }

        res.json({
            success: true,
            data: medicine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   POST /api/medicines
// @desc    Create medicine
// @access  Private (Pharmacist, Manager, Admin)
router.post('/', authorize('pharmacist', 'manager', 'admin'), async (req, res) => {
    try {
        const medicine = await Medicine.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Medicine added successfully',
            data: medicine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/medicines/:id
// @desc    Update medicine
// @access  Private (Pharmacist, Manager, Admin)
router.put('/:id', authorize('pharmacist', 'manager', 'admin'), async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }

        res.json({
            success: true,
            message: 'Medicine updated successfully',
            data: medicine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   DELETE /api/medicines/:id
// @desc    Delete medicine (soft delete)
// @access  Private (Admin only)
router.delete('/:id', authorize('admin'), async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }

        res.json({
            success: true,
            message: 'Medicine deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/medicines/stats/summary
// @desc    Get medicine statistics
// @access  Private
router.get('/stats/summary', async (req, res) => {
    try {
        const total = await Medicine.countDocuments({ isActive: true });
        const lowStock = await Medicine.countDocuments({
            isActive: true,
            $expr: { $lte: ['$quantity', '$reorderLevel'] }
        });
        const outOfStock = await Medicine.countDocuments({
            isActive: true,
            quantity: 0
        });

        const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const expiringSoon = await Medicine.countDocuments({
            isActive: true,
            expiryDate: { $lte: thirtyDaysFromNow, $gte: new Date() }
        });

        res.json({
            success: true,
            data: {
                total,
                lowStock,
                outOfStock,
                expiringSoon
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
