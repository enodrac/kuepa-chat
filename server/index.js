const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');

const router = require('./routes/index.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());

app.use('/', router);

io.on('connection', (socket) => {
    socket.on('chatMessage', (message) => {
        console.log('=>', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {});
});

const CONECTION_URL = 'mongodb+srv://enodrac:enodrac321@cluster0.w1gmk.mongodb.net/kuepaChat?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => server.listen(PORT, () => console.log(`Server is running on port  ${PORT}`)))
    .catch((err) => console.log(err.message));
