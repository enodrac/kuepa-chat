import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './routes/index.js';

const server = express();

server.use(express.json());
server.use(cors());

const CONECTION_URL = 'mongodb+srv://enodrac:enodrac321@cluster0.w1gmk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

server.use('/', router);

mongoose
    .connect(CONECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => server.listen(PORT, () => console.log(`Server is running on port  ${PORT}`)))
    .catch((err) => console.log(err.message));
