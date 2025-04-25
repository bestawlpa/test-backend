const cryptoService = require('../services/cryptoService');

const createCrypto = async (req, res) => {
    try {
        const crypto = await cryptoService.createCrypto(req.body);
        res.status(201).json(crypto)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllCryptos = async (req, res) => {
    try {
        const cryptos = await cryptoService.getAllCryptos();
        res.status(200).json(cryptos)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { createCrypto, getAllCryptos }