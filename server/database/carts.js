const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
products = require('./products');

class CartItemObj {
    constructor(_id, name, quantity, price, cart_id, product_id, image) {
        this._id = _id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.cart_id = cart_id; 
        this.product_id = product_id;
        this.image = image;
    }
};


async function getShoppingDetails(user_id) {
    const hasCart = await Cart.findOne({user_id: user_id, open: true});
    if (hasCart) {    
        return await getDetails(hasCart, user_id);
    } else {
        return await getLastOrder(user_id);
    };
};

async function getDetails(hasCart, user_id) {    
    const { _id } = hasCart;
    const cartItems = await CartItem.find({cart_id: _id}).populate('cart_id');
    if (!cartItems.length) {
        return await getLastOrder(user_id);
    } else {
        const totalPrice = await CartItem.aggregate([
            { $match: { cart_id: _id } },
            { $group: { _id: null, totalPrice: { $sum: "$price" } } }
        ])
        const cartDetails = {
            totalPrice: Math.floor(totalPrice[0].totalPrice * 100) / 100,
            created_at: cartItems[0].cart_id.created_at
        }
        return cartDetails;
    };
};

async function getLastOrder(user_id) {
    const lastOrder = await Order.find({user_id: user_id}, 
        { ordered_at: 1, _id: 0 }, 
        { sort: { 'ordered_at' : -1 } })
        .limit(1);
    return lastOrder;
};


async function getCart(user_id) {
    
    const hasCart = await Cart.findOne({user_id: user_id, open: true});
    
    if (hasCart) {    
        
        return await getCartItems(hasCart);
    
    } else {
        
        const cart = new Cart({user_id: user_id});
        
        const createdCart = await cart.save();
        
        return await getCartItems(createdCart);
    };
};


async function closeCart(cart_id) {
    const updateCart = await Cart.findByIdAndUpdate(cart_id, {open: false});
    return updateCart;
};


async function getCartItems(hasCart) {
    
    const { _id } = hasCart;

    let cartItems = await CartItem.find({cart_id: _id}).populate('product_id');
    
    if (!cartItems.length) {
        const cartItem = new CartItemObj(null, null, null, null, _id, null, null);
        cartItems.push(cartItem)
         
    } else {
        const newArray = cartItems.map(item => {
            return new CartItemObj(
                item._id,
                item.product_id.name,
                item.quantity,
                item.price, 
                item.cart_id,
                item.product_id._id,
                item.product_id.image
            )
        })
        cartItems = newArray;
    };
    
    return cartItems;
};


async function addCartItem(payload) {

    const { product_id, quantity, cart_id } = payload;
    const { getProductPrice } = products;
    if (quantity < 1) return;
    
    const productPrice = await getProductPrice(product_id);
    
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
    const deletedItem = await CartItem.findByIdAndRemove({ _id: item_id });
    return deletedItem;
};


async function empmtyCart(cart_id) {
    const result = await CartItem.deleteMany({ cart_id: cart_id });
    return result;
};


async function getCartByCartId(cart_id) {
    const cartItems = await CartItem.find({cart_id: cart_id});
    return cartItems;
};


async function getCartItemsList(cartId) {
    const cartItemsList = await CartItem.find({cart_id: cartId}, 
        {price: 1, quantity: 1, _id: 0 }).populate('product_id', 'name');
    return cartItemsList;
};


module.exports = { getCart, addCartItem, deleteCartItem, empmtyCart,
    getCartByCartId, closeCart, getCartItemsList, getShoppingDetails };