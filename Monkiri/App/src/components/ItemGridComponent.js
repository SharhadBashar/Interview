import React from 'react';

import {
    View,
    StyleSheet,
    Image,
    Text,
    Button,
} from 'react-native';
import Colors from '../values/Colors';
import Fonts from '../values/Fonts';
import Dimens from '../values/Dimens';
import styles from './ComponentStyles';

const ItemStyles = StyleSheet.create({

    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        margin: 26,
    },
    textSubtitle: {
        textAlign: 'center',
        fontSize: Dimens.headerSecondaryText,
        fontFamily: Fonts.primaryBold,
    },
    textButton: {
        textAlign: 'center',
        fontSize: Dimens.headerSecondaryText,
    },
    dividerStyle: {
        backgroundColor: Colors.backgroundGray,
        height: 2,
        width: '100%',
        marginTop: 26,
    },
    itemPreviewContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 26,
        marginRight: 26
    },
    itemContainer: {
        flex: 1,
        height: 100,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 26,
        marginRight: 26,
    },
    badgeIcon: {
        width: '20%',
        aspectRatio: 1,
    }
});

export default class ItemGridComponent extends React.PureComponent {
    render() {
        const label = this.props.label;
        const button = this.props.buttonLabel;
        return (
            <View style={{ flexDirection: 'column' }}>
                <View style={[ItemStyles.containerHeader]}>
                    <Text style={[styles.statLabelText, ItemStyles.textSubtitle]}>{label}</Text>
                    <Text style={[styles.statCountText, ItemStyles.textButton]} onPress={() => { this.props.trophiesPressed(this.props.data) }}>{button}</Text>
                </View>
                <View style={[ItemStyles.badgeContainer]}>
                    <Image style={ItemStyles.badgeIcon} resizeMode={'contain'} source={require('../res/icons/ic_badge_award.png')} />
                    <Image style={ItemStyles.badgeIcon} resizeMode={'contain'} source={require('../res/icons/ic_badge_money.png')} />
                    <Image style={ItemStyles.badgeIcon} resizeMode={'contain'} source={require('../res/icons/ic_badge_trophy.png')} />
                    <Image style={ItemStyles.badgeIcon} resizeMode={'contain'} source={require('../res/icons/ic_badge_unlockable.png')} />
                </View>
                <View style={ItemStyles.dividerStyle} />
            </View>
        )
    };

}