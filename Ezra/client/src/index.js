import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './Reducers';
import App from './Components/App';
import Welcome from './Components/Welcome';
import SignUp from './Components/Auth/SignUp';
import SignOut from './Components/Auth/SignOut';
import SignIn from './Components/Auth/SignIn';
import Users from './Components/Users'

const store = createStore(
    reducers,
    {user: {
        username: localStorage.getItem('username'),
        token: localStorage.getItem('token')
    }},
    applyMiddleware(reduxThunk)
)

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <App>
                <Route path = "/" exact component = {Welcome} />
                <Route path = "/signUp" component = {SignUp} />
                <Route path = "/signOut" component = {SignOut} />
                <Route path = "/signIn" component = {SignIn} />
                <Route path = "/users" component = {Users} />
            </App>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);