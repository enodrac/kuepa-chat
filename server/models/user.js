const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    user: String,
    password: String,
    student: Boolean,
    admin: Boolean,
});

module.exports = mongoose.model('userSchema', userSchema);
