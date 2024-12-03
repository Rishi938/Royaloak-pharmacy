const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
    },
    medicineName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unitCost: {
        type: Number,
        required: true,
        min: 0
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    batchNumber: String,
    expiryDate: Date
});

const purchaseSchema = new mongoose.Schema({
    purchaseOrderNumber: {
        type: String,
        required: true,
        unique: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    items: [purchaseItemSchema],
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    tax: {
        type: Number,
        default: 0,
        min: 0
    },
    shipping: {
        type: Number,
        default: 0,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    expectedDelivery: {
        type: Date
    },
    actualDelivery: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'ordered', 'received', 'partial', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'partial', 'paid'],
        default: 'unpaid'
    },
    amountPaid: {
        type: Number,
        default: 0
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    invoiceNumber: {
        type: String
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Generate PO number
purchaseSchema.pre('save', async function(next) {
    if (!this.purchaseOrderNumber) {
        const count = await this.constructor.countDocuments();
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        this.purchaseOrderNumber = `PO-${year}${month}-${String(count + 1).padStart(5, '0')}`;
    }
    next();
});

module.exports = mongoose.model('Purchase', purchaseSchema);
