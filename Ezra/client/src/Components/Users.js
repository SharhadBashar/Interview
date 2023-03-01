//The page you are redirected to once you are logged in
import React from 'react';
import {connect} from 'react-redux';
import requireAuth from './requireAuth';

class Users extends React.Component {
    signOut = () => {
        this.props.history.push('/signOut');
    }
    
    render() {
        return (
            <div className = "content">
                <h1>Welcome <font color="red">{this.props.username}</font> to this restricted page</h1>
                <h3>You can only see this page if you're a logged in user with valid credentials</h3>
                <button onClick = {this.signOut}>Sign Out</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps)(requireAuth(Users));