import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import ExitButton from '../../components/ExitButton';
import BackButton from '../../components/BackButton';

import styles from '../../components/ComponentStyles';
import LessonStyles from './LessonStyles';

import QuestionTF from './QuestionTrueFalseView';
import QuestionMulti from './QuestionMultichoiceView';
import QuestionText from './QuestionTextView';
import QuestionTextDemo from './QuestionTextView-Backup';
import QuestionInfo from './QuestionInfo';

import LessonCompleteView from './LessonCompleteView';

import FilledButton from '../../components/FIlledButton';
import ProgressBarComponent from '../../components/ProgressBarComponent';

const QuestionStyle = StyleSheet.create({

    viewWrapper: {
        justifyContent: 'center',
        paddingTop: 58,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 88,
    },
    questionContainer: {
        justifyContent: 'center',
        paddingTop: 48,
    },
    questionText: {
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: 16
    },
    exitBtn: {
        position: 'absolute',
        right: 32,
        top: 40
    },
    submitBtn: {
        marginBottom: 30,
        position: 'absolute',
        bottom: 0
    },
    backBtn: {
        position: 'absolute',
        left: 32,
        top: 40

    }
});

export default class QuestionsBaseView extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            continue: false,                        //'next' button 
            nextBtnText: "Continue",
            questionArr: this.props.questions,
            current: 0,
            progress: 0,                            //for progress bar
            fade: new Animated.Value(1)
        };

        this._next = this._next.bind(this);
    }

    //Transistion to next question 
    _next() {
        this.state.continue = false;
        this.state.nextBtnText = "Continue";
        this.refs._scrollView.scrollTo({ y: 0 });
        this.state.fade.setValue(1)
        Animated.timing(
            this.state.fade,
            {
                toValue: 0,
                duration: 250,
            }
        ).start(() => {
            const total = this.props.questions.length;
            const current = this.state.current + 1;
            const newProgress = (current / total);
            if (this.state.current < total) {
                this.setState({
                    current: this.state.current + 1,
                    progress: newProgress
                });
            }
            Animated.timing(
                this.state.fade,
                {
                    toValue: 1,
                    duration: 250,
                    delay: 100
                }
            ).start();
        });
    }

    _goBack() {//!repetitive
        this.state.continue = false;
        this.state.nextBtnText = "Continue";
        this.refs._scrollView.scrollTo({ y: 0 });
        this.state.fade.setValue(1)
        Animated.timing(
            this.state.fade,
            {
                toValue: 0,
                duration: 250,
            }
        ).start(() => {
            const total = this.props.questions.length;
            const current = this.state.current - 1;
            const newProgress = (current / total);
            if (this.state.current < total) {
                this.setState({
                    current: this.state.current - 1,
                    progress: newProgress
                });
            }
            Animated.timing(
                this.state.fade,
                {
                    toValue: 1,
                    duration: 250,
                    delay: 100
                }
            ).start();
        });
    }

    _setQuestionState(newState) {
        console.log("Setting continue = " + newState)
        this.setState({ continue: newState });
        //todo set user progress and get selected answer
    }

    _setNextText() {
        this.state.nextBtnText = "Check Answer".getString();
    }

    _getAnswerView = (type, questionData) => {
        var theme = this.props.category.color
        switch (type) {
            case "text":
                this.state.continue = true;
                return <QuestionTextDemo answers={this.state.questionArr[this.state.current].lessonId + "." + (this.state.current + 1)} color={theme} opacity={this.state.fade} />;
            case "warn":
                this.state.nextBtnText = "Continue".getString();
                this.state.continue = true;
                return <QuestionInfo opacity={this.state.fade} title={this.state.questionArr[this.state.current].name} content={this.state.questionArr[this.state.current].question} />;
            case "multiplechoice":
                this._setNextText();
                return <QuestionMulti color={theme} opacity={this.state.fade} answers={questionData.options} onChange={(e) => this._setQuestionState(e)} />;
            case "truefalse":
                this._setNextText();
                return <QuestionTF color={theme} opacity={this.state.fade} onChange={(e) => this._setQuestionState(e)} />;
            case "input":
                this._setNextText();
                this.state.continue = true;//temp
                return <QuestionText color={theme} opacity={this.state.fade} answers={questionData.options} onChange={(e) => this.setState({ continue: true })} />;
            case "wordimage"://also handles videos
                if (questionData.options[0].type != 'video') {
                    this.state.continue = true;
                }
                console.log(questionData.options)
                return <QuestionText color={theme} opacity={this.state.fade} answers={questionData.options} onChange={(e) => this.setState({ continue: true })} />;
        }
    };

    render() {
        const theme = this.props.category.color;
        const currentQuestion = this.state.questionArr[this.state.current];
        
        if (this.state.current < this.state.questionArr.length) {
            const { name, type, question, questionData } = currentQuestion;

            let answerView = this._getAnswerView(type, questionData);

            return (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView
                        ref='_scrollView'
                        contentContainerStyle={QuestionStyle.scrollContainer}>
                        {type != "warn" && (
                            <View style={[QuestionStyle.questionContainer, { backgroundColor: theme }]}>
                                {this.state.current > 0 //show back button after first question
                                    ? <View style={[QuestionStyle.backBtn]}>
                                        <BackButton onPress={() => this._goBack()} />
                                    </View>
                                    : null}

                                <View style={QuestionStyle.exitBtn} >
                                    <ExitButton onPress={() => this.props.navigation.pop()} />
                                </View>

                                <Animated.Text style={[styles.titleTextWhite, { textAlign: 'center', marginBottom: 6, opacity: this.state.fade }]}>
                                    {this.props.category.name}
                                </Animated.Text>
                                <Text style={styles.smallText}>
                                    {this.props.lessonName}
                                </Text>
                                <ProgressBarComponent progress={this.state.progress} />

                                <Animated.Text style={[styles.titleTextWhite, QuestionStyle.questionText, { opacity: this.state.fade }]}>
                                    {question}
                                </Animated.Text>
                                <Image source={require('../../res/assets/temp/roundedborder.png')} fadeDuration={0}
                                    style={[LessonStyles.curveImage, { tintColor: theme, backgroundColor: 'white' }]} />
                            </View>)}
                        {answerView}
                        <Animated.View style={[LessonStyles.answerContainer, QuestionStyle.submitBtn, { opacity: this.state.fade }]} >
                            <FilledButton label={this.state.nextBtnText} inactive={(!this.state.continue)} onPress={() => this._next()} />
                        </Animated.View>
                    </ScrollView>

                </View>
            )
        } else {
            return <LessonCompleteView lesson={this.state.questionArr[this.state.current - 1].lessonId} category={this.props.category} questions={this.state.questions} navigation={this.props.navigation} theme={theme} />

            //todo check if this is the final lesson, if so return CategoryCompleteView
            //const id = this.state.questionArr[this.state.current-1].lessonId;
            //return <CategoryCompleteView lesson={this.state.questionArr[this.state.current-1].lessonId} category={this.props.category} questions={this.state.questions} navigation={this.props.navigation} lessonTheme={theme} />

        }
    }


}