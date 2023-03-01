import React from 'react';

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

// Number of columns in the grid
const numColumns = 2;

// Utility function to add the proper amount of data
// to ensure a perfect grid (no stretching in the last row)
const gridifyData = (data) => {
    while(data.length % numColumns != 0) {
        data.push({trackId: `track-${data.length}`, empty: true});
    }
    return data;
}

// Ratio between width and height of cell
const gridRatio = 0.8;

export default class ServiceProviderListComponent extends React.PureComponent {

    render() {
        const props = this.props;
        return (
            <FlatList {...props}
                data={props.data && gridifyData(props.data)}
                style={{backgroundColor: Colors.backgroundGray}}
                renderItem={this._renderItem}
                numColumns={numColumns}
                keyExtractor={item => `${item.id}` }/>
        )
    }

    _renderItem = ({item}) => {
        if(item.empty) {
            return <View style={{flex: 1, padding: 8}} />
        }
        return <ProviderCellComponent item={item} onPress={() => {}}/>
    }
//?!
    _servicePressed = (lesson) => {
        console.log("service pressed");
       // this.props.navigation.navigate('LessonView', { lesson: lesson, category: this.state.category })
    }
}

const ProviderCellStyles = StyleSheet.create({
    itemWrapper: {
        padding: 8,
        flex: 1,
        height: Dimensions.get('window').width / numColumns * gridRatio,
    },
    itemContainer: {
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        padding: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        //ios
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0
        },
        //android 
        elevation: 2,
    },
    nameText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    logo: {
        width: 75,
        height: 75,
        resizeMode:'contain'
    }
})

class ProviderCellComponent extends React.PureComponent {

    render() {
        const item = this.props.item;
        return (
            <View style={ProviderCellStyles.itemWrapper}>
                <TouchableOpacity onPress={() => { this.props.onPress(item) }} style={[ProviderCellStyles.itemContainer]}>
                    <Image style={ProviderCellStyles.logo} source={require('../res/assets/img_pipay.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

}