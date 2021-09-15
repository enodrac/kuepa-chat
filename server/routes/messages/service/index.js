const MessageModel = require('../../../models/message.js');
const UserModel = require('../../../models/user.js');

async function getMessagesByUser(req, res) {
    try {
        const findUser = await UserModel.findOne({username: req.query.username});
        if (findUser === null) return res.send(false);
        const allMessages = await MessageModel.find({username: req.query.username});
        return res.send(allMessages);
    } catch (error) {
        console.log('error getMessagesByUser', error);
    }
}
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
    getMessagesByUser,
    saveMessage,
};
