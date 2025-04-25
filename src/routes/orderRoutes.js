const express = require('express');
const orderController = require('../controllers/orderController')
const router = express.Router();

router.get('/orders', orderController.getAllOrders);
router.get('/order/:userId', orderController.getOrderByUserId);
router.post('/order', orderController.createOrder);
router.delete('/order/:orderId/:userId', orderController.deleteOrder);

module.exports = router;