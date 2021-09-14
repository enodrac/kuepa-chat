import axios from 'axios';

export function getUser(user) {
    return axios.get(`/users?user=${user.user}&password=${user.password}`);
}

export function createUser(user) {
    return axios.post('/users', user);
}

export function saveMessage(message) {
    axios.post('/messages', message);
}

export function getMessagesByUser(user) {
    return axios.get(`/messages?user=${user}`);
}
