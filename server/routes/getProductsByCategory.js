const express = require('express');
const router = express.Router();
const productsData = require('../database/products');

router.get('/', async (req, res, next) => {
    
    try {
        const { category_id } = req.body;
      
        const { getProductsByCategory } = productsData;
        const products = await getProductsByCategory(category_id);
        if (!products) return res.json({message: "No products found", status: false});
        res.json({products: products, status: true});
    } catch (error) {
        res.json({error: error.message, message: "An error occurred..", status: false});
    }

});


module.exports = router;