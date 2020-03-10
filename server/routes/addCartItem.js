const express = require('express');
const router = express.Router();
const carts = require('../database/carts');

router.post('/', async (req, res, next) => {

    try {
        const { addCartItem } = carts; 
        const addedCartItem = await addCartItem(req.body);
        if (!addedCartItem) return ({message: "Add a product failed", status: false});
        res.json({addedCartItem: addedCartItem, status: true});
    } catch (error) {
        res.json({error: error.message, message: "An error occurred", status: false});
    }

});

module.exports = router;