import React from 'react';
import { BASE_URL } from 'react-native-dotenv'

import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    CheckBox
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
        width: 68,
        height: 68,
        margin: 8,
        resizeMode: 'contain'
    },

    textDescription: {
        fontSize: 12,
        margin: 8,
        textAlign: 'center',
        width: '65%',
    },
    subtitle: {
        marginTop: 10,
    }
});

export default class FeedbackModal extends PopupModalComponent {

    componentDidMount() {
        this.setState({
            text: "",
            private: false
        });
        this.setFeedbackData = this.setFeedbackData.bind(this);
    }

    setFeedbackData(){        
        this.props.onPress({text: this.state.text, private: this.state.private})
    }

    renderContent(extra) {
        const lesson = extra.lesson;
        return (
            <View
                style={[styles.wrap, LessonSeeStyles.container]}>
                <ExitButton onPress={this.close} />
                <Image style={[LessonSeeStyles.image]} source={{ uri: (`${BASE_URL}/img/img_211.png`) }} />
                <Text style={styles.textDescription}>{('Tell us how we can improve Monkiri. We would love to hear from you!').getString()}</Text>

                <Text style={[componentStyle.categoryTitle, LessonSeeStyles.subtitle]}>{'FEEDBACK'}</Text>
                <TextInput
                    style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 6, alignSelf: 'stretch', margin: 10, paddingLeft: 8 }}
                    onChangeText={(text) => this.setState({ text })}
                    placeholder='Enter your feedback here'
                    multiline = {true}
                    value={this.state.text}
                />
                <View style={{flexDirection: 'row', alignSelf:'center', alignItems:'center', paddingBottom: 14}}>
                    <Text style={[componentStyle.categoryTitle]}>{'Send Anonymously: '}</Text>
                    <CheckBox
                    style={{tintColor: Colors.primary}}
                     value={this.state.private}
                     onValueChange={() => this.setState({ private: !this.state.private })}
                    />
                </View>
                <View
                    style={styles.buttonContainer}>
                    <FilledButton label={'SUBMIT'.getString()} onPress={ this.setFeedbackData} />
                </View>
            </View>
        )
    }

}