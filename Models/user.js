const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    mobileNumber: String,
    password: String,
    role: String
});

module.exports = mongoose.model('user', userSchema);
