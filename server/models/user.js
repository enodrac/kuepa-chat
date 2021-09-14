const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    user: String,
    password: String,
    student: Boolean,
    admin: Boolean,
});

module.exports = mongoose.model('userSchema', userSchema);
