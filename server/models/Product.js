const mongoose = require('mongoose');
require('./Category');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
})

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;