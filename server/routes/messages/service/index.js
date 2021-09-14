const MessageModel = require('../../../models/message.js');
const UserModel = require('../../../models/user.js');

async function getMessagesByUser(req, res) {
    try {
        let allMessages;
        console.log('user', req.query.user);
        if (req.query.user) allMessages = await MessageModel.find({user: req.query.user});
        else {
            findUser = await UserModel.findOne({fullname: req.query.fullname});
            console.log('fullname', findUser.fullname);
            allMessages = await MessageModel.find({user: findUser.user});
        }
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
