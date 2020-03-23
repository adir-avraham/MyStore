const exprees = require('express');
const router = exprees.Router();
const products = require('../database/products');


router.post('/', async (req, res, next) => {

    try {

        const { createProduct } = products;    
        const createdProduct = await createProduct(req.body);
    
        res.json({message: "Product has been created!" ,createdProduct: createdProduct, status: true});
   
    } catch (error) {
        res.json({error: error.message, status: false});
    }

});


module.exports = router;