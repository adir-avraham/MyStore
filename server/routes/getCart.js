const express = require('express');
const router = express.Router();
const carts = require('../database/carts');


router.get('/', async (req, res, next) => {

    try {
        const { _id } = req.decoded._doc;
        const { getCart } = carts;
        const cart = await getCart(_id);
        if (!cart) return res.json({message: "No cart found / created", status: false});
        res.json({cart: cart, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});

module.exports = router;