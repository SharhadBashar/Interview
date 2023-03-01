import React from 'react';

import {
    TouchableHighlight,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import Colors from '../values/Colors';
import Fonts from '../values/Fonts';
import Size from '../values/Sizes';

const ButtonStyles = StyleSheet.create({
    touchable: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 50, // Will round fully
        width: Size.buttonHeight,
        height: Size.buttonHeight,
        top: -18,        
        right: -12,                         
        position: 'absolute',      
        
        //ios
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0
        },
        //android 
        elevation: 6,
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

export default class ExitButton extends React.PureComponent {

    render() {
        return (
            <TouchableHighlight {...this.props} 
                onPress={this.props.onPress }
                underlayColor={Colors.active}  
                style={ButtonStyles.touchable}>                
                <Image source={require('../res/assets/temp/exit.png')} style={ButtonStyles.icon} />
            </TouchableHighlight>            
        )
    }

}