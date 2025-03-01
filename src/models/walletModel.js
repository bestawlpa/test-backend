const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cryptos: {
        type: [{
            crypto_id: { type: String, required: true },
            crypto_name: { type: String, required: true },
            current_price: { type: Number, required: true },
            symbol: { type: String, required: true },
            quantity: { type: Number, default: 0 }
        }],
        default: []
    },
    balance: { type: Number, default: 0, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);