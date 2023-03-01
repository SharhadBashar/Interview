import React from 'react';
import { BASE_URL } from 'react-native-dotenv';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Colors from '../values/Colors';
import styles from './ComponentStyles';
import Dimens from '../values/Dimens';
import Sizes from '../values/Sizes';
import LinearGradient from 'react-native-linear-gradient';

// Number of columns in the grid
const numColumns = 3;
// Utility function to add the proper amount of data
// to ensure a perfect grid (no stretching in the last row)
const gridifyData = (data) => {
    while (data.length % numColumns != 0) {
        data.push({ trackId: `track-${data.length}`, empty: true });
    }
    return data;
}

// Ratio between width and height of cell
const gridRatio = 1;

export default class CategoryListComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            challengeCount: 1
        }
    }

    render() {
        const props = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: Colors.backgroundGray }}>
                <FlatList {...props} contentContainerStyle={ChallengeCellStyles.listContainer}
                    data={props.data && gridifyData(props.data)}
                    renderItem={this._renderItem}
                    numColumns={numColumns}
                    keyExtractor={item => `${item.id}`} /></View>
        )
    }

    _renderItem = ({ item }) => {
        if (item.empty) {
            return <View style={{ flex: 1, padding: 8 }} />
        }
        return <CategoryCellComponent item={item} onPress={this.props.lessonPressed} />
    }

}

const ChallengeCellStyles = StyleSheet.create({
    listContainer:{
        paddingTop: 10,
        paddingLeft: 20, 
        paddingRight: 20,
        paddingBottom: 16, 
    },
    itemWrapper: {
        flex: 1,
        margin: 8,
    },

    logo: {
        width: Dimens.iconSize,
        height: Dimens.iconSize,
        tintColor: 'white',
        opacity: 0.9,
        resizeMode: 'contain',
    },

    itemContainer: {
        height: (Dimensions.get('window').width - 96) / numColumns * gridRatio,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow:'hidden',
    },
    
    name: {
        textAlign: "center",
        paddingTop: 6,
        fontSize: Sizes.textBodySM,
    },

    containerBorder: {
        width: Dimens.lessonButtonHeight,
        height: Dimens.lessonButtonHeight,
        borderLeftWidth: Dimens.lessonButtonHeight,
        borderBottomWidth: Dimens.lessonButtonHeight*0.9,
        borderTopWidth: Dimens.lessonButtonHeight*0.5,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: '#ffffff1f',
        position: 'absolute',
        right: 0,
    },


})

class CategoryCellComponent extends React.PureComponent {
    render() {
        const item = this.props.item;
        let { name, color, image_link } = item;
        let image_uri = `${BASE_URL}/img/${image_link}`;
        return (
            <TouchableOpacity onPress={() => { this.props.onPress(item) }} style={ChallengeCellStyles.itemWrapper}>
                <LinearGradient colors={[color+ 'b7', color]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={ChallengeCellStyles.itemContainer}>
                    <View style={ChallengeCellStyles.containerBorder}/>
                    <Image style={ChallengeCellStyles.logo} source={{ uri: (image_uri) }} />
                </LinearGradient>
                    <Text numberOfLines={2} style={[styles.categoryTitle, ChallengeCellStyles.name]}>{name}</Text>
            </TouchableOpacity>
        )
    }
}
