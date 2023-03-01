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
import ServiceProviderListComponent from '../components/ServiceProviderListComponent';

export default class PromotionsView extends React.PureComponent {

    state = {
        services: "",
        index: 0,
        routes: [
            { key: 'services', title: 'All Services'},
            { key: 'favourites', title: 'Favourites' },
        ],
    };

    componentDidMount() {
        this.setState({
            services: this.props.navigation.getParam('services', null)
        })

        console.log(this.state.services);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                <BaseHeaderComponent label={this.state.services.name} showBack={true} goBack={()=>this.props.navigation.pop()}/>
                <TabView
                    onIndexChange={(index) => {this.setState({index})}}
                    navigationState={this.state}
                    renderScene={SceneMap({
                        services: ServicesView,
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
            </View>
        )
    }

}

class ServicesView extends React.PureComponent {

    state = {
        services: ["pi"],
    };
    
    componentDidMount() {
        /*getLessonCategories().then(data => {
            this.setState({services: data});
        });*/
    }

    render() {
        return (
            <ServiceProviderListComponent
                servicePressed={this._showServices}
                data={this.state.services}
                style={{flex: 1}}/>
        )
    }

    _showServices = (services) => {
       /* this.props.route.navigation.navigate('ServicesView', {
           // services: services,
        })*/        
        //this._modalRef.show({lesson: category});
    }

}

class FavouritesView extends React.PureComponent {

    render() {
        return (
            <ServiceProviderListComponent
                servicePressed={this._showServices}
                style={{flex: 1}}/>
        )
    }
}