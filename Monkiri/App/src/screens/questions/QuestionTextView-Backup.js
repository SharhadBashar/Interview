import React from 'react';

import {
    View,
    Image,
    Animated,
    Text
} from 'react-native';
import ToggleButton from '../../components/ToggleButton';
import LessonStyles from './LessonStyles';

//!Demo class 
export default class QuestionTextView extends React.PureComponent {


    _getImage(id) {//!temp
        switch (id) {
            case "1.1":
                return require('../../res/temp/1.1.png')
            case "1.3":
                return require('../../res/temp/1.3.png')
            case "1.5":
                return require('../../res/temp/1.5.png')
            case "1.6":
                return require('../../res/temp/1.6.png')
            case "1.7":
                return require('../../res/temp/1.7.png')
            case "2.1":
                return require('../../res/temp/2.1.png')
            case "2.2":
                return require('../../res/temp/2.2.png')
            case "2.4":
                return require('../../res/temp/2.4.png')
            case "2.5":
                return require('../../res/temp/2.5.png')
            case "2.7":
                return require('../../res/temp/2.7.png')
            case "2.8":
                return require('../../res/temp/2.8.png')
            case "2.9":
                return require('../../res/temp/2.9.png')
            case "3.1":
                return require('../../res/temp/3.1.png')
            case "3.2":
                return require('../../res/temp/3.2.png')
            case "3.3":
                return require('../../res/temp/3.3.png')
            case "3.4":
                return require('../../res/temp/3.4.png')
            case "3.7":
                return require('../../res/temp/3.7.png')
            case "3.8":
                return require('../../res/temp/3.8.png')
            case "3.9":
                return require('../../res/temp/3.9.png')
            case "3.10":
                return require('../../res/temp/3.10.png')
            case "3.11":
                return require('../../res/temp/3.11.png')
        }
    }

    _renderData() {
        JSON.stringify(this.props.answers);
        let src = '../../res/temp/' + this.props.answers + '.png';
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 20
            }}>
                <Image source={this._getImage(this.props.answers)} resizeMode="stretch" />
            </View>
        );
    }

    render() {
        return (
            <View style={LessonStyles.contentContainer}>
                <Animated.View style={[LessonStyles.answerContainer, { opacity: this.props.opacity }]}>
                    {this._renderData()}
                </Animated.View>
            </View>
        )
    }
}
