//The Sign In (Login) page
import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {signIn} from '../../Actions';
import Button from './Button';

class SignIn extends React.Component {
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
        this.props.signIn(formProps, () => {
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
                <Button text = "Sign In" state = {this.state}/>
            </form>
        );
    };
}

function mapStateToProps(state) {
    if (state.user.error === 'Username is taken. Please pick another username') {
        state.user.error = '';
    }
    return {
        token: state.user.token,
        error: state.user.error
    };
}

export default compose(
    reduxForm({form: 'signIn'}),
    connect(mapStateToProps, {
        signIn: signIn
    })
)(SignIn);