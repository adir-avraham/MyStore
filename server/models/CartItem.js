const mongoose = require('mongoose');


const CartItemSchema = new mongoose.Schema({
    quantity: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    }
});

const CartItemModel = mongoose.model('cartItem', CartItemSchema);

module.exports = CartItemModel;