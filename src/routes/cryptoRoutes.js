const express = require('express');
const cryptoController = require('../controllers/cryptoController');
const router = express.Router();

router.post('/crypto', cryptoController.createCrypto);
router.get('/cryptos', cryptoController.getAllCryptos);

module.exports = router;