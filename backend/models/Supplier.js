const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Supplier name is required'],
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    alternatePhone: {
        type: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: { type: String, default: 'USA' }
    },
    taxId: {
        type: String
    },
    licenseNumber: {
        type: String
    },
    bankDetails: {
        bankName: String,
        accountNumber: String,
        ifscCode: String,
        accountHolderName: String
    },
    paymentTerms: {
        type: String,
        enum: ['immediate', 'net_15', 'net_30', 'net_60', 'net_90'],
        default: 'net_30'
    },
    creditLimit: {
        type: Number,
        default: 0,
        min: 0
    },
    totalPurchases: {
        type: Number,
        default: 0,
        min: 0
    },
    outstandingBalance: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    isActive: {
        type: Boolean,
        default: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);
