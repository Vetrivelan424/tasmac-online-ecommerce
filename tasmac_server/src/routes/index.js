const express = require('express');
const ProductController = require('../controllers/product.controller');
const OrderController = require('../controllers/order.controller');

const router = express.Router();

// Product routes
router.get('/products', ProductController.getAllProducts.bind(ProductController));
router.get('/products/:id', ProductController.getProductById.bind(ProductController));

// Order routes
router.post('/orders', OrderController.createOrder.bind(OrderController));
router.get('/orders/:id', OrderController.getOrderById.bind(OrderController));
router.get('/orders/number/:orderNumber', OrderController.getOrderByNumber.bind(OrderController));
router.post('/orders/validate-address', OrderController.validateAddressEndpoint.bind(OrderController));

module.exports = router;