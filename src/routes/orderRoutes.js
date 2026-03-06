const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.post('/order', orderController.createOrder);
router.get('/order/list', orderController.listOrders);
router.get('/order/:id', orderController.getOrderById);
router.put('/order/:id', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;