
const User = require('../models/User');


function registerValidationFirstStep(payload) {
    const { idNumber, userName } = payload;
    const user = new User({
        idNumber: idNumber,
        userName: userName,
    },['idNumber', 'userName']);

    return new Promise((resolve, reject) => {
        user.validate(err => {
            if (err) reject(err);
            resolve({message: "pass first step validation", status: true});
        })
    })
};


function checkPasswordMatch(password, passwordConfirm) {
    console.log(password, passwordConfirm)
    if (password === passwordConfirm) {
        return true;
    } else {
        return false;
    }
};


module.exports = {registerValidationFirstStep, checkPasswordMatch};