import React from 'react';

import {
    View,
    ProgressViewIOS,
    ProgressBarAndroid
} from 'react-native'; 

import Colors from '../values/Colors';
//todo implement for iOS
export default class SimpleProgressComponent extends React.PureComponent {
    
    render() {
        return (
            <View style={{ justifyContent: 'center',
            flex: 1,
            alignItems: 'center'}}>
            <ProgressBarAndroid
            styleAttr="Small"
            color={Colors.primary}
          /></View>
            
        )
    }
}