//The landing page
import React from 'react';
import {connect} from 'react-redux';

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: true
        };
    };
    
    onClick = () => {
        if (this.props.token) {
            this.props.history.push('/users');
        }
        else {
            this.setState({loggedIn: false});
        }
    };

    render () {
        return (
            <div className = "content">
                <h1>Welcome to the App</h1>
                <h3>If you are a new user, click <a href = '/signUp'>Sign Up </a></h3>
                <h3>Else click <a href = '/signIn'>Sign In</a> if you are a returning user</h3>
                <h3>If you are signed in, click
                    <a href = {this.state.loggedIn ? "/users" : "#"} 
                    onClick={this.onClick}> Users </a>
                    to access the users page
                </h3>
                {this.state.loggedIn ? null : 
                    <p className = "error">You are not authorized to visit this page. Please Sign In or Sign Up</p>
                }
            </div>
            
        );
    };
}

function mapStateToProps(state) {
    return {
        token: state.user.token
    }
}

export default connect(mapStateToProps)(Welcome);