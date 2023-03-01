import React from 'react';
import { BASE_URL } from 'react-native-dotenv'

import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import Colors from '../values/Colors';
import Dimens from '../values/Dimens';
import styles from './ComponentStyles';
import Sizes from '../values/Sizes';
import LinearGradient from 'react-native-linear-gradient';
//todo set progress values
const LessonRowStyles = StyleSheet.create({
    itemWrapper: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: Dimens.containerPadding,
        paddingLeft: Dimens.containerPadding,
        paddingRight: Dimens.containerPadding,
    },
    itemContainer: {
        borderRadius: 8,
        flex: 1,
        height: Dimens.lessonButtonHeight,
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        overflow: 'hidden',
    },

    itemText: {
        paddingLeft: 4,
    },

    playContainer: {
        padding: 8,
        height: 42,
        width: 42,
        borderRadius: 21,
        backgroundColor: '#4C4C4C',
    },

    icon: {
        width: Dimens.iconSize,
        height: Dimens.iconSize,
        resizeMode: 'contain',
        margin: 8,
        tintColor: 'white',
    },

    containerBorder: {
        width: Dimens.lessonButtonHeight,
        height: Dimens.lessonButtonHeight,
        borderLeftWidth: Dimens.lessonButtonHeight,
        borderRightWidth: 0,
        borderBottomWidth: Dimens.lessonButtonHeight,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#ffffff1f',
        position: 'absolute',
        right: 0,
    },
    name: {
        textAlign: "center",
        padding: 2,
        marginTop: 4,

    },
    iconContainer: {
        width: Dimens.lessonButtonHeight,
        height: Dimens.lessonButtonHeight,
        flexDirection: 'column',
        position: 'absolute',
        right: 0,
    },

})

export default class LessonCategoryListComponent extends React.PureComponent {

    render() {
        return (
            <FlatList {...this.props}
                style={{ backgroundColor: Colors.backgroundColor }}
                contentContainerStyle={{ paddingBottom: Dimens.containerPadding }}
                renderItem={this._renderItem}
                keyExtractor={item => `${item.id}`} />
        )
    }

    _renderItem = ({ item }) => {
        return <LessonRowComponent item={item} onPress={this.props.lessonPressed} />
    }

}

class LessonRowComponent extends React.PureComponent {

    render() {
        const item = this.props.item;
        const { name, color, image_link, progress, lessonCount } = item;
        let fill = lessonCount !== 0 ? (progress/lessonCount) : -1; 
        let image_uri = `${BASE_URL}/img/${image_link}`;
        return (

            <TouchableOpacity onPress={() => { this.props.onPress(item) }} style={LessonRowStyles.itemWrapper}>
                <LinearGradient colors={[color + 'b7', color]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={LessonRowStyles.itemContainer}>
                    <View style={LessonRowStyles.containerBorder} />
                    <Image style={LessonRowStyles.icon} source={{ uri: (image_uri) }} />
                    <View style={{ flex: 1, marginLeft: 12, marginRight: 12, marginBottom: 8 }}>
                        <Text style={[styles.titleTextWhite, LessonRowStyles.itemText]}>
                            {name}
                        </Text>
                        {fill !== -1 ? 
                        <View style={[styles.progressWrapper, {paddingTop: 8}]}>
                            <View style={styles.progressContainer}>
                                <View style={[styles.progressFill, { flex: fill, backgroundColor: color + '88' }]} />
                            </View>
                            <Text style={styles.percentText}>
                                {Math.round(fill * 100) + '%'}
                            </Text>
                        </View>: null}
                    </View>
                    <View
                        style={LessonRowStyles.playContainer}>
                        <Image
                            style={{ flex: 1, marginLeft: 2, width: 20, height: 20 }} resizeMode={'center'} source={require('../res/assets/temp/play_reg.png')} />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

}