import React from 'react';

import {
    View,
    Image,
    Animated
} from 'react-native';
import ToggleButton from '../../components/ToggleButton';
import LessonStyles from './LessonStyles';

export default class QuestionMultichoiceView extends React.PureComponent {
    /**
     * Create selectors from question answers. The ToggleButton ensures only one answer can be selected at any time.
     * onChange toggles the 
     * 
     * @returns Button group view
     */
    _renderButtons() {
        JSON.stringify(this.props.answers);
        return (
            <ToggleButton
                options={this.props.answers}
                onChange={(option) => {
                    this.props.onChange(option != -1)
                }} />
        );
    }

    /**
     * Return the content view for a multiple choice question
     *
     * @returns Button selector group and 'check answer' button
     */
    render() {
        return (
            <View style={LessonStyles.contentContainer}>
                <Animated.View style={[LessonStyles.answerContainer, { opacity: this.props.opacity }]}>
                    {this._renderButtons()}
                </Animated.View>
            </View>
        )
    }
}
