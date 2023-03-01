import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';


import { AccessToken } from 'react-native-fbsdk';
import styles from '../../components/ComponentStyles';
import LessonStyles from './LessonStyles';
import FilledButton from '../../components/FIlledButton';
import ExitButton from '../../components/ExitButton';

import Confetti from 'react-native-confetti';

import { getLesson, getLessonObjectives, getCategoryObjectives } from '../../services/Services';
import { updateFavoriteCategory } from '../../services/UserServices';
import Colors from '../../values/Colors';

const QuestionStyle = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    headerContainer: {
        marginBottom: 50,
        marginTop: 100
    },
    exitBtn: {
        position: 'absolute',
        right: 32,
        top: 40
    },
    submitBtn: {
        padding: 50,
        alignSelf: 'stretch',
    },
    imageBtn: {
        padding: 50,
        alignSelf: 'center',
        marginBottom: -40,
    },
});

//Final view for completed lessons and categories
export default class LessonCompleteView extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            showCategoryComplete: false,
            category: this.props.navigation.getParam('category', null),
            lesson: this.props.navigation.getParam('lesson', null),

            lessonIndex: -1,
            lessons: [],
            objectives: [],
        };
    }


    componentDidMount() {
        this._getLesson();
        this._getLessonObjectives();
    }
    componentWillUnmount() {
        this._toggleConfetti(false);
    }

    //Get lesson array and store current index to navigate to next lesson later
    _getLesson() {
        getLesson(this.state.category.id).then(lessons => {
            this.setState({
                lessons: lessons,
                lessonIndex: lessons.map(function (e) { return e.id; }).indexOf(this.state.lesson.id)
            });

        });
    }

    _getLessonObjectives() {
        getLessonObjectives(this.state.lesson.id).then(objectives => {
            this.setState({
                objectives: objectives,
                isLoading: false,
            });
        });
    }

    _getCategoryObjectives() {
        getCategoryObjectives(this.state.category.id).then(objectives => {
            this.setState({
                objectives: objectives,
                isLoading: false,
            }, function () {
                this._toggleConfetti(true);
            });
        });
    }

    _categoryFinished() {
        this.setState({
            showCategoryComplete: true,
            isLoading: true,//!
        }, function () {
            this._getCategoryObjectives();
        });
    }


    _toggleConfetti(show) {
        if (this._confettiView) {
            show ? this._confettiView.startConfetti() : this._confettiView.stopConfetti();
        }
    }


    _nextLesson() {
        var nextLesson = this.state.lessons[this.state.lessonIndex + 1];
        this.props.navigation.pop()
        this.props.navigation.navigate('LessonView', { lesson: nextLesson, category: this.state.category })
        /*
        const navigateAction = NavigationActions.navigate({
            routeName: 'LessonView',
       
            params: { lesson: nextLesson, category: this.state.category },
            key: 'LessonView' + nextLesson
       });
       
       this.props.navigation.dispatch(navigateAction);*/

    }
    //remove category from users favorites
    _updateLessonProgress = () => {              
        AccessToken.getCurrentAccessToken().then((data) => {
            const { userID } = data;
            let catID = this.state.category.id;
            let progress = this.state.lessonIndex + 1;
            updateFavoriteCategory(userID, catID, progress);
        });
   }

    render() {
        const isCat = this.state.showCategoryComplete;
        const bgColor = isCat ? Colors.favoriteYellow : this.props.theme;
        const textColor = isCat ? 'black' : 'white';
        const isFinalLesson = (this.state.lessonIndex + 1) < this.state.lessons.length;

        this._updateLessonProgress();

        if (this.state.isLoading) {
            return (<View style={[QuestionStyle.viewContainer, { backgroundColor: bgColor }]} />);
        } else if (!this.state.showCategoryComplete) {
            return (
                <View style={[QuestionStyle.viewContainer, { backgroundColor: bgColor }]}>
                    <View style={QuestionStyle.headerContainer}>
                        <Text style={[styles.subtitleTextWhite, { textAlign: 'center', marginBottom: 6 }]}>
                            {'Lesson Complete'}
                        </Text>
                        <Text style={[styles.smallText, { textAlign: 'center', color: textColor, width: '75%' }]}>
                            {'You have finished the ' + this.state.lesson.name + " Lesson!"}
                        </Text>
                    </View>

                    <View>
                        <Text style={[styles.titleTextWhite, { color: textColor, textAlign: 'center', marginBottom: 20 }]}>
                            {'You Learned About'}
                        </Text>
                        {this.state.objectives.map((option, index) => (<LearnedComponent key={index} text={option.name} color={textColor} />))}
                        <View style={{ marginTop: 30 }}>
                            <LevelComponent current={(this.state.lessonIndex + 1)} total={this.state.lessons.length} />
                        </View>
                    </View>

                    {(isFinalLesson)
                        ? (<View style={[LessonStyles.buttonContainer, QuestionStyle.submitBtn]}>
                            <FilledButton label={'Start Next Level'.getString()} onPress={() => this._nextLesson()} largeText={true} />
                            <View style={{ paddingTop: 20 }}>
                                <FilledButton style={{ paddingTop: 20 }} label={'Return to Lesson Categories'.getString()} onPress={() => this.props.navigation.pop()} />
                            </View>
                        </View>)
                        : (<View style={[LessonStyles.buttonContainer, QuestionStyle.submitBtn]}>
                            <FilledButton label={'Continue'.getString()} onPress={() => this._categoryFinished()} largeText={true} />
                        </View>)}

                    <View style={QuestionStyle.exitBtn} >
                        <ExitButton onPress={() => this.props.navigation.pop()} />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[QuestionStyle.viewContainer, { backgroundColor: bgColor }]}>

                    <View style={{ position: 'absolute', top: -10, left: 0, right: 0, bottom: -10, height: '150%' }}>
                        <Confetti ref={(node) => this._confettiView = node}
                            duration={4500}
                            size={1.3} bsize={0} timeout={0} untilStopped={false}
                            colors={["#34469A", "#F16622", "#E73F95", "#35459A", "#64BC66", "#EBE513"]} />
                    </View>

                    <View style={QuestionStyle.headerContainer}>
                        <Text style={[styles.subtitleTextWhite, { textAlign: 'center', marginBottom: 6 }]}>
                            {'Category Complete '}
                        </Text>
                        <Text style={[styles.smallText, { textAlign: 'center', color: textColor, width: '75%' }]}>
                            {'You have finished the ' + this.state.category.name + " Category!"}
                        </Text>
                    </View>

                    <View>
                        <Text style={[styles.titleTextWhite, { color: textColor, textAlign: 'center', marginBottom: 20 }]}>
                            {'You Learned About'}
                        </Text>
                        {this.state.objectives.map((option, index) => (<LearnedComponent key={index} text={option.name} color={textColor} />))}
                    </View>

                    <View style={[LessonStyles.buttonContainer, QuestionStyle.submitBtn]}>
                        <Image source={require('../../res/_server_files/mountains.png')} style={QuestionStyle.imageBtn} />
                        <FilledButton label={'Return to Lesson Categories'.getString()} onPress={() => this.props.navigation.pop()} largeText={true} />
                    </View>
                    <View style={QuestionStyle.exitBtn} >
                        <ExitButton onPress={() => this.props.navigation.pop()} />
                    </View>
                </View>

            );
        }
    }
}

/*TODO:
const LessonCompleteComponent = (props) => (
    <View style={[QuestionStyle.viewContainer, { backgroundColor: props.bgColor }]}>

        <View style={QuestionStyle.headerContainer}>
            <Text style={[styles.subtitleTextWhite, { textAlign: 'center', marginBottom: 6 }]}>
                {('Lesson Complete').getString()}
            </Text>
            <Text style={[styles.smallText, { textAlign: 'center', color: textColor, width: '75%' }]}>
                {'You have finished the ' + this.state.lesson.name + " Lesson!"}
            </Text>
        </View>

        <View>
            <Text style={[styles.titleTextWhite, { color: textColor, textAlign: 'center', marginBottom: 20 }]}>
                {'You Learned About'}
            </Text>
            {this.state.objectives.map((option, index) => (<LearnedComponent key={index} text={option.name} color={textColor} />))}
            <View style={{ marginTop: 30 }}>
                <LevelComponent current={(this.state.lessonIndex + 1)} total={this.state.lessons.length} />
            </View>
        </View>

        {(isFinalLesson)
            ? (<View style={[LessonStyles.buttonContainer, QuestionStyle.submitBtn]}>
                <FilledButton label={'Start Next Level'.getString()} onPress={() => this._nextLesson()} largeText={true} />
                <View style={{ paddingTop: 20 }}>
                    <FilledButton style={{ paddingTop: 20 }} label={'Return to lesson Navigation'.getString()} onPress={() => this.props.navigation.pop()} />
                </View>
            </View>)
            : (<View style={[LessonStyles.buttonContainer, QuestionStyle.submitBtn]}>
                <FilledButton label={'Continue'.getString()} onPress={() => this._categoryFinished()} largeText={true} />
            </View>)}

        <View style={QuestionStyle.exitBtn} >
            <ExitButton onPress={() => this.props.navigation.pop()} />
        </View>
    </View>
)

const CategoryCompleteComponent = () => (
    <View>
    </View>
)*/

// Checkmark with labelled achievement 
const LearnedComponent = props => (
    <View style={[{ flexDirection: 'row', alignContent: 'center', width: '70%' }]}>
        <Image style={[styles.normalIcon, { tintColor: props.color }]} resizeMode={'contain'} source={require('../../res/icons/check.png')} />
        <Text style={[styles.normalText, { color: props.color, paddingLeft: 8 }]}>{props.text}</Text>
    </View>
)

const LevelComponent = props => (
    <View>
        <Text style={[styles.titleTextWhite, { color: 'white', textAlign: 'center' }]}>
            {'Levels Complete'}
        </Text>
        <Text style={[styles.subtitleText2, { color: 'white', textAlign: 'center', marginBottom: 6 }]}>
            {props.current + '/' + props.total}
        </Text>
    </View>
)
