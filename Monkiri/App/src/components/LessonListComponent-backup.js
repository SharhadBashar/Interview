import React from 'react';

import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import Styles from '../components/ComponentStyles';
import Colors from '../values/Colors';
import { getLesson } from '../services/Services';
import BaseHeaderComponent from '../components/BaseHeaderComponent';
import LessonStartModal from '../modals/LessonStartModal';

export default class LessonListComponent extends React.PureComponent {

    state = {
        category: "",
    }

    componentDidMount() {
        this.state.category = this.props.navigation.getParam('category', null);
        this._getLesson();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.state.category.color }}>
                <Text style={[Styles.titleTextWhite, {margin: 20, textAlign:'center'}]}>{this.state.category.name}</Text>
                <FlatList {...this.props}
                    data={this.state.lessons}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={item => `${item.id}`} />
                    
                <LessonStartModal
                    ref={o => this._modalRef = o}
                    onPress={this._showLesson}/>
            </View>
        );
    }

    _renderItem = ({ item }) => {
        return <LessonRowComponent item={item} onPress={this._showModal} />
    }

    _getLesson() {
        getLesson(this.state.category.id).then(lessons => {
            this.setState({ lessons: lessons });
        });
    }
    
    _showModal = (lesson) => {
        this._modalRef.show({lesson: lesson});
        this.setState({selected:lesson});   
    }

    _showLesson = () => {        
        this.props.navigation.navigate('LessonView', { lesson: this.state.selected, category: this.state.category })
        this._modalRef.close();
    }

}

const LessonRowStyles = StyleSheet.create({
    itemWrapper: {
        width: '100%',
        flexDirection: 'row',
        padding: 8,
    },
    itemContainer: {
        borderRadius: 8,
        flex: 1,
        height: 80,
        alignItems: 'center',
        justifyContent:'center',
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,.25)'
    },
    nameText: {
        fontSize: 22,
        marginLeft: 16,
    },
    icon: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255,255,255,.25)',
        borderRadius: 25,
    }
})

class LessonRowComponent extends React.PureComponent {

    render() {
        const item = this.props.item;
        return (
            <TouchableOpacity style={LessonRowStyles.itemWrapper} onPress={() => { this.props.onPress(item) }} >
                <View style={[LessonRowStyles.itemContainer]}>
                    <Text style={[Styles.titleTextWhite]}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}