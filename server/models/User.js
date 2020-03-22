const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1
    },
    lastName: {
        type: String,
        required: true,
        min: 1
    },
    userName: {
        type: String, 
        required: true,
        unique: true
    },
    id: {
        type: Number,
        required: true,
        min : 1000,
        max : 999999999
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user'] 
    }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;