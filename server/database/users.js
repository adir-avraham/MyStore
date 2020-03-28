const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const User = require('../models/User');


async function isUserExist(userName) {
    const user = await User.exists({ userName: userName });
    return user;
};


async function saveUser(payload) {
    
    const { firstName, lastName, userName, password, id, city, street } = payload;
    const salt = bcrypt.genSaltSync(10);
    
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: bcrypt.hashSync(password, salt),
        salt: salt,
        id: id,
        city: city,
        street: street
    });
    
    const savedUser = await user.save();
    
    return savedUser;
};


async function getUserSalt(userName) {
    const {salt} = await User.findOne({ userName: userName }, { salt: 1, _id: 0 });
    return salt;
};


async function getUserLogin(userName, password) {
    const user = await User.findOne({ userName: userName, password: password }); 
    return user;
}; 


async function getUserCity(_id) {
    const city = await User.findById({_id: _id}, { city: 1, _id: 0 });
    return city; 
};


async function getUserStreet(_id) {
    const street = await User.findById({_id: _id}, { street: 1, _id: 0 });
    return street;
};


function getJwt(p) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, process.env.SECRET, { expiresIn: '3h' }, (err, token) => {
            if (err) reject("error");
            resolve(token);
        })
    });
};


module.exports = { isUserExist, saveUser, getUserSalt, 
    getUserLogin, getJwt, getUserCity, getUserStreet };