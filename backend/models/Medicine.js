const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Medicine name is required'],
        trim: true
    },
    genericName: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['painkiller', 'antibiotic', 'vitamin', 'antiseptic', 'antacid', 'antihistamine', 'other']
    },
    manufacturer: {
        type: String,
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    description: {
        type: String
    },
    batchNumber: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: 0,
        default: 0
    },
    reorderLevel: {
        type: Number,
        default: 10,
        min: 0
    },
    unitPrice: {
        type: Number,
        required: [true, 'Unit price is required'],
        min: 0
    },
    sellingPrice: {
        type: Number,
        required: [true, 'Selling price is required'],
        min: 0
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required']
    },
    manufacturingDate: {
        type: Date
    },
    dosage: {
        type: String
    },
    unit: {
        type: String,
        enum: ['tablet', 'capsule', 'syrup', 'injection', 'cream', 'drops', 'other'],
        default: 'tablet'
    },
    prescriptionRequired: {
        type: Boolean,
        default: false
    },
    barcode: {
        type: String,
        unique: true,
        sparse: true
    },
    storage: {
        type: String,
        enum: ['room_temperature', 'refrigerated', 'frozen'],
        default: 'room_temperature'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Virtual for stock status
medicineSchema.virtual('stockStatus').get(function() {
    if (this.quantity === 0) return 'out_of_stock';
    if (this.quantity <= this.reorderLevel) return 'low_stock';
    return 'in_stock';
});

// Virtual for expiry status
medicineSchema.virtual('expiryStatus').get(function() {
    const today = new Date();
    const thirtyDays = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    const sixtyDays = new Date(today.getTime() + (60 * 24 * 60 * 60 * 1000));

    if (this.expiryDate < today) return 'expired';
    if (this.expiryDate <= thirtyDays) return 'expiring_soon';
    if (this.expiryDate <= sixtyDays) return 'expiring_next_60_days';
    return 'good';
});

medicineSchema.set('toJSON', { virtuals: true });
medicineSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Medicine', medicineSchema);
