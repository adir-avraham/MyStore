require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


//define routes
const register = require('./auth/register');
const login = require('./auth/login');
const verifyToken = require('./auth/verifyToken');
const getCategories = require('./routes/getCategories');
const getProductByName = require('./routes/getProductByName');
const getProductsByCategory = require('./routes/getProductsByCategory');
const createCart = require('./routes/createCart');
const addCartItem = require('./routes/addCartItem');
const deleteCartItem = require('./routes/deleteCartItem');

app.use(cors());
app.use(bodyParser.json());

//index routes
app.use('/register', register);
app.use('/login', login);


app.use('/',verifyToken);
app.use('/getCategories', getCategories);
app.use('/getProductByName', getProductByName);
app.use('/getProductsByCategory', getProductsByCategory);
app.use('/createCart', createCart);
app.use('/addCartItem', addCartItem);
app.use('/deleteCartItem', deleteCartItem);


mongoose.connect(`${process.env.MONGO_DB_URL}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, ()=>{
    console.log("Connected to DB")
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port: ${process.env.PORT}`)
});



