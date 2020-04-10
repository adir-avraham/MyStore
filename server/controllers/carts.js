const carts = require('../database/carts');


exports.addCartItem = async (req, res, next) => {
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
};


exports.deleteCartItem = async (req, res, next) => {
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
};


exports.empmtyCart = async (req, res, next) => {
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
};


exports.getCart = async (req, res, next) => {
    try {
        const { _id } = req.decoded._doc;
        const { getCart } = carts;
        const cart = await getCart(_id);
        if (!cart) return res.json({message: "No cart found / created", status: false});
        res.json({cart: cart, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
};