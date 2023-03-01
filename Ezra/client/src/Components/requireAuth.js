//Checks to make sure that user is logged in
import React from 'react';
import {connect} from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends React.Component {
        //Component just rendered
        componentDidMount() {
            this.loggedIn();
        }

        //Component just got updated
        componentDidUpdate() {
            this.loggedIn();
        } 

        loggedIn() {
            if (!this.props.token) {
                this.props.history.push('/');
            }
        }

        //need the ...this.props to pass in the actions
        render() {
            return (
                <ChildComponent {...this.props}/>
            );
        }
    }

    function mapStateToProps(state) {
        return {token: state.user.token};
    }

    return connect(mapStateToProps)(ComposedComponent);
};