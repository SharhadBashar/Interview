//The button component
import React from 'react';

class Button extends React.Component {
    enabled() {
        const {username, password} = this.props.state;
        return username.length > 0 && password.length > 0;
    };
    
    render() {
        var enabled = this.enabled();
        return (
            <button 
                className = {(enabled) ? "" : "disabled"} 
                type = "submit" 
                disabled = {!enabled}
            >
                {this.props.text}
            </button>
        );
    };
}

export default Button;