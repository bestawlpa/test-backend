const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/models/userModel');
const Wallet = require('../src/models/walletModel');
const Crypto = require('../src/models/cryptoModel')
const Transaction = require('../src/models/transactionModel')
const userService = require('../src/services/userService')
const walletService = require('../src/services/walletService')
const Order = require('../src/models/orderModel')

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB Connected');
        seedData();
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
connectDB()

const seedData = async () => {
    try {
        await User.deleteMany({});
        await Crypto.deleteMany({});
        await Wallet.deleteMany({});
        await Transaction.deleteMany({});
        await Order.deleteMany({});


        const newCrypto = [
            {
                crypto_name: 'bitcoin',
                symbol: 'BTC',
                current_price: 63000
            },
            {
                crypto_name: 'ethereum',
                symbol: 'ETH',
                current_price: 3400,
            }
        ];

        const newUsers = [
            {
                username: 'test',
                email: 'test@example.com',
                password: 'Testuser12',
            }
        ];

        for (const userData of newUsers) {
            const user = await userService.createUser(userData);

            let userWallet = await walletService.getWalletByUserId(user._id);
            if (!userWallet) {
                userWallet = await walletService.createWallet({
                    userId: user._id,
                    balance: 0,
                });
            }
        }

        const newTransaction = [
            {
                userId: 'sdasd2342342df34',
                walletId: '123456789',
                amount: 1000,
                transaction_type: 'BUY'
            }
        ];

        const newOrder = [
            {
                userId: 'user123',
                transaction_id: 'txn789',
                transaction_type: 'BUY',
                crypto_id: 'BTC',
                crypto_pair: 'BTC/USDT',
                crypto_price: 45000.50,
                quantity: 0.01,
                status: 'OPEN'
            }
        ];


        await Crypto.insertMany(newCrypto);
        await Transaction.insertMany(newTransaction);
        await Order.insertMany(newOrder);

        console.log('Data seeding complete');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding data', err);
    }
};
