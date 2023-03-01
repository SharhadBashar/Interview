import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    ActivityIndicator,
} from 'react-native';

import QuestionsBaseView from './questions/QuestionsBaseView';

import { getQuestions } from '../services/Services';

export default class LessonView extends React.PureComponent {

    state = {
        lesson: null,
        category: null,
        questions: null,
    }

    constructor(props) {
        super(props);
        this.state.lesson = props.navigation.getParam('lesson');
        this.state.category = props.navigation.getParam('category');
    }

    componentDidMount() {
        this._getLessonQuestions();
    }

    render() {
        if(this.state.questions && this.state.questions.length) {
            return <QuestionsBaseView lessonName={this.state.lesson.name} questions={this.state.questions}  navigation={this.props.navigation} category={this.state.category}/>
        } else {
            return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator /></View>
        }
    }

    _getLessonQuestions() {
        getQuestions(this.state.lesson.id).then(data => {
            this.setState({questions: data});
        })
    }
}
