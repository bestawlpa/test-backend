const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.get('/transactions', transactionController.getAllTransaction);
router.post('/transaction', transactionController.createTransaction);
router.get('/transaction/:userId', transactionController.getTransactionByUserId);

module.exports = router;