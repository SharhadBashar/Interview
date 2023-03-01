import React from 'react';

import {
    View,
    Animated,
} from 'react-native';
import ToggleButton from '../../components/ToggleButton';
import LessonStyles from './LessonStyles';

export default class QuestionTrueFalseView extends React.PureComponent {
    /**
     * Create selectors from question answers. The ToggleButton ensures only one answer can be selected at any time.
     * 
     * @returns Button group view
     */
    _renderButtons() {
        var tf = [{ id: 0, value: "True" }, { id: 1, value: "False" }];
        return (
            <ToggleButton
                options={Array.from(tf)}
                onChange={(option) => {
                        this.props.onChange(option != -1)
                }} />
        );
    }

    /**
     * Return the content view for a true/false question
     *
     * @returns Button selector group and 'check answer' button
     */
    render() {
        return (
            <View style={LessonStyles.contentContainer}>
                <Animated.View style={[LessonStyles.answerContainer, {opacity: this.props.opacity}]}>
                    {this._renderButtons()}
                </Animated.View>
            </View>
        )
    }
}
