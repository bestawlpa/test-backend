const wallettService = require('../services/walletService');

const getAllWallets = async (req, res) => {
    try {
        const accounts = await wallettService.getAllWallets();
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getWalletByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);

        const wallet = await wallettService.getWalletByUserId(userId);

        if (!wallet) {
            return res.status(404).json({ message: 'wallet not found' });
        }

        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error retrieving wallet' });
    }
};

const createWallet = async (req, res) => {
    try {
        const userId = req.user.id;
        const newWallet = await wallettService.createWallet({
            userId: userId,
            cryptos: [],
            balance: 0,
        });

        res.status(201).json({
            message: 'Wallet created successfully!',
            account: newWallet
        });
    } catch (error) {
        console.error('Error creating wallet:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getWalletByUserId, createWallet, getAllWallets };