const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userhashedPassword: String,
    restPasswordToken: String,
    restPasswordExpries: String,
});

module.exports = mongoose.model('user', userSchema);