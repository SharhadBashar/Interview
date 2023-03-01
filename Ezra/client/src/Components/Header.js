//The header component
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Style.css'

class Header extends React.Component {
    renderLinks() {
        if (this.props.token) {
            return (
                <div className = "links">
                    <Link to = "/signOut">Sign Out</Link>
                    <Link to = "/users">Users</Link>
                </div>
            );
        }
        else {
            return (
                <div className = "links">
                    <Link to = "/signUp">Sign Up</Link>
                    <Link to = "/signIn">Sign In</Link>
                </div>
            );
        }
    };

    render() {
        return (
            <div className = "header">
                <Link to = "/">App Home Page</Link>
                {this.renderLinks()}
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {token: state.user.token};
}

export default connect(mapStateToProps)(Header);