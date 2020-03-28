const express = require('express');
const router = express.Router();
const users = require('../database/users');
const carts = require('../database/carts');

router.get('/city', async (req, res, next) => {

    try {
        const { _id } = req.decoded._doc;
        const { getUserCity } = users;
        const city = await getUserCity(_id);
        if (!city) return res.json({message: "get user city failed", status: false});
        res.json({city: city, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});

router.get('/street', async (req, res, next) => {

    try{
        const { _id } = req.decoded._doc;
        const { getUserStreet } = users;
        const street = await getUserStreet(_id);
        if (!street) return res.json({message: "get user street failed", status: false});
        res.json({street: street, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});


router.get('/shopping', async (req, res, next) => {

    try {
        const { _id } = req.decoded._doc;
        const { getShoppingDetails } = carts;
        const shoppingDetails = await getShoppingDetails(_id);
        res.json({ shoppingDetails: shoppingDetails, status: true });
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});

module.exports = router;