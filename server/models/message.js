const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    date: String,
    username: String,
    content: String,
    admin: Boolean,
});

module.exports = mongoose.model('messageSchema', messageSchema);
