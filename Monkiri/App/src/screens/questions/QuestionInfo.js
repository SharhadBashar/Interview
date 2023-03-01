import React from 'react';

import {
    View,
    Image,
    Animated,
    Text,
    StyleSheet
} from 'react-native';
import Fonts from '../../values/Fonts';
import LessonStyles from './LessonStyles';

import { BASE_URL } from 'react-native-dotenv'

const QuestionStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 18,
        paddingBottom: 18
    },

    label: {
        padding:6,
        fontSize: 20,
        fontFamily: Fonts.primaryBold,
        color: 'black',
        textAlign: 'center',
    },

    icon: {
        margin: 8,
        height: 90,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },

})

export default class QuestionInfo extends React.PureComponent {
    render() {
        return (
            <View style={LessonStyles.contentContainer}>
                <Animated.View style={[LessonStyles.answerContainer, { opacity: this.props.opacity }]}>
                    <Image style={QuestionStyles.icon} source={{ uri:(`${BASE_URL}/img/img_warn.png`) }} />
                    <Text style={[QuestionStyles.label, {fontSize: 25}]}>{this.props.title}</Text>
                    <Text style={QuestionStyles.label}>{this.props.content}</Text>
                </Animated.View>
            </View>
        )
    }
}
