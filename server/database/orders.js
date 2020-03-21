const Order = require('../models/Order');
const carts = require('../database/carts');


async function saveNewOrder(_id, payload) {

    const { deliveryCity, deliveryStreet, deliveryDate, creditCard } = payload;
    
    const { getCart } = carts;
    const cart = await getCart(_id);
    const cart_id = cart[0].cart_id;
    if (!cart[0]._id) return;

    const order = new Order ({

        totalPrice: await getTotalPrice(cart_id),
        deliveryCity: deliveryCity,
        deliveryStreet: deliveryStreet,
        deliveryDate: deliveryDate,
        creditCard: getFourDigits(creditCard),
        user_id: _id,
        cart_id: cart_id
    })

    const savedOrder = await order.save();
    if (savedOrder) {
        const { closeCart } = carts;
        const updatedCart = await closeCart(cart_id);
        if (!updatedCart) return;
    }

    return savedOrder;
};


async function getTotalPrice(cart_id) {
    const { getCartByCartId } = carts;
    const cartItems = await getCartByCartId(cart_id);
    const totalPrice = cartItems.map(item => item.price).reduce((acc, value) => acc + value, 0);
    return Math.floor(totalPrice * 100) / 100;
}


function getFourDigits(creditCard) {
    const lastFourDigits = parseInt(creditCard.toString().slice(12));
    return lastFourDigits;
}

async function getUnavailableDates() {
    const unavailableDates = await Order.aggregate([
        {$group: { 
            _id: {deliveryDate: "$deliveryDate"},
            uniqueIds: {$addToSet: "$_id"},
            count: {$sum: 1},
            } 
        },
        {$match: {$and:[{$and : [
            {"_id.deliveryDate": {"$gt": new Date()}},
            {count: {"$eq": 3}}]
        }]}
        }
    ]);

    return unavailableDates;
};


module.exports = { saveNewOrder, getUnavailableDates };