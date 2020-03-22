const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const users = require('../database/users');


router.post('/', async (req, res, next) => {
    
    try {
        const { getUserSalt, getUserLogin, getJwt, isUserExist } = users;
        const {userName, password} = req.body;
        if (!userName || !password) return res.json({message: "Please enter user name and password", status: false});
        const isUser = await isUserExist(userName);
        if (!isUser) return res.json({message: "Incorrect password / username", status: false}); 
        const salt = await getUserSalt(userName);
        if (!salt) return res.json({message: "Incorrect password / username", status: false});
        const user = await getUserLogin(userName, bcrypt.hashSync(password, salt)); 
        if (!user) return res.json({message: "Incorrect password / username", status: false});
        const jwtToken = await getJwt({...user});
        const userData = { firstName: user.firstName, role: user.role, _id: user._id, token: jwtToken };
        res.json({message: "User logged in successfully!", userData: userData, status: true});  
    } catch (error) {
        res.json({error: error.message, status: false});
    }
}); 


module.exports = router;