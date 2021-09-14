import {SET_USERNAME, SET_LOADING, SET_USERNAME_LIST} from '../actions/index.js';

const initialState = {
    username: {},
    loading: false,
    usernameList: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERNAME:
            return {...state, username: action.payload};
        case SET_LOADING:
            return {...state, loading: action.payload};
        case SET_USERNAME_LIST:
            return {...state, usernameList: action.payload};
        default:
            return {...state};
    }
}
