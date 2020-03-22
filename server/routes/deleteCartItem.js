const express = require('express');
const router = express.Router();
const carts = require('../database/carts');



router.delete('/:item_id', async (req, res, next) => {

    try {
        const { item_id } = req.params;
        if (!item_id) return res.json({message: "No item_id provided", status: false});
        const { deleteCartItem, getCart } = carts;
        const deletedItem = await deleteCartItem(item_id);
        if (!deletedItem) return res.json({message: "Delete item failed", status: false});
        const { _id } = req.decoded._doc;
        const cart = await getCart(_id);
        res.json({message: "Item deleted successfully", cart: cart, deletedItem: deletedItem, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});

module.exports = router;