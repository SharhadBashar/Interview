import React from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import PopupModalComponent from '../components/PopupModalComponent';
import ExitButton from '../components/ExitButton';

import styles from './ModalStyles';
import FilledButton from '../components/FIlledButton';
import Colors from '../values/Colors';

const LessonHintStyles = StyleSheet.create({

    container: {
        alignItems: 'center',
        padding: 14,
    },

    buttonContainer: {
        padding: 12,
    },

    image: {
        width: 100,
        height: 100,
        tintColor: Colors.imageGray,
        margin: 8,
    },

    textDescription: {
        fontSize: 12,
        margin: 8,
        width: '85%',
    },

});

export default class LessonHintModal extends PopupModalComponent {

    renderContent(extra) {
        const lesson = extra.lesson;
        return (
            <View
                style={[styles.wrap, LessonHintModal.container]}>
                <ExitButton onPress={this.close} />
                <Image style={styles.iconStyle} />
                <Text style={[styles.textTitle, {color: Colors.textPrimary}]}>{lesson.name}</Text>
                <Text style={LessonHintModal.textDescription}>{'Learn about the benefits of mobile wallets'.getString()}</Text>
                <View
                    style={styles.buttonContainer}>
                    <FilledButton label={'GOT IT'.getString()} />
                </View>
            </View>
        )
    }

}

