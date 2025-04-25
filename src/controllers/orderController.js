const orderService = require('../services/orderService');

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(201).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const OrderData = await orderService.createOrder(req.body);
        res.status(201).json({
            message: 'Order created successfully',
            data: OrderData
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating Order',
            error: error.message
        });
    }
};

const getOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const order = await orderService.getOrderByUserId(userId);

        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error retrieving order' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId, userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const result = await orderService.deleteOrder(orderId, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};

module.exports = { getAllOrders, createOrder, getOrderByUserId, deleteOrder };