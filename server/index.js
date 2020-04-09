require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const register = require('./auth/register');
const login = require('./auth/login');
const verifyToken = require('./auth/verifyToken');
const verifyUser = require('./auth/verifyUser');
const getStoreStatistics = require('./routes/getStoreStatistics');
const getCategories = require('./routes/getCategories');
const getProductByName = require('./routes/getProductByName');
const getProductsByCategory = require('./routes/getProductsByCategory');
const getCart = require('./routes/getCart');
const addCartItem = require('./routes/addCartItem');
const deleteCartItem = require('./routes/deleteCartItem');
const emptyCart = require('./routes/emptyCart');
const saveNewOrder = require('./routes/saveNewOrder');
const getUserDetails = require('./routes/getUserDetails');
const getUnavailableDates = require('./routes/getUnavailableDates');
const downloadReceipt = require('./routes/downloadReceipt');
const verifyAdmin = require('./auth/verifyAdmin');
const createProduct = require('./routes/createProduct');
const editProduct = require('./routes/editProduct');
const seed = require('./seed/seed');
const contact = require('./routes/contactUs');

app.use(cors());
app.use(bodyParser.json());
app.use('/seed', seed);
app.use('/contact', contact);
app.use('/getStoreStatistics', getStoreStatistics);
app.use('/register', register);
app.use('/login', login);
app.use('/',verifyToken);
app.use('/getCategories', getCategories);
app.use('/getProductByName', getProductByName);
app.use('/getProductsByCategory', getProductsByCategory);
app.use('/admin', verifyAdmin);
app.use('/admin/createProduct', createProduct);
app.use('/admin/editProduct', editProduct);
app.use('/',verifyUser);
app.use('/getUserDetails', getUserDetails);
app.use('/getCart', getCart);
app.use('/addCartItem', addCartItem);
app.use('/deleteCartItem', deleteCartItem);
app.use('/emptyCart', emptyCart);
app.use('/getUnavailableDates', getUnavailableDates);
app.use('/saveNewOrder', saveNewOrder);
app.use('/downloadReceipt', downloadReceipt);

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