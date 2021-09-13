import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import {Server as serverio} from 'socket.io';

import router from './routes/index.js';

const app = express();
const server = http.createServer(app);
const io = new serverio(server);

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const CONECTION_URL = 'mongodb+srv://enodrac:enodrac321@cluster0.w1gmk.mongodb.net/kuepaChat?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

app.use('/', router);

mongoose
    .connect(CONECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => server.listen(PORT, () => console.log(`Server is running on port  ${PORT}`)))
    .catch((err) => console.log(err.message));
