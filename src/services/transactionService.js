const Transaction = require('../models/transactionModel');

const getAllTransaction = async () => {
    try {
        const transactions = await Transaction.find();
        return transactions
    } catch (error) {
        throw error;
    }
};

const createTransaction = async (transactionData) => {
    try {
        const newTransaction = new Transaction(transactionData);
        await newTransaction.save();
        return newTransaction;
    } catch (error) {
        throw new Error('Error creating transaction: ' + error.message);
    }
};

const getTransactionByUserId = async (userId) => {
    try {
        const transaction = Transaction.findOne({ userId });
        return transaction
    } catch (error) {
        throw new Error('Error fetching transaction');
    }
};

module.exports = { getAllTransaction, createTransaction, getTransactionByUserId }