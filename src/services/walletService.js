const Wallet = require('../models/walletModel');

const getWalletByUserId = async (userId) => {
    try {
        const wallet = await Wallet.findOne({ userId });
        return wallet;
    } catch (error) {
        throw new Error('Error fetching account');
    }
};

const getAllWallets = async () => {
    try {
        const wallets = await Wallet.find();
        return wallets;
    } catch (error) {
        throw error;
    }
};

const createWallet = async (accountData) => {
    try {
        const newWallet = new Wallet(accountData);
        await newWallet.save();
        return newWallet;
    } catch (error) {
        console.error('Error creating account:', error);
        throw new Error('Error creating account');
    }
};

module.exports = { createWallet, getWalletByUserId, getAllWallets }