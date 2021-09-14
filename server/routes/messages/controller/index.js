const express = require('express');
const {saveMessage, getMessagesByUser} = require('../service/index.js');

const messagesRouter = express.Router();

messagesRouter.get('/', getMessagesByUser);
messagesRouter.post('/', saveMessage);

module.exports = messagesRouter;
