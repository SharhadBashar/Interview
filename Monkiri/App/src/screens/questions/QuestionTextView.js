import React from 'react';

import {
    View,
    Image,
    Animated,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Fonts from '../../values/Fonts';
import Sizes from '../../values/Sizes';
import Colors from '../../values/Colors';
import LessonStyles from './LessonStyles';
import OutlineButton from '../../components/OutlineButton';
import Slider from '@react-native-community/slider';
import AutoHeightImage from 'react-native-auto-height-image';
import { BASE_URL } from 'react-native-dotenv'

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
        aspectRatio: 1,
    }
})

const ButtonStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 18,
        paddingBottom: 18
    },
    equationContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    label: {
        padding: 6,
        fontSize: Sizes.textHeader2,
        fontFamily: Fonts.primaryBold,
        color: 'black',
        textAlign: 'left',
    },
    sliderLabel: {
        marginTop: 20,
        marginBottom: -10,
        fontSize: Sizes.textBody,
        textAlign: 'center'
    },
    sliderLabel2: {
        marginTop: -10,
        fontSize: Sizes.textBody,
    },

    image: {
        margin: 8,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    inputBox: {
        borderRadius: 20, // Will round fully
        borderWidth: 3,
        height: 38,
        width: 81,
        textAlign: 'center',
        fontFamily: Fonts.primary,
        fontSize: 22,
        padding: 0,
    },
    inputDefault: {
        borderColor: Colors.borderGray,
        color: Colors.borderGray,
    },
    inputHighlight: {
        borderColor: Colors.primary,
        color: Colors.primary,
    }
})

const type = {
    IMAGE: "image",
    GIF: "gif",
    TEXT: "text",
    INPUT: "input",
    VIDEO: "video",
    BUTTON: 'button',
    SLIDER: 'slider'
};

export default class QuestionTextView extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            imageWidth: (Dimensions.get('window').width * 0.78),
            gifWidth: (Dimensions.get('window').width * 0.78),
            video: "mp4_placeholder.mp4"
        }
    }
    _renderComponents() {
        return (
            <View style={ButtonStyles.container}>
                {this.props.answers.map((data, index) => (
                    this._getComponent(data, index)
                ))}
            </View>
        );
    }

    _getComponent(data, index) {
        switch (data.type) {
            case type.TEXT:
                return <TextComponent key={index} text={data.value.getString()} />
            case type.IMAGE:
                return <ImageComponent key={index} data={data} width={this.state.imageWidth} />
            case type.GIF:
                return <ImageComponent key={index} data={data} width={this.state.gifWidth} />
            case type.BUTTON:
                return <ButtonComponent key={index} text={data.value.getString()} />
            case type.SLIDER:
                return <SliderComponent key={index} text={data.value.getString()} />
            case type.VIDEO:
                this.state.video = (`${BASE_URL}/img/${data.value}`);
                return <VideoComponent key={index} data={data} width={this.state.imageWidth} color={this.props.color} onPress={this._showVideo} />
            case type.INPUT:
                return <InputComponent key={index} text={data.value.getString()} />
        }
    }

    render() {
        return (
            <View style={LessonStyles.contentContainer}>
                <Animated.View style={[LessonStyles.answerContainer, { opacity: this.props.opacity }]}>
                    {this._renderComponents()}
                </Animated.View>
                <VideoViewModal
                    ref={o => this._modalRef = o}
                    onVideoEnd={(e) => this.props.onChange(e)} />
            </View>
        )
    }

    _showVideo = () => {
        this._modalRef.show({ extra: this.state.video });
    }

}

const TextComponent = props => (
    <Text style={ButtonStyles.label}>{props.text}</Text>
)

const ImageComponent = props => (
    <AutoHeightImage width={props.width} style={ButtonStyles.image} source={{ uri: (`${BASE_URL}/img/${props.data.value}`) }} />
)
const ButtonComponent = props => (
    <OutlineButton label={props.text} />
)

const SliderComponent = props => {
    var data = props.text.split(" ");
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch', width: 200, alignSelf: 'center' }}>
            <Text style={[ButtonStyles.label, ButtonStyles.sliderLabel]}>{data[0]}</Text>
            <Slider
                minimumValue={0}
                maximumValue={1}
                thumbTintColor="#151210"
                minimumTrackTintColor="#66432F"
                maximumTrackTintColor="#66432F"
            />
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={[ButtonStyles.label, ButtonStyles.sliderLabel2]}>{data[1]}</Text>
                <Text style={[ButtonStyles.label, ButtonStyles.sliderLabel2]}>{data[2]}</Text>
            </View>
        </View>
    );
}

const VideoComponent = props => (
    <TouchableOpacity
        onPress={props.onPress}
        style={VideoStyle.touchable}>
        <AutoHeightImage width={props.width}
            style={[ButtonStyles.image, { tintColor: props.color }]} source={require('../../res/assets/temp/play.png')} />

    </TouchableOpacity>
)

const InputComponent = props => {
    var myArray = props.text.split('');
    return (
        <View style={ButtonStyles.equationContainer}>
            {myArray.map((option, index) => {
                switch (option) {
                    case 'a':
                    case 'b':
                        return (<View style={{ padding: 6 }} key={index}>
                            <TextInput
                                key={index}
                                keyboardType={'numeric'}
                                style={[ButtonStyles.inputBox, option == 'a' ? ButtonStyles.inputHighlight : ButtonStyles.inputDefault]}
                                editable={true}
                                maxLength={3} /></View>)
                    default:
                        return (<View key={index}>
                            <Text style={ButtonStyles.label}>{option}</Text>
                        </View>);

                }
            })}
        </View>
    )
}