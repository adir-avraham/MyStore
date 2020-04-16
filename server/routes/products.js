const express = require('express');
const router = express.Router();
const products_controller = require('../controllers/products');

const { getNumOfProducts, getProductsByCategory,
    editProduct, createProduct 
} = products_controller;


router.get('/getNumOfProducts', getNumOfProducts); 

router.get('/getProductsByCategory/:_id', getProductsByCategory); 

router.put('/editProduct', editProduct);

router.post('/createProduct', createProduct);


module.exports = router;