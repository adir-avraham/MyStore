const exprees = require('express');
const router = exprees.Router();
const orders = require('../database/orders');


router.use( async (req, res, next) => {

    try {
        const { deliveryDate, creditCard } = req.body;
        const { getUnavailableDates } = orders;
        const unavailableDates = await getUnavailableDates();
        const isUnavailable = isDateAvailable(deliveryDate, unavailableDates);
        if (isUnavailable) return res.json({message: "Unavailable delivery date", status: false});
        if (!validateCreditCard(creditCard)) return res.json({message: "Invalid credit card", status: false});
        next()
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});


router.post('/', async (req, res, next) => {

    try {
        const { _id } = req.decoded._doc;
        const { saveNewOrder } = orders;
        const savedOrder = await saveNewOrder(_id, req.body);
        if (!savedOrder) return res.json({message: "Order failed", status: false});
        const savedOrderIds = {orderId: savedOrder._id, cartId: savedOrder.cart_id};
        res.json({message: "Order completed", savedOrderIds: savedOrderIds , status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});


module.exports = router;

function isDateAvailable(deliveryDate, unavailableDates) {
    if (new Date(deliveryDate) < new Date) return true;
    return unavailableDates.find(date => date._id.deliveryDate.getTime() === new Date(deliveryDate).getTime());
}

function validateCreditCard(creditCard) {
    const pattern = /\d{16}/
    const validate = pattern.test(creditCard);
    return validate;
}