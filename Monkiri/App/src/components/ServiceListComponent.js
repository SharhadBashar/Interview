import React from 'react';

import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Colors from '../values/Colors';
import Fonts from '../values/Fonts';
import Dimens from '../values/Dimens';
import styles from './ComponentStyles';
import { BASE_URL } from 'react-native-dotenv'


export default class ServiceListComponent extends React.PureComponent {

    render() {
        return (
            <FlatList {...this.props}
                style={{backgroundColor: Colors.backgroundGray}}
                contentContainerStyle={{paddingBottom:Dimens.containerPadding}}
                renderItem={this._renderItem}
                keyExtractor={item => `${item.id}` }/>
        )
    }

    _renderItem = ({item}) => {
        return <ServiceRowComponent item={item} onPress={this.props.servicePressed}/>
    }

}

const ServiceRowStyles = StyleSheet.create({
    itemWrapper: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: Dimens.containerPadding,
        paddingLeft: Dimens.containerPadding,
        paddingRight: Dimens.containerPadding,
    },
    itemContainer: {
        borderRadius: 9,
        flex: 1,
        height: 86,
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: 'white',
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
        fontSize: Dimens.headerPrimaryText,
        marginLeft: 16,
        fontFamily: Fonts.primaryBold
    },
    
    icon: {
        width: Dimens.iconSize,
        height: Dimens.iconSize,
        resizeMode: 'contain',
    },

})

class ServiceRowComponent extends React.PureComponent {

    render() {
        const item = this.props.item;
        return (
            <View style={ServiceRowStyles.itemWrapper}>
                <TouchableOpacity style={[ServiceRowStyles.itemContainer]} onPress={() => { this.props.onPress(item) }}>
                    <Image style={[ServiceRowStyles.icon, {tintColor: item.color}]} source={{ uri:(`${BASE_URL}/img/${item.image_link}`) }}/>
                    <Text style={[ServiceRowStyles.nameText, {color: item.color}]}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
