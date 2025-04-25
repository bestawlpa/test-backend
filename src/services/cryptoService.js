const Crypto = require('../models/cryptoModel');

const createCrypto = async (cryptoData) => {
    try {
        const crypto = await Crypto.insertMany(cryptoData);
        return crypto;
    } catch (error) {
        throw new Error('Error creating crypto: ' + error.message);
    }
}

const getAllCryptos = async () => {
    try {
        const crypto = await Crypto.find()
        return crypto;
    } catch (error) {
        throw new Error('Error fetching crypto: ' + error.message);
    }
};

module.exports = { createCrypto, getAllCryptos }