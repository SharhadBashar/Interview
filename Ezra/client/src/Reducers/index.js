//Combines the reducers
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import user from './User';

export default combineReducers ({
    user: user,
    form: formReducer
});