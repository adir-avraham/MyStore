const mongoose = require('mongoose');
require('./User');
require('./Cart');

const OrderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    deliveryCity: {
        type: String,
        required: true
    },
    deliveryStreet: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    ordered_at: {
        type: Date,
        default: Date.now 
    },
    creditCard: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
});

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;