const exprees = require('express');
const router = exprees.Router();
const orders = require('../database/orders');


router.post('/', async (req, res, next) => {

    try {
        const { _id } = req.decoded._doc;
        const { deliveryDate } = req.body;
        const { saveNewOrder, getUnavailableDates } = orders;
        const unavailableDates = await getUnavailableDates();
        const isUnavailable = isDateAvailable(deliveryDate, unavailableDates);
        if (isUnavailable) return res.json({message: "Unavailable delivery date", status: false});
        const savedOrder = await saveNewOrder(_id, req.body);
        if (!savedOrder) return res.json({message: "Order failed", status: false});
        res.json({message: "Order completed", savedOrder: savedOrder, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }

});


module.exports = router;

function isDateAvailable(deliveryDate, unavailableDates) {
    return unavailableDates.find(date => date._id.deliveryDate.getTime() === new Date(deliveryDate).getTime());
}