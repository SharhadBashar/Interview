import React from 'react';

import {
    TouchableHighlight,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../values/Colors';
import styles from './ComponentStyles';

const ButtonStyles = StyleSheet.create({
    active: {
        backgroundColor: Colors.primary,
    },
    touchable: {
        alignSelf: 'stretch',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: Colors.primary,
        backgroundColor: 'white'
    },

    label: {
        color: Colors.primary
    },
})

export default class OutlineButton extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight {...this.props} underlayColor={Colors.active}
                onPress={this.props.onPress} 
                style={[styles.defaultButtonStyle, ButtonStyles.touchable]}>
                <Text style={[styles.defaultButtonLabel, ButtonStyles.label]}>
                    {this.props.label}
                </Text>
            </TouchableHighlight>
            
        )
    }
}