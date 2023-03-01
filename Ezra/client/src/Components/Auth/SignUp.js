//The page that allows users to sign up
import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {signUp} from '../../Actions';
import Button from './Button';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    };

    componentDidMount() {
        if (this.props.token) {
            this.props.history.push('/users');
        }
    };

    onSubmit = (formProps) => {
        this.props.signUp(formProps, () => {
            this.props.history.push('/users');
        })
    };

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit = {handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Username: </label>
                    <Field 
                        name = "username"
                        type = "text"
                        component = "input"
                        autoComplete = "none"
                        placeholder = "Username"
                        value = {this.state.username}
                        onChange = {(event) => {
                            this.setState({username: event.target.value});
                        }}
                    />
                </fieldset>
                <fieldset>
                    <label>Password: </label>
                    <Field 
                        name = "password"
                        type = "password"
                        component = "input"
                        autoComplete = "none"
                        placeholder = "Password"
                        value = {this.state.password}
                        onChange = {(event) => {
                            this.setState({password: event.target.value});
                        }}
                    />
                </fieldset>
                <div className = "error">{this.props.error}</div>
                <Button text = "Sign Up" state = {this.state}/>
            </form>
        );
    };
}

function mapStateToProps(state) {
    if (state.user.error === 'Wrong credentials') {
        state.user.error = '';
    }
    return {
        token: state.user.token,
        error: state.user.error
    };
}

export default compose(
    reduxForm({form: 'signUp'}),
    connect(mapStateToProps, {
        signUp: signUp
    })
)(SignUp);