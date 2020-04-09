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


async function createProduct(payload) {

    const { name, price, image, category_id } = payload;

    const product = new Product ({
        name: name,
        price: price,
        image: image,
        category_id: category_id
    })

    const createdProduct = await product.save();

    return createdProduct;
};


async function editProduct(payload) {

    const { name, price, image, category_id, product_id } = payload;
    
    const editedProduct = await Product.findOneAndUpdate({ _id: product_id }, {
        name: name,
        price: price,
        image: image,
        category_id: category_id
    }, { runValidators: true }) 
    
    return editedProduct;

};


module.exports = { getProductByName, getProductsByCategory, getProductPrice, getNumOfProducts, 
    createProduct, editProduct };