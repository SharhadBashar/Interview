import React from 'react';

import {
    View,
    Image,
    Animated,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import LessonStyles from './LessonStyles';
import VideoViewModal from '../../modals/VideoViewModal';
const VideoStyle = StyleSheet.create({
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    image: {
        width: '90%',
        height: undefined,
        aspectRatio:1,
    }
})

/**
 * Video question view, shows video when clicking play button 
 *
 * @export View 
 * @class QuestionVideoView
 * @extends {React.PureComponent}
 */
export default class QuestionVideoView extends React.PureComponent {
    constructor(props) {
        super(props);

        
    }
    _showVideo = (video) => {
        this._modalRef.show({ extra: this.props.data.id });//!video unset
    }

    render() {
        return (
            <View style={LessonStyles.contentContainer}>
                <Animated.View style={[LessonStyles.answerContainer, { opacity: this.props.opacity }]}>
                    <View>
                        <TouchableOpacity
                            onPress={this._showVideo}
                            style={VideoStyle.touchable}>
                            <Image source={require('../../res/assets/temp/play.png')} resizeMode='contain' 
                            style={[VideoStyle.image, {tintColor:this.props.color}]} />
                        </TouchableOpacity>
                        <VideoViewModal
                            ref={o => this._modalRef = o}
                            onVideoEnd={() => this.props.onComplete()}   />
                    </View>
                </Animated.View>
            </View>
        )
    }
}
