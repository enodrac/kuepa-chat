import {Router} from 'express';
import messagesRouter from './messages/controller/index.js';
import usersRouter from './users/controller/index.js';

const router = Router();

router.use('/messages', messagesRouter);
router.use('/users', usersRouter);

export default router;
