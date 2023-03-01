import React from 'react';

import {
    TouchableHighlight,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../values/Colors';
import Fonts from '../values/Fonts';
import Sizes from '../values/Sizes';
import styles from '../components/ComponentStyles';

const ButtonStyles = StyleSheet.create({
    active: {
        backgroundColor: Colors.primary,
    },
    inactive: {
        backgroundColor: Colors.borderGray,
    },
    label: {
        color: 'white',
    },
    labelLarge:{
        color: 'white',
        fontSize: Sizes.textButtonLG,
    }
})

export default class FilledButton extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight {...this.props} underlayColor={Colors.active}
                onPress={this.props.inactive ? null : this.props.onPress} 
                style={[styles.defaultButtonStyle, this.props.inactive ? ButtonStyles.inactive : ButtonStyles.active]}>
                <Text style={[styles.defaultButtonLabel, this.props.largeText ? ButtonStyles.labelLarge: ButtonStyles.label]}>
                    {this.props.label}
                </Text>
            </TouchableHighlight>
        )
    }
}