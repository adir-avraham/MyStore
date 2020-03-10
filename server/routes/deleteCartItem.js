const express = require('express');
const router = express.Router();
const carts = require('../database/carts');


router.delete('/', async (req, res, next) => {

    try {
        const { item_id } = req.body;
        if (!item_id) return res.json({message: "No item_id provided", status: false});
        const { deleteCartItem } = carts;
        const deletedItem = await deleteCartItem(item_id);
        if (!deletedItem) return res.json({message: "Delete item failed", status: false});
        res.json({message: "Item deleted successfully", deletedItem: deletedItem, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});


module.exports = router;