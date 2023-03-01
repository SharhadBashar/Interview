// HomeScreen

import React from 'react';

import {
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';

import { createAppContainer, createStackNavigator, createDrawerNavigator, createBottomTabNavigator, DrawerActions, } from 'react-navigation';
import LessonCategoriesView from './LessonCategoriesView';
import ProfileView from './ProfileView';
import FinancialServicesView from './FinancialServicesView';
import PromotionsView from './PromotionsView';
import ChallengesView from './ChallengesView';
import ToolsView from './ToolsView';
import Colors from '../values/Colors';
import ToolViewComponent from '../components/ToolViewComponent';
import LessonListComponent from '../components/LessonListComponent';
import LessonView from '../screens/LessonView';
import Fonts from '../values/Fonts';
import Dimens from '../values/Dimens';

/**
 * Define the Drawer navigator, which will contain the
 * various screens which make up the base of the app.
 */
const DrawerNavigator = createDrawerNavigator({
    Lesson: LessonCategoriesView,
    Promotions: PromotionsView,
}, 
{
    navigationOptions: ({navigation}) => ({
        headerMode: 'screen',
        headerStyle: {
            height: 60,
            backgroundColor: Colors.primary, // TODO - stylesheetify this
        },
        headerLeft: (
            <TouchableOpacity 
                onPress={() => { navigation.dispatch(DrawerActions.openDrawer())} }
                style={{marginLeft: 16}}>
                <Image source={require('../res/icons/menu.png')} style={{tintColor: 'white'}} />
            </TouchableOpacity>
        ),
    }),
    contentComponent: (props) => <DrawerView {...props}/>
})

/**
 * Tab navigator for the base view
 */
const TabNavigator = createBottomTabNavigator({
    Lessons:{
        screen: LessonCategoriesView,
    },
    Profile: {
        screen: ProfileView,
    },
    Services: {
        screen: FinancialServicesView,
    },
    Challenges: {
        screen: ChallengesView,
    },
    Tools: {
        screen: ToolsView,
    },
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {

            const { routeName } = navigation.state;

            let icon = null;
            if (routeName === 'Profile') {
                icon = require('../res/icons/profile.png');
            } else if (routeName === 'Lessons') {
                icon = require('../res/icons/lessons.png');
            } else if(routeName === 'Services') {
                icon = require('../res/icons/services.png');
            } else if(routeName === 'Challenges') {
                icon = require('../res/icons/challenges.png');
            }else if(routeName === 'Tools') {
                icon = require('../res/icons/dollar.png');
            }

            // You can return any component that you like here!
            return  <Image style={{tintColor: tintColor}} source={icon} />
        },
    }),
    tabBarOptions: {
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.imageGray,
        showLabel: true,
        style : {            
            height: 58,
            padding: 8
          },
          labelStyle : {
              fontSize: Dimens.bodyText,
              fontFamily: Fonts.primary
          }
    },
});


/**
 * Custom component to draw the side Drawer
 * 
 * @param {*} props 
 */
const DrawerView = (props) => {
    return (
        <ScrollView style={DrawerStyles.scrollView}>
            <SafeAreaView style={DrawerStyles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <ProfileView {...props} />
            </SafeAreaView>
        </ScrollView>
    )
}


/**
 * Define the Stack navigator which will contain the
 * Tab navigator
 * 
 * We use a StackNavigator to allow screens to cover the
 * base view (in this case, the TabNavigator)
 */
const StackNavigator = createStackNavigator({
    TabNavigator: {
        screen: TabNavigator,        
    },
    LessonList: {
        screen: LessonListComponent,
    },    
    LessonView: {
        screen: LessonView,
    },
    ServicesView: {
        screen: PromotionsView,
    },
    ToolView: {
        screen: ToolViewComponent,
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

  
export default createAppContainer(StackNavigator);

