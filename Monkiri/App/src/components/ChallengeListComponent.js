import React from 'react';
import {BASE_URL} from 'react-native-dotenv';
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

// Number of columns in the grid
const numColumns = 2;
// Utility function to add the proper amount of data
// to ensure a perfect grid (no stretching in the last row)
const gridifyData = (data) => {
    while (data.length % numColumns != 0) {
        data.push({ trackId: `track-${data.length}`, empty: true });
    }
    return data;
}

// Ratio between width and height of cell
const gridRatio = 1.2;

export default class ChallengeListComponent extends React.PureComponent {

    constructor(props){
        super(props);
        this.state ={
            challengeCount: 1
        }
        console.log(BASE_URL);
    }

    render() {
        const props = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: Colors.backgroundGray, padding: 8}}>
                <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
                    <Text style={styles.grayText}>Available Challenges: </Text>
                    <Text style={styles.headerText}>{this.state.challengeCount}</Text>
                </View>
                <FlatList {...props}
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
        return <ChallengeCellComponent item={item} onPress={this.props.challengePressed} />
    }

}

const ChallengeCellStyles = StyleSheet.create({
    itemWrapper: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingTop: 8,
        flex: 1,
        height: Dimensions.get('window').width / numColumns * gridRatio,
    },
    itemContainer: {
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        padding: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        elevation: 9,
    },
    nameText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    logo: {
        width: 50,
        height: 50
    },

    favoriteItemContainer: {
        borderRadius: 10,
        flex: 1,
        padding: 8,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection:'column',
        justifyContent: 'space-evenly',
        elevation: 4,
        borderWidth: 2,
        borderColor: Colors.favoriteYellow,
    },
    favoriteIcon: {
        position: 'absolute',
        top: -6,
        left: 16,
    },
    plusIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 24,
        height: 24,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    badgeIcon: {
        width: 24,
        height: 24,
        marginLeft: 4,
        marginRight: 4,
    }
})

//todo implement with database values 
class ChallengeCellComponent extends React.PureComponent {
    render() {
        const item = this.props.item;
        return (
            <View style={ChallengeCellStyles.itemWrapper}>
                <TouchableOpacity onPress={() => { this.props.onPress(item) }} style={[ChallengeCellStyles.favoriteItemContainer]}>
                    <Image style={ChallengeCellStyles.favoriteIcon} source={require('../res/icons/ic_bookmark.png')} />
                    <Image style={ChallengeCellStyles.plusIcon} source={require('../res/icons/ic_more.png')} />
                    <Image style={ChallengeCellStyles.logo} source={require('../res/assets/img_pipay.png')}/>
                    <Text numberOfLines={2} style={[styles.titleText, { margin: 2, textAlign: 'center' }]}>Mobile Wallet Crunch</Text>
                    <View style={ChallengeCellStyles.badgeContainer}>
                        <Image style={[ChallengeCellStyles.badgeIcon, {marginRight:5}]} source={{ uri:(`${BASE_URL}/img/ic_hourglass.png`) }} />
                        <Text style={styles.headerText}>{'5 days'}</Text>
                    </View>
                    <View style={ChallengeCellStyles.badgeContainer}>
                        <Image style={ChallengeCellStyles.badgeIcon} resizeMode={'contain'} source={require('../res/icons/ic_badge_award.png')} />
                        <Image style={ChallengeCellStyles.badgeIcon} resizeMode={'contain'} source={require('../res/icons/ic_badge_money.png')} />
                        <Image style={ChallengeCellStyles.badgeIcon} resizeMode={'contain'} source={require('../res/icons/ic_badge_unlockable.png')} />
                        <Image style={ChallengeCellStyles.badgeIcon} resizeMode={'contain'} source={require('../res/icons/ic_badge_trophy.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
