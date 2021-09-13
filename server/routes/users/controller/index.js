import express from 'express';
import {createUser, getUser} from '../service/index.js';

const usersRouter = express.Router();

usersRouter.get('/', getUser);
usersRouter.post('/', createUser);

export default usersRouter;
