const exprees = require('express');
const router = exprees.Router();
const orders = require('../database/orders');


router.get('/', async (req, res, next) => {

    try {
        const { getUnavailableDates } = orders; 
        const unavailableDates = await getUnavailableDates();
        if (!unavailableDates.length) return res.json({message: "No unavailable delivery dates", status: false});
        res.json({unavailableDates: unavailableDates, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});


module.exports = router;