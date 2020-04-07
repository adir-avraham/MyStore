const express = require('express');
const router = express.Router();
const productsData = require('../database/products');


router.get('/', async (req, res, next) => {
    
    try {
        const { getProducts } = productsData;
        const products = await getProducts();
        if (!products) return res.json({message: "No products found", status: false});
        res.json({products: products, status: true});
    } catch (error) {
        res.json({error: error.message, message: "An error occurred..", status: false});
    }
});


module.exports = router;