const express = require('express');
const router = express.Router();
const carts_controller = require('../controllers/carts');

const { addCartItem, deleteCartItem, empmtyCart, getCart } = carts_controller;


router.post('/addCartItem', addCartItem);

router.delete('/deleteCartItem/:item_id', deleteCartItem);

router.delete('/emptyCart/:cart_id', empmtyCart);

router.get('/getCart', getCart);


module.exports = router;