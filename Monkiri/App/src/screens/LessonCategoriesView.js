
import React from 'react';

import {
    View,
    Dimensions,
    StyleSheet,
    StatusBar,
    Text,
    Image
} from 'react-native';

import { TabView, TabBar } from 'react-native-tab-view';
import LessonCategoryListComponent from '../components/LessonCategoryListComponent';
import CategoryListComponent from '../components/CategoryListComponent';
import ProfileRowComponent from '../components/ProfileRowComponent';
import EmptyListComponent from '../components/EmptyListComponent';
import SimpleProgressComponent from '../components/SimpleProgressComponent';
import Colors from '../values/Colors';
import LessonSeeModal from '../modals/LessonSeeModal';
import styles from '../components/ComponentStyles';


import { getLessonCategories } from '../services/Services';

import { getFavoriteCategories, setFavoriteCategory, updateFavoriteCategory, unsetFavoriteCategory } from '../services/UserServices';

export default class LessonCategoriesView extends React.PureComponent {

        state = {
            index: 0,
            routes: [
                { key: 'lessons', title: 'My Lessons' },
                { key: 'browse', title: 'Browse' },
            ],
            navigation: this.props.navigation,
            
            userData: this.props.screenProps.userData,       
            lessonData: {
                completed: 0,
                inProgress: 0,
            },
            selected: null,
    
            refresh: false,
            favoriteCategories: []
        };    
     
    
    _modalRef = null;


    componentDidMount() {  
        this.getFavoriteCategories();  
    }
    
    render() {
        return (
            <View style={{ flex: 1, width: '100%' }}>
                <ProfileRowComponent user={this.state.userData} lessonData={this.state.lessonData} />
                <TabView
                    style={{ backgroundColor: Colors.backgroundGray }}
                    onIndexChange={(index) => { this.setState({ index }) }}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props =>
                        <TabBar
                            labelStyle={styles.tabBarLabel}
                            activeColor={Colors.primary}
                            inactiveColor={Colors.inactive}
                            inactiveOpacity={0.5}
                            indicatorStyle={styles.tabIndicator}
                            style={{ backgroundColor: 'white' }}
                            {...props} />
                    }
                />
                <LessonSeeModal
                    ref={o => this._modalRef = o}
                    onPress={this._showLessonCategory}
                    onSave={this._saveLessonCategory.bind(this)}
                    onRemove={this._removeLessonCategory.bind(this)} />
            </View>
        )
    }

    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'lessons':
                return <MyLessonsView categories={this.state.favoriteCategories} lessonPressed={this._showModalDel} userID={this.state.userData.id} setUserProgress={this._setUserProgress} updateData={this.state.refresh} />
            case 'browse':
                return <BrowseView lessonPressed={this._showModal} />
        }
        return null;
    }

    _showModal = (category) => {
        this._modalRef.show({ lesson: category, hasLesson: false }); //todo get extra lesson data from server
        this.setState({ selected: category });
    }

    _showModalDel = (category) => {
        this._modalRef.show({ lesson: category, hasLesson: true }); // always true if the lesson is in 'My Lessons'
        this.setState({ selected: category });
    }

    _showLessonCategory = () => {
        let progress = this._getLessonProgress(this.state.selected.id);
        this.state.navigation.navigate('LessonList', {
            category: this.state.selected,
            progress: progress,
            updateData:  this.getFavoriteCategories,//todo update lesson progress on return
        })
        this._modalRef.close();
     //   this._saveLessonCategory();
    }
    
    _getLessonProgress(categoryID){
        var found = this.state.favoriteCategories.find(function(category) {
            return category.id === categoryID;
        });

        if(found){
            return found.progress;
        }else{
            return 0;
        }
    }

    // Count the number of lessons that are completed or in progress
    // then display the number lessons that are completed and in progress
    setProgressData() {
        let completed = 0;
        let inProgress = 0;

        for (var i = 0; i < this.state.favoriteCategories.length; i++) {
            if (this.state.favoriteCategories[i].progress < this.state.favoriteCategories[i].lessonCount) {
                inProgress++;
            } else {
                completed++;
            }
        }
        this.setState({
            lessonData: {
                completed: completed,
                inProgress: inProgress,
            }
        })
    }

    /**
     * Server Calls 
     */

    //add category to users favorites
    //if category is available favorited, set order to top
    _saveLessonCategory = () => {
        setFavoriteCategory(this.state.userData.id, this.state.selected.id).then(data => {
            this.getFavoriteCategories();
        })
        this._modalRef.close();
    }

    //remove category from users favorites
    _removeLessonCategory = () => {
        unsetFavoriteCategory(this.state.userData.id, this.state.selected.id).then(data => {
            this.getFavoriteCategories();
        })
        this._modalRef.close();
    }

    getFavoriteCategories = () => {
        let userID = this.state.userData.id;
        getFavoriteCategories(userID).then(data => {
            this.setState({ favoriteCategories: data, ready: true }, () => {
                this.setProgressData();
            });
        });
    }
/*
    _updateFavoriteCategory = () => {        
        let userID = this.state.userData.id;
        let catID  = this.state.selected.id;
        updateFavoriteCategory(userID, catID, 0);
    }
*/
}

class MyLessonsView extends React.PureComponent {

    state = {
        categories: null,
        userID: this.props.userID,
        ready: false,
    };


    componentWillReceiveProps(props) {
        this.setState({
            categories: props.categories,
            ready: true,
        })
    }

    // Load saved lessons
    // Show placeholder if list is empty
    render() {
        if (!this.state.ready && ( !this.state.categories || !this.state.categories.length)) {
            return (
                <SimpleProgressComponent />
            )
        } else {
            if (this.state.categories.length > 0) {
                return (
                    <LessonCategoryListComponent
                        lessonPressed={this.props.lessonPressed}
                        data={this.state.categories}
                        style={{ flex: 1 }} />
                )
            } else if (this.state.categories.length === 0) {
                return (
                    <EmptyListComponent />
                )
            }
        }
    }
}

class BrowseView extends React.PureComponent {

    state = {
        lessons: null,
    };

    componentDidMount() {
        getLessonCategories().then(data => {
            this.setState({ lessons: data });
        }).catch(reason => {
        });
    }

    render() {
        return (
            <CategoryListComponent
                lessonPressed={this.props.lessonPressed}
                data={this.state.lessons}
                style={{ flex: 1 }} />
        )
    }

}

