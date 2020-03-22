const express = require('express');
const router = express.Router();
const users = require('../database/users');
const validationFirstStep = require('../validations/registerValidation');


router.post('/firstStep' , async (req, res) => {

    try {
        const { isUserExist } = users;
        const { userName, password, passwordConfirm } = req.body;

        const user = await isUserExist(userName);
        if (user) return res.json({message: "User is already exist", status: false});
        
        const {registerValidationFirstStep, validatePassword} = validationFirstStep;
        
        const isPasswordValid = validatePassword(password, passwordConfirm);
        if (!isPasswordValid) return res.json({message: "Password is not confirmed", status: false});
        
        const isValid = await registerValidationFirstStep(req.body);
        return res.json(isValid);
    
    } catch (error) {
        res.json({error: error.message , status: false});
    }

});



router.post('/secondStep', async (req, res) => {
    
    try{
        const { isUserExist, saveUser } = users;
        const { userName, password, passwordConfirm  } = req.body;
        
        const user = await isUserExist(userName);
        if (user) return res.json({message: "User already exist", status: false});
     
        const { validatePassword } = validationFirstStep;

        const isPasswordValid = validatePassword(password, passwordConfirm);
        if (!isPasswordValid) return res.json({message: "Password is not confirmed", status: false});
        
        const savedUser = await saveUser(req.body);
        if (savedUser) return res.json({message: "Registration completed successfully!", status: true, savedUser: savedUser });
        res.json({message: "Register error!", status: false});
    } catch (error) {
        res.json({error: error.message , status: false});
    }
});


module.exports = router;