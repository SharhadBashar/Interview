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
import ToolListComponent from '../components/ToolListComponent';
import ChallengeModal from '../modals/ChallengeModal';

export default class ToolsView extends React.PureComponent {

    state = {
        index: 0,
        routes: [
            { key: 'all', title: 'All' },
            { key: 'favourites', title: 'Favourites' },
        ],
        challenges: null,
        navigation: this.props.navigation,
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.backgroundGray,
                }}>
                <BaseHeaderComponent label={'Tools'} />
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
                    }/>
               <ChallengeModal
                    ref={o => this._modalRef = o} />
            </View>
        )
    }

    _renderScene = ({route}) => {
        switch(route.key) {
            case 'all':
                return <AllToolsView toolPressed={this._showToolView}/>
            case 'favourites':
                return <SavedToolsView challengePressed={this._showChallenge}/>
        }
        return null;
    }

    _showChallenge = (challenge) => {
        this._modalRef.show({challenge: challenge});
    }


    _showToolView = () => {
        this.state.navigation.navigate('ToolView', {
            type: 0
        })
        this._modalRef.close();
    }
}

class AllToolsView extends React.PureComponent {

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
            <ToolListComponent
                toolPressed={this.props.toolPressed}
                data={this.state.challenges}/>
        )
    }

}


class SavedToolsView extends React.PureComponent {

    render() {
        return (
            <View style={{flex: 1}}></View>
        )
    }
 
}