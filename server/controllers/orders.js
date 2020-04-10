const orders = require('../database/orders');


exports.getNumOfOrders = async (req, res, next) => {
    try {
        const { getNumOfOrders } = orders;
        const numOfOrders = await getNumOfOrders();
        res.json({numOfOrders: numOfOrders, status: true});
    } catch (error) {
        res.json({error: error.message, status: false})
    }
};


exports.getUnavailableDates = async (req, res, next) => {
    try {
        const { getUnavailableDates } = orders; 
        const unavailableDates = await getUnavailableDates();
        if (!unavailableDates.length) return res.json({message: "No unavailable delivery dates", status: false});
        res.json({unavailableDates: unavailableDates, status: true});
    } catch (error) {
        res.json({error: error.message, status: false});
    }
};


exports.validateSaveNewOrder = async (req, res, next) => {
    try {
        const { deliveryDate, creditCard } = req.body;
        console.log(req)
        const { getUnavailableDates } = orders;
        const unavailableDates = await getUnavailableDates();
        const isUnavailable = isDateAvailable(deliveryDate, unavailableDates);
        if (isUnavailable) return res.json({message: "Unavailable delivery date", status: false});
        if (!validateCreditCard(creditCard)) return res.json({message: "Invalid credit card", status: false});
        next()
    } catch (error) {
        res.json({error: error.message, status: false});
    }
};


exports.saveNewOrder = async (req, res, next) => {
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
};


function isDateAvailable(deliveryDate, unavailableDates) {
    if (new Date(deliveryDate) < new Date) return true;
    return unavailableDates.find(date => date._id.deliveryDate.getTime() === new Date(deliveryDate).getTime());
}

function validateCreditCard(creditCard) {
    const pattern = /\d{16}/
    const validate = pattern.test(creditCard);
    return validate;
}