const Category = require('../models/Category');

async function getCategories() {
    const categories = await Category.find();
    return categories;
};


module.exports = { getCategories };