const express = require('express');
const router = express.Router();
const products = require('../database/products');
const orders = require('../database/orders');


router.get('/products', async (req, res, next) => {
    try {
        const { getNumOfProducts } = products;
        const numOfProducts = await getNumOfProducts();
        res.json({numOfProducts: numOfProducts, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});

router.get('/orders', async (req, res, next) => {
    try {
        const { getNumOfOrders } = orders;
        const numOfOrders = await getNumOfOrders();
        res.json({numOfOrders: numOfOrders, status: true});
    } catch (error) {
        res.json({error: error.message, status: false})
    }
});

module.exports = router;