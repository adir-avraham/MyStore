const express = require('express');
const router = express.Router();
const products_controller = require('../controllers/products');

const { getNumOfProducts, getProductByName, getProductsByCategory,
    editProduct, createProduct 
} = products_controller;


router.get('/getNumOfProducts', getNumOfProducts); 

router.get('/getProductsByCategory/:_id', getProductsByCategory); 

router.get('/getProductByName/:name', getProductByName);

router.put('/editProduct', editProduct);

router.post('/createProduct', createProduct);


module.exports = router;