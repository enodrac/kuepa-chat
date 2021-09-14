import {SET_USER, SET_LOADING, SET_USER_LIST} from '../actions/index.js';

const initialState = {
    user: {},
    loading: false,
    userList: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_LOADING:
            return {...state, loading: action.payload};
        case SET_USER_LIST:
            return {...state, userList: action.payload};
        default:
            return {...state};
    }
}
