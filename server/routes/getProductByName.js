const express = require('express');
const router = express.Router();
const productsData = require('../database/products');



router.get('/:name', async (req, res, next) => {

    try {
        const { name } = req.params;
        const { getProductByName } = productsData;
        const product = await getProductByName(name);
        if (!product.length) return res.json({message: "No products found", status: false});
        res.json({product: product, status: true});
    } catch (error) {
        res.json({error: error.message, message: "An error occurred..", status: false});
    }
});

module.exports = router;