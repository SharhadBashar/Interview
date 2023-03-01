import React from 'react';

import {
    View,
    Dimensions,
    Modal,
    Text,
    TouchableHighlight,
    Alert,
} from 'react-native';

import Colors from '../values/Colors';
import Dimens from '../values/Dimens';
import Fonts from '../values/Fonts';
import styles from '../components/ComponentStyles';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ServiceListComponent from '../components/ServiceListComponent';
import { getLessonCategories } from '../services/Services';
import BaseHeaderComponent from '../components/BaseHeaderComponent';

export default class ProvidersView extends React.PureComponent {

    state = {
        index: 0,
        routes: [
            { key: 'services', title: 'All Services', navigation: this.props.navigation },
            { key: 'discovered', title: 'Discovered' },
            { key: 'favourites', title: 'Favourites' },
        ],
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                <BaseHeaderComponent label={'Financial Services'}/>
                <AllServicesView navigation={this.props.navigation} />
            </View>
        )
    }

}

/*Old tabbed view
 <TabView
                    onIndexChange={(index) => {this.setState({index})}}
                    navigationState={this.state}
                    renderScene={SceneMap({
                        services: AllServicesView,
                        discovered: DiscoveredView,
                        favourites: FavouritesView,
                    })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => 
                        <TabBar {...props} 
                        labelStyle={styles.tabBarLabel}
                        indicatorStyle={styles.tabIndicator}
                            activeColor={Colors.primary}
                            inactiveColor={Colors.inactive}
                            style={{backgroundColor: 'white'}}
                            />
                    }
                />

*/

class AllServicesView extends React.PureComponent {

    state = {
        services: null,
    };
    
    componentDidMount() {
        getLessonCategories().then(data => {
            this.setState({services: data});
        });
    }

    render() {
        return (
            <ServiceListComponent
                servicePressed={this._showServices}
                data={this.state.services}
                style={{flex: 1}}/>
        )
    }

    _showServices = (services) => {
        this.props.navigation.navigate('ServicesView', { //props.routes if using tabbed navigation
            services: services,
        })        
    }

}

class DiscoveredView extends React.PureComponent {

    render() {
        return (
            <View />
        )
    }
}

class FavouritesView extends React.PureComponent {

    render() {
        return (
            <View />
        )
    }
}