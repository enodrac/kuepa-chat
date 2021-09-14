const MessageModel = require('../../../models/message.js');

async function saveMessage(req, res) {
    try {
        const newMessage = new MessageModel(req.body);
        await newMessage.save();
        return res.send();
    } catch (error) {
        console.log('error createMessage', error);
    }
}

module.exports = {
    saveMessage,
};
