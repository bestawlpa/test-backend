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

const deleteOrder = async (orderId, userId) => {
    try {
        const order = await Order.findById(orderId);
        if (order.userId.toString() !== userId) {
            throw new Error('You do not have permission to delete this order');
        }
        await order.deleteOne();
        return { message: 'Order deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting order: ' + error.message);
    }
};

module.exports = { getAllOrders, createOrder, getOrderByUserId, deleteOrder };
