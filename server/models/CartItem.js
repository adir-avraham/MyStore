const mongoose = require('mongoose');
require('./Product');
require('./Cart');

const CartItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    }
});

const CartItemModel = mongoose.model('cartItem', CartItemSchema);

module.exports = CartItemModel;