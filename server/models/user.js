const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    fullname: String,
    user: String,
    password: String,
    student: Boolean,
    admin: Boolean,
});

module.exports = mongoose.model('usersSchema', usersSchema);
