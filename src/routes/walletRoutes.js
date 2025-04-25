const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.get('/wallet', walletController.getAllWallets)
router.post('/wallet/create', walletController.createWallet);
router.get('/wallet/:userId', walletController.getWalletByUserId);

module.exports = router;
