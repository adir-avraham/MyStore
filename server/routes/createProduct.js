const exprees = require('express');
const router = exprees.Router();
const productsData = require('../database/products');


router.post('/', async (req, res, next) => {

    try {
        const { createProduct, getProductsByCategory } = productsData;    
        const createdProduct = await createProduct(req.body);
        const { category_id } = req.body;
        const products = await getProductsByCategory(category_id);
        if (!createdProduct) return res.json({message: "Create product failed", status: false});
        res.json({message: "Product has been created!" ,createdProduct: createdProduct, 
        products: products, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});


module.exports = router;