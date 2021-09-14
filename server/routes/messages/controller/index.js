const express = require('express');
const {saveMessage} = require('../service/index.js');

const messagesRouter = express.Router();

messagesRouter.post('/', saveMessage);

module.exports = messagesRouter;
