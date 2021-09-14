import {SET_USER, SET_LOADING} from '../actions/index.js';

const initialState = {
    user: {},
    loading: false,
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_LOADING:
            return {...state, loading: true};
        default:
            return {...state};
    }
}
