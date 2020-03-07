const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    }
});

const CategoryModel = mongoose.model('category', CategorySchema);

module.exports = CategoryModel;