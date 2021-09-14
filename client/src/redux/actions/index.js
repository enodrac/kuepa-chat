import axios from 'axios';

export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_LOADING';

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

export function setUserStore(user) {
    return (dispatch) => dispatch({type: SET_USER, payload: user});
}

export function setLoadingStore(payload) {
    return (dispatch) => dispatch({type: SET_LOADING, payload});
}
