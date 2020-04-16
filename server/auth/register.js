const express = require('express');
const router = express.Router();
const users = require('../database/users');
const validationFirstStep = require('../validations/registerValidation');


router.get('/firstStep/:userName' ,async (req, res, next) => {
    try {  
        const { isUserExist } = users;
        const { userName } = req.params;
        const user = await isUserExist(userName);
        if (user) return res.json({message: "User already exists", status: true});
        res.json({message: "ok", status: true});
    } catch (error) {
        res.json({error: error.message , status: false});
    }
});


router.use(async (req, res, next) => {
    try {
        const { isUserExist } = users;
        const { userName, password, passwordConfirm } = req.body;
        const user = await isUserExist(userName);
        if (user) return res.json({message: "User is already exist", status: false});
        const { validatePassword } = validationFirstStep;
        const isPasswordValid = validatePassword(password, passwordConfirm);
        if (!isPasswordValid) return res.json({message: "Password is not confirmed", status: false});
        next()
    } catch (error) {
        res.json({error: error.message , status: false});
    }
});


router.post('/secondStep', async (req, res) => {    
    try{    
        const { saveUser } = users;    
        const savedUser = await saveUser(req.body);
        if (savedUser) return res.json({message: "Registration completed!", status: true });
        res.json({message: "Register error!", status: false});
    } catch (error) {
        res.json({error: error.message , status: false});
    }
});


module.exports = router;