import React from 'react';

import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import Colors from '../values/Colors';
import Fonts from '../values/Fonts';
import Dimens from '../values/Dimens';
import styles from './ComponentStyles';

const ProfileHeaderStyles = StyleSheet.create({
    userRow: {
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 32,
    },
    profileImage: {
        width: 84,
        height: 84,
        borderRadius: 40,
        backgroundColor: '#0000001a',
    },
    profileText: {
        color: Colors.primary,
        fontFamily: Fonts.primaryBold,
        fontSize: Dimens.headerPrimaryText
    },
    levelText: {
        fontFamily: Fonts.primaryBold,
        fontSize: Dimens.headerSecondaryText
    },
    profileTextWrapper: {
        marginTop: 12,
    },
    profileIcon: {
        position: 'absolute',
        top: 4,
        left: Dimens.smallScreen ? -20 : -30,
        width: Dimens.iconSize,
        height: Dimens.iconSize,
    },

    container: {
        alignItems: 'center',
    },
    profileImage: {
        backgroundColor: 'gray',
        width: Dimens.iconSizeXL,
        height: Dimens.iconSizeXL,
        borderRadius: 90,
    },   
    profileBackground: {
        resizeMode: 'contain', 
        width: '100%', 
        marginBottom: -14,
    }

});


export default class ProfileColumnStyles extends React.PureComponent {
    constructor(props){
        super(props);

        this.state = {
            name: 'this.props.user.name',
        }
    }

    componentDidMount(){
        this.setState({
            name: this.props.user.name
        })
    }

    render(props) {
        return (
            <View style={ProfileHeaderStyles.userRow}>
                <View style={ProfileHeaderStyles.container}>
                    <Image
                        style={ProfileHeaderStyles.profileImage} source={require('../res/assets/avatar.png')} />
                    <Image
                        style={ProfileHeaderStyles.profileIcon} source={require('../res/assets/trophy_profile.png')} />
                    <View style={ProfileHeaderStyles.profileTextWrapper}>
                        <Text style={[ProfileHeaderStyles.profileText, { textAlign: 'center' }]}>{this.state.name}</Text>
                        <Text style={[ProfileHeaderStyles.levelText, { textAlign: 'center' }]}>{'Master Investor'}</Text>
                    </View>
                </View>
                <Image style={ProfileHeaderStyles.profileBackground} source={require('../res/assets/temp/profile_bg.jpg')} />
            </View>
        )
    };
}