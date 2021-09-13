const express = require('express');
const messagesRouter = require('./messages/controller/index.js');
const usersRouter = require('./users/controller/index.js');

const router = express.Router();

router.use('/messages', messagesRouter);
router.use('/users', usersRouter);

module.exports = router;
