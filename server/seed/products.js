//const moment = require("moment");
//const axios = require("axios");
const fs = require("fs");
const mongoose = require('mongoose');
const Category = require('../models/Category')

async function categories() {
    const categories = await Category.find({}, {_id: 1});
    console.log(categories)
    return categories;
}

const items = [ "Almond Milk", "Coconut Milk", "Soya Drink", "Cashew Nut Drink", "Rice Drink", "Free Range Eggs", "Organic Eggs", 'Green Tea', 'Black Tea', 'White Tea', 'Herb Teas', 'Coffee Beans', "Organic Camino Tempranillo Red Wine", "Organic Sauvignon Blanc Airen Wine", "Organic Carmenere Red Wine", "Organic Yellow Pepper", "Organic Porta Bella Mushrooms", "Organic Fresh Ginger", "Organic Carrots", "Organic Hass Avocado", "Organic Gala Apples", "Organic Banana", "Organic Rye Bread", "Organic Rye Bread Sprouted Vegan", "Organic Vitality Rye Bread", "Cinnamon Apple Cake Vegan", "Stem Ginger Spice Cake Vegan" ]


async function seedProducts(NOF) {
    // try{
    //     const c =  await categories();
    //     console.log(c)
    // } catch (err) {
    //     console.log(err.message)
        
    // }
    const products = [];

    for (let index = 0; index < NOF; index++) {
        const itemIndex = Math.round(Math.random() * items.length)
        const itemTitle = items[itemIndex]
        products.push(new Product(itemTitle));
    }

    return products;
}

function Product(_itemTitle) {
    this.title = _itemTitle;
    this.price = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
    this.image = "";
    this.category_id = "";
}

seedProducts(20).then(res => {
    fs.writeFile("./products.json", JSON.stringify({ products: res }), err =>
        console.log(err)
    );
});

module.exports = { seedProducts };