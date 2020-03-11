const express = require('express');
const router = express.Router();
const productsData = require('../database/products');

router.get('/:_id', async (req, res, next) => {
    
    try {
        const { _id } = req.params;
        const { getProductsByCategory } = productsData;
        const products = await getProductsByCategory(_id);
        if (!products) return res.json({message: "No products found", status: false});
        res.json({products: products, status: true});
    } catch (error) {
        res.json({error: error.message, message: "An error occurred..", status: false});
    }

});


module.exports = router;