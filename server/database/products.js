const Product = require('../models/Product');



async function getProductByName(name) {
    const product = await Product.find({name: new RegExp(name, 'i')});
    return product;
};


async function getProductsByCategory(category_id) {
    const products = await Product.find({ category_id: category_id });
    return products;
};


async function getProductPrice(product_id) {
    const productPrice  = await Product.findById({ _id: product_id }, { price: 1, _id: 0 });
    const { price } = productPrice;
    return price;
};


async function getNumOfProducts() {
    const numOfProducts = await Product.estimatedDocumentCount();
    return numOfProducts;
}''


module.exports = { getProductByName, getProductsByCategory, getProductPrice, getNumOfProducts };