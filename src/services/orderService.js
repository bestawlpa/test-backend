const Order = require('../models/orderModel')

const getAllOrders = async () => {
    try {
        const orders = await Order.find();
        return orders
    } catch (error) {
        throw new Error('Error fetching order: ' + error.message);
    }
};

const createOrder = async (transactionData) => {
    try {
        const newOrder = new Order(transactionData);
        await newOrder.save();
        return newOrder;
    } catch (error) {
        throw new Error('Error creating transaction: ' + error.message);
    }
};

const getOrderByUserId = async (userId) => {
    try {
        const order = Order.findOne({ userId });
        return order;
    } catch (error) {
        throw new Error('Error fetching transaction');
    }
};


module.exports = { getAllOrders, createOrder, getOrderByUserId }