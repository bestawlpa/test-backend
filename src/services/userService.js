const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const createUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({ ...userData, password: hashedPassword });
        await user.save();
        return user;
    } catch (error) {
        throw error
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email: email });
    } catch (error) {
        throw error;
    }
};

module.exports = { createUser, getAllUsers, getUserByEmail }
























