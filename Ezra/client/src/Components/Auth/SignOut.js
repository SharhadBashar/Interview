//The page users are redirected to when they sign out
import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../Actions';

class SignOut extends React.Component {
    componentDidMount() {
        this.props.signOut();
    };
    
    render () {
        return (
            <div className = "content">Sorry to see you go</div>
        );
    };
}

export default connect(null, {
    signOut: signOut
})(SignOut);