import React from 'react';
import { BASE_URL } from 'react-native-dotenv'

import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import PopupModalComponent from '../components/PopupModalComponent';
import ExitButton from '../components/ExitButton';

import componentStyle from '../components/ComponentStyles';
import styles from './ModalStyles';
import FilledButton from '../components/FIlledButton';
import OutlineButton from '../components/OutlineButton';
import Colors from '../values/Colors';

const LessonSeeStyles = StyleSheet.create({

    container: {
        alignItems: 'center',
        padding: 14,
    },

    buttonContainer: {
        padding: 12,
    },

    image: {
        width: 48,
        height: 48,
        tintColor: Colors.imageGray,
        margin: 8,
        resizeMode: 'contain'
    },

    textDescription: {
        fontSize: 12,
        margin: 8,
        textAlign: 'center',
        width: '65%',
    },

});

export default class LessonSeeModal extends PopupModalComponent {

    renderContent(extra) {
        const hasLesson = extra.hasLesson;
        const lesson = extra.lesson;

        let hasDescription = lesson.description !== null;
        return (
            <View
                style={[styles.wrap, LessonSeeStyles.container]}>
                <ExitButton onPress={this.close} />
                <Image style={[LessonSeeStyles.image, { tintColor: lesson.color, backgroundColor: '#00000000' }]} source={{ uri: (`${BASE_URL}/img/${lesson.image_link}`) }} />
                <Text style={[componentStyle.categoryTitle, { color: lesson.color }]}>{lesson.name}</Text>
                {hasDescription ? <Text style={styles.textDescription}>{lesson.description}</Text> : null}

                <LessonOptionsView 
                    hasLesson={hasLesson}
                    progress={lesson.progress} 
                    lessonCount={lesson.lessonCount} 
                    seeLessons={this.props.onPress} 
                    saveCategory={this.props.onSave}
                    removeCategory={this.props.onRemove} />

            </View>
        )
    }

}
const LessonOptionsView = props => (
    <View style={{ alignSelf: 'stretch', marginTop: 12 }}>
        {props.lessonCount !== undefined ?
            <View style={{ marginTop: 16, marginBottom: 18 }}>
                <Text style={styles.textSubtitle} >{'Lessons Completed'.getString()}</Text>
                <Text style={styles.textBold} >{`${props.progress}/${props.lessonCount}`}</Text>
            </View> : null}
        <View
            style={styles.buttonContainer}>
            <FilledButton label={'SEE LESSONS'.getString()} onPress={props.seeLessons} />
        </View>
        {!props.hasLesson ? 
        <View
            style={styles.buttonContainer}>
            <OutlineButton label={"Add to 'My Lessons'".getString()} onPress={props.saveCategory.bind(this)} />
        </View> : 
        <View
            style={styles.buttonContainer}>
            <OutlineButton label={"Remove lesson from 'My Lessons'".getString()} onPress={props.removeCategory.bind(this)} />
        </View> 
        }
    </View>
)

const NoLessonsPlaceholder = () => (
    <View style={{ alignSelf: 'stretch' }}>
        <Text style={{ textAlign: 'center', padding: 8 }} >{'This category does not contain any lessons yet. Please check again later'.getString()}</Text>
    </View>
)