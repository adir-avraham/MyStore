const express = require('express');
const router = express.Router();
const productsData = require('../database/products');


router.put('/', async (req, res, next) =>{

    try {
        const { editProduct, getProductsByCategory } = productsData;
        const editedProduct = await editProduct(req.body);
        if (!editedProduct) return res.json({message: "Edit product failed", status: false});
        const { category_id } = req.body;
        const products = await getProductsByCategory(category_id);
        res.json({message: "Product has been edited!", products: products, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});


module.exports = router;