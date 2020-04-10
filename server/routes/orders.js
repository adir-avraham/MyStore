const exprees = require('express');
const router = exprees.Router();
const orders_controller = require('../controllers/orders');

const { getNumOfOrders, getUnavailableDates, validateSaveNewOrder,
    saveNewOrder 
} = orders_controller;


router.use('/saveNewOrder', validateSaveNewOrder); 

router.post('/saveNewOrder', saveNewOrder);

router.get('/getNumOfOrders', getNumOfOrders); 

router.get('/getUnavailableDates', getUnavailableDates); 




module.exports = router;