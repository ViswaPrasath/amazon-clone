const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('UserDetail', schema);