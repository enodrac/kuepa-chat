import axios from 'axios';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_LOADING = 'SET_LOADING';
export const SET_USERNAME_LIST = 'SET_USERNAME_LIST';

export function getUser(username) {
    return axios.get(`/usernames?username=${username.username}&password=${username.password}`);
}

export function createUser(username) {
    return axios.post('/usernames', username);
}

export function saveMessage(message) {
    axios.post('/messages', message);
}

export function getMessagesByUser(username) {
    return axios.get(`/messages?username=${username}`);
}

export function setUserStore(payload) {
    return (dispatch) => dispatch({type: SET_USERNAME, payload});
}

export function setLoadingStore(payload) {
    return (dispatch) => dispatch({type: SET_LOADING, payload});
}
export function setUserListStore(payload) {
    return (dispatch) => dispatch({type: SET_USERNAME_LIST, payload});
}
