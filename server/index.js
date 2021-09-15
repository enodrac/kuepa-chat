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

let onlineUserList = [];
let usersWithId = [];

io.on('connection', (socket) => {
    socket.on('chatMessage', (message) => {
        io.emit('message', message);
    });
    socket.on('addUserToList', (newUser) => {
        const allredyOn = onlineUserList.filter((onlineUser) => onlineUser.username === newUser.username);
        if (!allredyOn.length) {
            usersWithId.push({id: socket.id, username: newUser.username});
            onlineUserList.push(newUser);
        }
        io.emit('updateUserList', onlineUserList);
    });
    socket.on('requestUserList', () => {
        io.emit('getUserList', onlineUserList);
    });
    socket.on('removeUserFromList', (disconnectedUser) => {
        onlineUserList = onlineUserList.filter((onlineUser) => onlineUser.username !== disconnectedUser.username);
        io.emit('updateUserList', onlineUserList);
    });
    socket.on('disconnect', () => {
        const aux = usersWithId.filter((user) => user.id === socket.id).pop();
        if (aux) {
            onlineUserList = onlineUserList.filter((user) => user.username !== aux.username);
        }
    });
});

const CONECTION_URL = 'mongodb+srv://enodrac:enodrac321@cluster0.w1gmk.mongodb.net/kuepaChat?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => server.listen(PORT, () => console.log(`Server is running on port  ${PORT}`)))
    .catch((err) => console.log(err.message));
