const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    transaction_id: {
        type: String,
        required: true,
    },
    transaction_type: {
        type: String,
        required: true,
    },
    crypto_id: {
        type: String,
        required: true,
    },
    crypto_pair: {
        type: String,
        required: true,
    },
    crypto_price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['OPEN', 'COMPLETED', 'CANCELED'],
        default: 'OPEN'
    }
}, { timestamps: true })
module.exports = mongoose.model('Order', orderSchema)