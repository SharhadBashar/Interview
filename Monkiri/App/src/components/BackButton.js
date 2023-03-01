import React from 'react';

import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import Colors from '../values/Colors';
import Fonts from '../values/Fonts';
import Size from '../values/Sizes';

const ButtonStyles = StyleSheet.create({
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        width: Size.buttonHeight,
        height: Size.buttonHeight,
        top: -18,        
        left: -12,                         
        position: 'absolute',   
    },

    label: {
        fontSize: 16,
        color: 'white',
        fontFamily: Fonts.primaryBold,
    },
    
    icon: {
        height: Size.buttonIcon,
        alignSelf: 'center',
        resizeMode: 'contain',
    }
})

export default class BackButton extends React.PureComponent {

    render() {
        return (
            <TouchableOpacity {...this.props} 
                onPress={this.props.onPress }
                style={ButtonStyles.touchable}>                
                <Image source={require('../res/temp/back.png')} style={ButtonStyles.icon} />
            </TouchableOpacity>            
        )
    }

}