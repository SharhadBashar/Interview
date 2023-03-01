import React from 'react';

import {
    View,
    Dimensions,
    Modal,
    Text
} from 'react-native';

import { getChallenges } from '../services/Services';

import Colors from '../values/Colors';
import styles from '../components/ComponentStyles';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import BaseHeaderComponent from '../components/BaseHeaderComponent';
import ChallengeListComponent from '../components/ChallengeListComponent';
import ChallengeModal from '../modals/ChallengeModal';

export default class ProvidersView extends React.PureComponent {

    state = {
        index: 0,
        routes: [
            { key: 'all', title: 'All' },
            { key: 'ending', title: 'Ending' },
            { key: 'favourites', title: 'Favourites' },
        ],
        challenges: null,
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.backgroundGray,
                }}>
                <BaseHeaderComponent label={'Challenges'} />
                <View style={{justifyContent: 'center', 
                    flex: 1,
alignItems: 'center' }}>
                <Text style={[styles.normalText, {marginTop:30, textAlign:'center'}]}>To be Announced</Text>
                <Text style={[styles.grayText, {color:'black', textAlign:'center'}]}>Please come back later</Text>
                </View>
               <ChallengeModal
                    ref={o => this._modalRef = o} />
            </View>
        )
    }
    /*Temp   
                
                <TabView
                    onIndexChange={(index) => {this.setState({index})}}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => 
                        <TabBar
                        labelStyle={styles.tabBarLabel}
                        indicatorStyle={styles.tabIndicator}
                            activeColor={Colors.primary}
                            inactiveColor={Colors.inactive}
                            style={{backgroundColor: 'white'}}
                            {...props} />
                    }*/

    _renderScene = ({route}) => {
        switch(route.key) {
            case 'all':
                return <AllChallengesView challengePressed={this._showChallenge}/>
            case 'ending':
                return <EndingChallegesView challengePressed={this._showChallenge}/>
            case 'favourites':
                return <FavouritesChallengesView challengePressed={this._showChallenge}/>
        }
        return null;
    }

    _showChallenge = (challenge) => {
        this._modalRef.show({challenge: challenge});
    }

}

class AllChallengesView extends React.PureComponent {

    state = {
        challenges: null,
    };

    componentDidMount() {
        getChallenges().then(data => {
            this.setState({challenges: data});
        }).catch(reason => {
            
        });
    }

    render() {
        return (
            <ChallengeListComponent
                challengePressed={this.props.challengePressed}
                data={this.state.challenges}/>
        )
    }
 
}

class EndingChallegesView extends React.PureComponent {

    render() {
        return (
            <View
            style={{
                flex: 1,
                backgroundColor: 'orange',
            }}></View>
        )
    }
 
}


class FavouritesChallengesView extends React.PureComponent {

    render() {
        return (
            <View
            style={{
                flex: 1,
                backgroundColor: 'orange',
            }}></View>
        )
    }
 
}