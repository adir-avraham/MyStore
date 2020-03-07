require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


//define routes
const register = require('./auth/register');
const login = require('./auth/login');

app.use(cors());
app.use(bodyParser.json());

//index routes
app.use('/register', register);
app.use('/login', login);



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



