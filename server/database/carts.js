const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
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
}



async function getCart(user_id) {
    
    const hasCart = await Cart.findOne({user_id: user_id})
    
    if (hasCart) {
        return getCartItems(hasCart);
        
    } else {
        
        const cart = new Cart({
            user_id: user_id
        })

        const createdCart = await cart.save();
        
        return createdCart;
    }
  
};

async function getCartItems(hasCart) {
    
    const { _id } = hasCart;

    let cartItems = await CartItem.find({cart_id: _id}).populate('product_id');
    if (!cartItems.length) {
        const cartItem = new CartItemObj(null, null, null, null, _id, null, null )
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
    }
    
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
    const deletedItem = await CartItem.findByIdAndRemove({_id: item_id});
    return deletedItem;
};


module.exports = { getCart, addCartItem, deleteCartItem };