import {SET_USERNAME, SET_ERRORHANDLING, SET_USERNAME_LIST} from '../actions/index.js';

const initialState = {
    username: {},
    errorHandling: {loading: false, notFound: false, existing: false},
    usernameList: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERNAME:
            return {...state, username: action.payload};
        case SET_ERRORHANDLING:
            return {...state, errorHandling: action.payload};
        case SET_USERNAME_LIST:
            return {...state, usernameList: action.payload};
        default:
            return {...state};
    }
}
