const transactionService = require('../services/transactionService');

const getAllTransaction = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransaction();
        res.status(200).json(transactions)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createTransaction = async (req, res) => {
    try {
        const transactionData = await transactionService.createTransaction(req.body);
        res.status(201).json({
            message: 'Transaction created successfully',
            data: transactionData
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating transaction',
            error: error.message
        });
    }
};

const getTransactionByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const transaction = await transactionService.getTransactionByUserId(userId);

        if (!transaction) {
            return res.status(404).json({ message: 'transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error retrieving transaction' });
    }
};

module.exports = { getAllTransaction, createTransaction, getTransactionByUserId }