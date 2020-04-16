const productsData = require('../database/products');



exports.getNumOfProducts = async (req, res, next) => {
    try {
        const { getNumOfProducts } = products;
        const numOfProducts = await getNumOfProducts();
        res.json({numOfProducts: numOfProducts, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
};


exports.getProductsByCategory = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { getProductsByCategory } = productsData;
        const products = await getProductsByCategory(_id);
        if (!products) return res.json({message: "No products found", status: false});
        res.json({products: products, status: true});
    } catch (error) {
        res.json({error: error.message, message: "An error occurred..", status: false});
    }
};


exports.editProduct = async (req, res, next) =>{
    try {
        const { editProduct, getProductsByCategory } = productsData;
        const editedProduct = await editProduct(req.body);
        if (!editedProduct) return res.json({message: "Edit product failed", status: false});
        const { category_id } = req.body;
        const products = await getProductsByCategory(category_id);
        res.json({message: "Product has been edited!", products: products, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
};


exports.createProduct = async (req, res, next) => {
    try {
        const { createProduct, getProductsByCategory } = productsData;    
        const createdProduct = await createProduct(req.body);
        const { category_id } = req.body;
        const products = await getProductsByCategory(category_id);
        if (!createdProduct) return res.json({message: "Create product failed", status: false});
        res.json({message: "Product has been created!" ,createdProduct: createdProduct, 
        products: products, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
};