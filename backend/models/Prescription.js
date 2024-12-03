const mongoose = require('mongoose');

const prescriptionItemSchema = new mongoose.Schema({
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    instructions: {
        type: String
    }
});

const prescriptionSchema = new mongoose.Schema({
    prescriptionNumber: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    doctorLicense: {
        type: String
    },
    doctorPhone: {
        type: String
    },
    diagnosis: {
        type: String
    },
    medications: [prescriptionItemSchema],
    issueDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    refillsAllowed: {
        type: Number,
        default: 0,
        min: 0
    },
    refillsRemaining: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'filled', 'cancelled'],
        default: 'active'
    },
    notes: {
        type: String
    },
    filledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    filledDate: {
        type: Date
    }
}, {
    timestamps: true
});

// Generate prescription number
prescriptionSchema.pre('save', async function(next) {
    if (!this.prescriptionNumber) {
        const count = await this.constructor.countDocuments();
        const date = new Date();
        const year = date.getFullYear();
        this.prescriptionNumber = `RX-${year}-${String(count + 1).padStart(6, '0')}`;
    }
    next();
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
