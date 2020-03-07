const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
})

const CartModel = mongoose.model('cart', CartSchema)

module.exports = CartModel;