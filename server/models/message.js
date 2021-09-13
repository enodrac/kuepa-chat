const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    date: String,
    user: String,
    content: String,
});

var messageModel = mongoose.model('messageSchema', messageSchema);

module.exports = messageModel;
