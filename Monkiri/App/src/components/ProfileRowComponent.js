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

const ProfileRowStyles = StyleSheet.create({
    userRow: {
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 38,
        marginRight: 18,
        marginBottom: 28,
        marginTop: 24,
    },
    profileImage: {
        width: Dimens.defaultItemSize,
        height: Dimens.defaultItemSize,
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
        marginLeft: 20,
    },
    profileIcon: {
        position: 'absolute',
        top: 0,
        left: -14,
        width: 34,
        height: 34,
    },
    notificationIcon: {
        width: Dimens.iconSize,
        height: Dimens.iconSize,
        alignSelf: 'flex-start',
    },
    notificationCounter: {
        height: 16,
        width: 16,
        position: 'absolute',
        top: 4,
        left: -3,
        backgroundColor: Colors.alertRed,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: Dimens.smallText,
        fontFamily: Fonts.primaryBold,
        paddingTop: 1,
        color: 'white',
        elevation: 4,
    }
});

export default class ProfileRowComponent extends React.PureComponent {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            num_completed: 0,
            num_inProgress: 0,
        }
    }

    componentWillReceiveProps(nextProp){
        this.setState({
            name: nextProp.user.name,
            num_completed: nextProp.lessonData.completed,
            num_inProgress: nextProp.lessonData.inProgress
        })
    }

    render() {
        return (
            <View>
                <View
                    style={ProfileRowStyles.userRow}>
                    <Image style={{ position: 'absolute', width: '120%', left: -38, bottom: -42 }} resizeMode={'contain'} source={require('../res/assets/temp/profile_bg.jpg')} />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={ProfileRowStyles.profileImage} source={require('../res/assets/avatar.png')} />
                        <Image
                            style={ProfileRowStyles.profileIcon} source={require('../res/assets/trophy_profile.png')} />
                        <View style={ProfileRowStyles.profileTextWrapper} >
                            <Text style={ProfileRowStyles.profileText}>{this.state.name}</Text>
                            <Text style={ProfileRowStyles.levelText}>{'Master Investor'}</Text>
                        </View></View>
                    <TouchableOpacity onPress={() => console.log("HM")} style={ProfileRowStyles.notificationIcon}>
                        <View>
                            <Text style={ProfileRowStyles.notificationCounter}>{'3'}</Text>
                            <Image style={ProfileRowStyles.notificationIcon} source={require('../res/icons/ic_notification.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.statCompletionRow}>
                    <CounterComponent
                        label={'Completed'}
                        count={this.state.num_completed} />
                    <CounterComponent
                        label={'In Progress'}
                        count={this.state.num_inProgress} />
                </View>
            </View>
        )
    }

}

const CounterComponent = props => (
    <View style={styles.statContainer}>
        <View style={styles.statTextWrapper}>
            <Text style={styles.statLabelText}>{props.label}</Text>
            <Text style={styles.statCountText}>{props.count}</Text>
        </View>
    </View>
)