const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    user: String,
    password: String,
    student: Boolean,
    admin: Boolean,
});

var userModel = mongoose.model('userSchema', userSchema);

module.exports = userModel;
