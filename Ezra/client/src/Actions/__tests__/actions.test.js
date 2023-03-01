import {AUTH_USER} from '../types';
import {signOut} from '../index';

describe('Sign Out', () => {
    it('Has the correct type', () => {
        const action = signOut();
        expect(action.type).toEqual(AUTH_USER);
    });
    it('Has the correct payload', () => {
        const action = signOut();
        expect(action.payload).toEqual('');
    });
    it('Has nothing in localStorage', () => {
        expect(localStorage.length).toEqual(0);
    })
})