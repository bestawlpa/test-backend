const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    walletId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transaction_type: {
        type: String,
        enum: ['BUY', 'SELL', 'TRANSFER', 'WITHDRAW'],
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING'
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);