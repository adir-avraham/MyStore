const express = require('express');
const router = express.Router();
const carts = require('../database/carts');


router.post('/', async (req, res, next) => {

    try {
        const { addCartItem, getCart } = carts; 
        const addedCartItem = await addCartItem(req.body);
        if (!addedCartItem) return ({message: "Add a product failed", status: false});
        const { _id } = req.decoded._doc;
        const cart = await getCart(_id);
        res.json({ cart: cart, status: true});
    } catch (error) {
        res.json({error: error.message, message: "An error occurred", status: false});
    }
});

module.exports = router;