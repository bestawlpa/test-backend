require('dotenv').config();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY
const bcrypt = require('bcrypt');
const walletService = require('../services/walletService')

const createUser = async (req, res) => {
    try {
        const { password } = req.body;
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({
                message: 'Password must contain at least one uppercase letter.'
            });
        }

        if (!/[0-9]/.test(password)) {
            return res.status(400).json({
                message: 'Password must contain at least one number.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long.'
            });
        }

        const user = await userService.createUser(req.body);
        console.log('Created user:', user);

        let userWallet = await walletService.getWalletByUserId(user._id);
        console.log('Found wallet:', userWallet);
        if (!userWallet) {
            console.log('Creating wallet for user:', user._id);
            userWallet = await walletService.createWallet({
                userId: user._id,
                balance: 0,
                cryptos: []
            });
            console.log('Wallet created:', userWallet);
        }

        res.status(201).json({
            message: 'User created successfully!',
            data: user
        });
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                return res.status(400).json({ message: 'Email is already in use. Please choose another one.' });
            } else {
                return res.status(400).json({ message: 'Username is already in use. Please choose another one.' });
            }
        } else {

            return res.status(400).json({ message: error.message || 'Error occurred during user creation.' });
        }
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        const result = users.map(user => ({
            _id: user._id,
            username: user.username,
            email: user.email,
        }))
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email: email });
    } catch (error) {
        throw error;
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.cookie('jwtToken', token, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createUser, getAllUsers, getUserByEmail, userLogin }