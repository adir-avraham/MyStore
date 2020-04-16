const exprees = require('express');
const router = exprees.Router();
const carts = require('../database/carts');
const orders = require('../database/orders');
const utils = require('../utils/writeToTxtFile');



router.get('/', async (req, res, next) => {

    try {
        const { cartId, orderId } = req.query;
        const { getCartItemsList } = carts;
        const { getTotalPriceOrder } = orders;
        const { writeToTxtFile } = utils;
        const cartItemsList = await getCartItemsList(cartId);
        const totalPrice = await getTotalPriceOrder(orderId);  
        writeToTxtFile(`${__dirname}/receipts-files/receipt - ${orderId}.txt`, cartItemsList, totalPrice);   
        const receiptFile = `${__dirname}/receipts-files/receipt - ${orderId}.txt`;
        res.download(receiptFile);
    } catch (error) {
        res.json({error: error.message, status: false});
    }
});


module.exports = router;