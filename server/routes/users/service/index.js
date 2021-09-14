const UserModel = require('../../../models/user.js');

async function getUser(req, res) {
    try {
        const findUser = await UserModel.findOne({user: req.query.user, password: req.query.password});
        if (findUser !== null) return res.send(findUser);
        else throw new Error('user not found');
    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}
async function createUser(req, res) {
    try {
        const newUser = new UserModel(req.body);
        const findUser = await UserModel.findOne({user: req.body.user});
        if (findUser) throw new Error('user was alredy created');
        await newUser.save();
        return res.send(newUser);
    } catch (error) {
        console.log(error);
        return res.send(false);
    }
}

module.exports = {
    getUser,
    createUser,
};
