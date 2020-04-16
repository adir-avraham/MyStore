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
const getNumOfOrders = require('./routes/orders');
const getNumOfProducts = require('./routes/products');
const getCategories = require('./routes/getCategories');
const getProductsByCategory = require('./routes/products');
const getCart = require('./routes/carts');
const addCartItem = require('./routes/carts');
const deleteCartItem = require('./routes/carts');
const emptyCart = require('./routes/carts');
const saveNewOrder = require('./routes/orders');
const getUserDetails = require('./routes/getUserDetails');
const getUnavailableDates = require('./routes/orders');
const downloadReceipt = require('./routes/downloadReceipt');
const verifyAdmin = require('./auth/verifyAdmin');
const createProduct = require('./routes/products');
const editProduct = require('./routes/products');
const seed = require('./seed/seed');
const contact = require('./routes/contactUs');


app.use(cors());
app.use(bodyParser.json());
app.use('/seed', seed);
app.use('/contact', contact);
app.use('/statistics', getNumOfOrders);
app.use('/statistics', getNumOfProducts);
app.use('/register', register);
app.use('/login', login);
app.use('/',verifyToken);
app.use('/getCategories', getCategories);
app.use('/products', getProductsByCategory);
app.use('/admin', verifyAdmin);
app.use('/admin/products', createProduct);
app.use('/admin/products', editProduct);
app.use('/',verifyUser);
app.use('/getUserDetails', getUserDetails);
app.use('/carts', getCart);
app.use('/carts', addCartItem);
app.use('/carts', deleteCartItem);
app.use('/carts', emptyCart);
app.use('/orders', getUnavailableDates);
app.use('/orders', saveNewOrder);
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