const express = require('express');
const router = express.Router();
const carts = require('../database/carts');


router.post('/', async (req, res, next) => {

    try {
        const { user_id } = req.body
        const { createCart } = carts;
        const cart = await createCart(user_id);
        if (!cart) return res.json({message: "no cart creeated", status: false});
        res.json({cart: cart, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }

});


module.exports = router;