import React from 'react';

import {
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import BackButton from './BackButton';

import Colors from '../values/Colors';
import Fonts from '../values/Fonts';
import Dimens from '../values/Dimens';
import Sizes from '../values/Sizes';

const BaseHeaderStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        height: Sizes.headerHeight,
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',     
        //android shadow
        elevation: 4,
        //ios shadow
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    label: {
        color: 'white',
        fontSize: Dimens.headerPrimaryText,
        fontFamily: Fonts.primaryBold,
    },
    backBtn:{
        position: 'absolute',
        left: 20,
        top: 30
    }
});

export default class BaseHeaderComponent extends React.PureComponent {

    render() {
        const props = this.props;
        return (
            <View style={BaseHeaderStyles.container}>
                {this.props.showBack && (<View style={[BaseHeaderStyles.backBtn]}>
                                    <BackButton onPress={this.props.goBack} />
                                </View>)}
                                
                <Text style={BaseHeaderStyles.label}>{props.label}</Text>
            </View>
        )
    }

}