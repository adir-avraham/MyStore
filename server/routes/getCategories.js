const express = require('express');
const router = express.Router();
const categoriesData = require('../database/categories');

router.get('/', async (req, res, next) => {

    try {
        const { getCategories } = categoriesData;
        const categories = await getCategories();
        res.json({categories: categories, status: true});

    } catch (error) {
        res.json({error: error.message, message: "error from get categories" ,status: false})
    }

}); 

module.exports = router;