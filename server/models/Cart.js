const mongoose = require('mongoose');
require('./User');

const CartSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    open: {
        type: Boolean,
        default: true
    }
});

const CartModel = mongoose.model('cart', CartSchema)

module.exports = CartModel;