const express = require('express');
const router = express.Router();
const carts = require('../database/carts');



router.delete('/:cart_id', async (req, res, next) => {

    try {
        const { cart_id } = req.params;
        const { empmtyCart, getCart } = carts;
        const result = await empmtyCart(cart_id);
        const { deletedCount } = result;
        if (!deletedCount) return res.json({message: "Empty cart failed", status: false});
        const { _id } = req.decoded._doc;
        const cart = await getCart(_id);
        res.json({message: "Empty cart success!", cart: cart, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});


module.exports = router;