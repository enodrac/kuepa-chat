import axios from 'axios';

export function getUser(user) {
    return axios.get(`/users?user=${user.user}`);
}

export function createUser(user) {
    return axios.post('/users', user);
}
