import axios from 'axios';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_ERRORHANDLING = 'SET_ERRORHANDLING';
export const SET_USERNAME_LIST = 'SET_USERNAME_LIST';

export function getUser(loginUser) {
    return axios.get(`/users?username=${loginUser.username}&password=${loginUser.password}`);
}

export function createUser(newUser) {
    return axios.post('/users', newUser);
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

export function setErrorHandling(payload) {
    return (dispatch) => dispatch({type: SET_ERRORHANDLING, payload});
}
export function setUserListStore(payload) {
    return (dispatch) => dispatch({type: SET_USERNAME_LIST, payload});
}
