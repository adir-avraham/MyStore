const User = require('../models/User');


function registerValidationFirstStep(payload) {
    const { id, userName } = payload;
    const user = new User({
        id: id,
        userName: userName,
    },['id', 'userName']);

    return new Promise((resolve, reject) => {
        user.validate(err => {
            if (err) reject(err);
            resolve({message: "pass first step validation", status: true});
        })
    })
};


function validatePassword(password, passwordConfirm) {
    if (!password || !passwordConfirm) return false;
    if (password === passwordConfirm) {
        return true;
    } else {
        return false;
    }
};


module.exports = {registerValidationFirstStep, validatePassword};