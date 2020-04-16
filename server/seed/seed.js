const express = require('express');
const router = express.Router();
const categoriesData = require('../database/categories');
const productsData = require('../database/products');
const productsNames = require('./products');
const axios = require('axios');
const bcrypt = require('bcryptjs'); 
const Category = require('../models/Category');
const User = require('../models/User');
productsUrl = require('./products.json');

let productsCounter = 0;
let categoriesCounter = 0;


router.get('/categories', async (req, res, next) => {

    try {
        const categories = Object.keys(productsNames);    
        for (let i = 0; i < categories.length; i++) {
            const category = new Category({
                category: categories[i],
             });
            const savedCategory = await category.save();
            categoriesCounter++
        }
        res.json({numOfCategories: categoriesCounter, status: true})
    } catch (error) {
        res.json({error: error.message, status: false})
    }
});


router.get('/products', async (req, res, next) => {

    try {
        const { getCategories } = categoriesData;
        const categories = await getCategories();
        const { createProduct } = productsData;    
        for (let i = 0; i < categories.length; i++) {
            
            for (let j = 0; j < productsNames[categories[i].category].length; j++){
                const newProduct = {
                    name: productsNames[categories[i].category][j],
                    price: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
                    image: getImageSync(productsNames[categories[i].category][j]),
                    //image: await getImage(productsNames[categories[i].category][j]),
                    category_id: categories[i]._id
                }   
                const createdProduct = await createProduct(newProduct);
                productsCounter++
            }
        }
        res.json({numOfProducts: productsCounter, status: true}); 
    } catch (error) {
        res.json({error: error.message, status: false})
    }
});


router.get('/users/:role', async (req, res, next) => {

    const { role } = req.params;
    if (!role) return res.json({message: "No role provided", status: false});
    try {
        const salt = bcrypt.genSaltSync(10);
        const user = new User({
            firstName: role,
            lastName: role,
            userName: `${role}-${Math.floor(Math.random() * 9999)}@gmail.com`,
            password: bcrypt.hashSync('1234', salt),
            salt: salt,
            id: '123456',
            city: 'London',
            street: 'Somewhere 15',
            role: role
        });
        
        const savedUser = await user.save();
        if (savedUser) return res.json({yourRole: savedUser.role, userName: savedUser.userName, password: 1234, status: true});

    } catch (error) {
        res.json({error: error.message, status: false})
    }

});


async function getImage(productNameParam) {
    const mainAxios = axios.create({
        baseURL: `https://api.shutterstock.com/v2/images/search?view=minimal&category=Food and Drink&image_type=photo&per_page=30&people_number=0&query=${productNameParam}&sort=popular&spellcheck_query=true`,
        headers: {'Authorization':'Basic VDFDVXFCUzB5aW5LVWhLcjhudWw1b0JkZ2hhZkl6VHI6TWZUWFM4cHR1dnY1WnhNUg==',
        'Content-Type': 'application/json'
    }
    })
    const { data } = await mainAxios.get();
    const imageUrl = data.data[0].assets.large_thumb.url;
    return imageUrl;
}

function getImageSync(productNameParam) {
    const product = productsUrl.find(product => product.name === productNameParam);
    return product.image;
}

module.exports = router;