import React from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Colors from '../values/Colors';
import Sizes from '../values/Sizes';
import Fonts from '../values/Fonts';

const ButtonStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
    },
    touchable: {
        alignSelf: 'stretch',
        padding: 8,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: Colors.primary,
    },

    label: {
        fontSize: Sizes.textHeader2,
        fontFamily: Fonts.primaryBold,
        textAlign: 'center',

    },

})

export default class ToggleButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1 //indicates unselected state
        };
    }

    /**
     * Toggle select state on the button. Called when button is pressed.
     * Return the index of the selected button to the component through onChange(). If no button is selected it returns -1
     */
    _updateSelectedIndex = (index) => {
        var enableButton = this.state.selectedIndex != index ? index : -1;
        this.setState({ selectedIndex: enableButton }, function () {
            this.props.onChange(enableButton);
        });
    };

    render() {
        return (
            <View style={ButtonStyles.container}>
                {this.props.options.map((option, index) => (
                    <View style={{ padding: 6 }} key={index}>
                        <TouchableOpacity activeOpacity={0.65}
                            onPress={() => {
                                this._updateSelectedIndex(index);
                            }}
                            style={[ButtonStyles.touchable, { backgroundColor: this.state.selectedIndex === index ? Colors.primary : 'white' }]}>
                            <Text style={[ButtonStyles.label, { color: this.state.selectedIndex === index ? 'white' : 'black' }]}>
                                {option.value.getString()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    }
}