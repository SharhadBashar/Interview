//User reducer. Stores the username and password as requested
import {AUTH_USER, AUTH_ERROR} from '../Actions/types';

const INITIAL_STATE = {
    username: '',
    password: '',
    token: '',
    error: ''
}

export default function (state = INITIAL_STATE, action) {
    var payload = action.payload;
    switch (action.type) {
        case AUTH_USER:
            return {...state, 
                username: payload.username,
                password: payload.password,
                token: payload.token
            }
        case AUTH_ERROR:
            return{...state, error: payload}
        default: 
            return state;
    }
}