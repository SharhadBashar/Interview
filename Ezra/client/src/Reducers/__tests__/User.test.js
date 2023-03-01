import user from '../User';
import {AUTH_USER, AUTH_ERROR} from '../../Actions/types';

it('Handles actions of type AUTH_USER', () => {
    const action = {
        type: AUTH_USER,
        payload: {
            username: 'username',
            password: 'password',
            token: 'token',
            error: 'error'
        }
    }
    const newState = user({}, action);
    expect (newState.username).toEqual('username');
    expect (newState.password).toEqual('password');
    expect (newState.token).toEqual('token');
    expect (newState.error).toEqual(undefined);
});

it('Handles actions of type AUTH_ERROR', () => {
    const action = {
        type: AUTH_ERROR,
        payload: 'error'
    }
    const newState = user({}, action);
    expect (newState.username).toEqual(undefined);
    expect (newState.password).toEqual(undefined);
    expect (newState.token).toEqual(undefined);
    expect (newState.error).toEqual('error');
});