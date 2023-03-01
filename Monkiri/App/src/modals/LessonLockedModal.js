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

const LessonLockedStyles = StyleSheet.create({

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

    textTitle: {
        fontSize: 14,
        margin: 8,
    },

    textDescription: {
        fontSize: 12,
        margin: 8,
        textAlign: 'center',
        width: '65%',
    }

});

export default class LessonLockedModal extends PopupModalComponent {

    renderContent(extra) {
        return (
            <View
                style={[styles.wrap, LessonLockedStyles.container]}>                
                <ExitButton onPress={this.close}/>
                <Text style={styles.textTitle}>{'Lesson Locked'.getString()}</Text>
                <Text style={LessonLockedStyles.textDescription}>{'Complete previous lessons to complete this one.'.getString()}</Text>
                <Image
                    style={LessonLockedStyles.image}
                    source={require('../res/assets/lock.png')}/>
                <View
                    style={styles.buttonContainer}>
                    <FilledButton label={'GO TO LESSON'.getString()} />
                </View>
            </View>
        )
    }

}