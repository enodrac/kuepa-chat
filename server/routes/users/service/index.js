const UserModel = require('../../../models/user.js');

async function getUser(req, res) {
    try {
        const findUser = await UserModel.findOne({user: req.query.user});
        return res.send(findUser);
    } catch (error) {
        console.log('error getUser', error);
    }
}
async function createUser(req, res) {
    try {
        const newUser = new UserModel(req.body);
        const findUser = await UserModel.findOne({user: req.body.user});
        if (findUser) return res.send(false);
        await newUser.save();
        return res.send(true);
    } catch (error) {
        console.log('error createUser', error);
    }
}

module.exports = {
    getUser,
    createUser,
};
