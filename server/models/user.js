const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    username: String,
    password: String,
    student: Boolean,
    admin: Boolean,
});

module.exports = mongoose.model('userSchema', userSchema);
