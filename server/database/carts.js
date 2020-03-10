const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
products = require('./products');


async function createCart(user_id) {
    const cart = new Cart({
        user_id: user_id
    })

    const createdCart = await cart.save();

    return createdCart;
}


async function addCartItem(payload) {

    const { product_id, quantity, cart_id } = payload;
    const { getProductPrice } = products;

    const productPrice = await getProductPrice(product_id);
    //if (!productPrice) return;
    
    const cartItem = new CartItem ({
        quantity: quantity, 
        price: (quantity * productPrice),
        product_id: product_id,
        cart_id: cart_id
    }); 
    
    const addedCartItem = await cartItem.save();

    return addedCartItem;
};

async function deleteCartItem(item_id) {
    const deletedItem = await CartItem.findByIdAndRemove({_id: item_id});
    return deletedItem;
};


module.exports = { createCart, addCartItem, deleteCartItem };