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

const LessonStartStyles = StyleSheet.create({

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
        textAlign: 'center',
        width: '65%',
    },

});

export default class LessonStartModal extends PopupModalComponent {

    renderContent(extra) {
        const lesson = extra.lesson;
        const progress = extra.progress;
        const total = extra.total;
        console.table(lesson)
        return (
            <View
                style={[styles.wrap, LessonStartStyles.container]}>
                <ExitButton onPress={this.close} />
                <Text style={styles.textTitle}>{lesson.name}</Text>
                {lesson.description !== null ? 
                <Text style={styles.textDescription}>{`Learn about ${lesson.title}!`}</Text> : null}
                <View style={{marginTop: 16, marginBottom: 18}}>
                    <Text style={styles.textSubtitle} >{'Stages Complete'.getString()}</Text>
                    <Text style={styles.textBold} >{`${progress}/${total}`}</Text>
                </View>
                <View
                    style={styles.buttonContainer}>
                    <FilledButton label={'START LESSON'.getString()} onPress={this.props.onPress} />
                </View>
            </View>
        )
    }

}