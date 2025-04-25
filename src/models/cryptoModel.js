const mongoose = require('mongoose')

const cryptoSchema = new mongoose.Schema({
    crypto_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, symbol: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, current_price: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Crypto', cryptoSchema)