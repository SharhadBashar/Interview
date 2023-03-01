import React from 'react';
import { BASE_URL } from 'react-native-dotenv';

import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import PopupModalComponent from '../components/PopupModalComponent';

import styles from './ModalStyles';
import FilledButton from '../components/FIlledButton';
import ExitButton from '../components/ExitButton';
import Colors from '../values/Colors';
import Fonts from '../values/Fonts';

const ChallengeStyles = StyleSheet.create({

    container: {
        alignItems: 'center'
    },

    titleContainer: {
        padding: 12,
    },

    taskContainer: {
        padding: 12,
        width: '100%',
        backgroundColor: Colors.backgroundGray
    },

    rewardsContainer: {
        padding: 12,
        width: '100%',
    },

    timeContainer: {
        padding: 12,
        width: '100%',
        backgroundColor: Colors.backgroundGray
    },
    
    roundContainer: {
        paddingLeft: 22,
        paddingRight: 22,
        marginBottom: 18,
        borderRadius: 10,
        backgroundColor: Colors.backgroundGray
    },

    sponsorContainer: {
        padding: 12,
        width: '100%',
        alignItems: 'center'
    },

    image: {
        width: 46,
        height: 46,
        margin: 8,
    },
    badgeIcon: {
        width: 24,
        height: 24,
        marginLeft: 4,
        marginRight: 4,
    }

});

export default class ChallengeModal extends PopupModalComponent {

    renderContent(extras) {
        const challenge = extras.challenge;
        return (
            <View
                style={[styles.wrap, ChallengeStyles.container]}>
                <ExitButton onPress={this.close} />
                <View
                    style={ChallengeStyles.titleContainer}>
                    <Text style={styles.textTitle}>{challenge.name}</Text>
                </View>
                <View
                    style={ChallengeStyles.taskContainer}>
                    <Text style={styles.textHeader}>{"TASK".getString()}</Text>
                    <Text style={styles.textDescription}>{challenge.description}</Text>
                </View>
                <View
                    style={ChallengeStyles.rewardsContainer}>
                    <Text style={styles.textHeader}>{"REWARDS".getString()}</Text>
                </View>
                <View style={[ChallengeStyles.roundContainer, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <Image style={ChallengeStyles.image} resizeMode={'contain'} source={require('../res/icons/ic_badge_trophy.png')} />

                    <Text style={styles.textTitle}>{'X 150'}</Text>
                </View>
                <View
                    style={ChallengeStyles.timeContainer}>
                    <Text style={styles.textHeader}>{"TIME REMAINING".getString()}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'  }}>
                        <Image style={ChallengeStyles.badgeIcon} source={{ uri: (`${BASE_URL}/img/ic_hourglass.png`) }} />
                        <Text style={styles.textDescriptionBold}>{'5 days, 4 hours, 20 minutess'}</Text>
                    </View>
                </View>
                <View
                    style={ChallengeStyles.sponsorContainer}>
                    <Text style={styles.textHeader}>{"SPONSORED BY".getString()}</Text>
                    <Image style={ChallengeStyles.image} source={require('../res/assets/img_pipay.png')} />
                </View>
                <View
                    style={[styles.buttonContainer, { paddingLeft: 12, paddingRight: 12 }]}>
                    <FilledButton label={'START CHALLENGE'.getString()} />
                </View>
            </View>
        )
    }

}

class RewardsView extends React.PureComponent {

    render() {
        return (
            <View />
        )
    }

}
