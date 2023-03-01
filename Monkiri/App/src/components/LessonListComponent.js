import React from 'react';
import { BASE_URL } from 'react-native-dotenv'

import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    Path,
    Svg,
    Circle
} from 'react-native-svg';
import Styles from '../components/ComponentStyles';
import Colors from '../values/Colors';
import Sizes from '../values/Sizes';
import { getLesson } from '../services/Services';
import BaseHeaderComponent from '../components/BaseHeaderComponent';
import LessonStartModal from '../modals/LessonStartModal';
import AutoHeightImage from 'react-native-auto-height-image';

const xWidth = Dimensions.get('window').width;
const yHeight = Dimensions.get('window').height;

//const images = [require('../res/assets/temp/play_reg.png'), require('../res/icons/ic_badge_money.png'),require('../res/icons/ic_coins.png')];       
//[3] was [82, 60]
const cCoord = [[20, 100], [64, 97], [28, 70], [82, 60], [54, 68], [24, 60], [70, 32], [38, 20], [51, 0], [51, 100], [51, 50], [75, 42], [88, 76], [36, 30], [62, 20], [25,100], [26, 50]];
export default class LessonListComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            lessons: [],
            ready: false, //load lesson icons
            progress: 0, //todo get user data
            updateData: null,
        }
        this._showModal = this._showModal.bind(this);
        this._showLesson = this._showLesson.bind(this);
    }
    lesson_coordinates = [];
    coordinates = [];

    componentDidMount() {
        this.state.category = this.props.navigation.getParam('category', null);
        this.state.progress = this.props.navigation.getParam('progress', null) + 1;
        this.state.updateData = this.props.navigation.getParam('updateData', null);
        this._getLesson();
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#aed8e2' }}>
            <LessonStartModal
                ref={o => this._modalRef = o}
                onPress={this._showLesson} />
                <BaseHeaderComponent label={this.state.category.name} showBack={true} goBack={() =>this.props.navigation.pop()} />

                <AutoHeightImage width={xWidth} style={LessonRowStyles.backgroundImage} source={require('../res/assets/temp/lesson_bg.png')} />
                {this.coordinates.length ? 
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Svg
                        height="100%"
                        width="100%" viewBox="0 2.8 100 100" >


                        <Path
                            d={this._getSVGPath(this.coordinates.length)}
                            fill="none"
                            stroke={Colors.inactive}
                            strokeDasharray="4,2"
                        />
                        <Path
                            d={this._getSVGPath(this.state.progress)}
                            fill="none"
                            stroke={Colors.active}
                            strokeDasharray="4,2"
                        />

                        {this._getLessonPlaceholders()}
                    </Svg>

                    {this._createLessonStructure()}
                </View> : <View/>}
            </View>
        );
    }

    _getLessonPlaceholders() {
        var placeholders = [];
        let cc = this.coordinates;
        for (let i = 0; (i < this.state.lessons.length); i++) {
            placeholders.push(
                <Circle cx={cc[i][0]} cy={cc[i][1]} r={6} key={i} fill={Colors.inactive}
                    onLayout={({ nativeEvent }) => {
                        if (nativeEvent.layout.x != 0) { //reload 
                            this.lesson_coordinates[i] = [nativeEvent.layout.x, nativeEvent.layout.y];
                            this.state.ready = true;
                            this.forceUpdate();
                        }
                    }} />
            );
        }
        return placeholders;
    }

    _createLessonStructure() {

        if (this.state.ready && this.state.lessons.length) {
            const cRad = xWidth * 0.12;
            var lessons = [];
            for (let i = 0; i < this.state.lessons.length; i++) {
                console.table(this.state.lessons[i]);                
                console.table(this.lesson_coordinates);
                if (this.lesson_coordinates[i] !== undefined) {
                    lessons.push(
                        <View style={{ position: 'absolute', left: this.lesson_coordinates[i][0] - (cRad / 2), top: this.lesson_coordinates[i][1] }} key={i}>

                            <LessonButtonComponent item={this.state.lessons[i]} onPress={this._showModal} active={this.state.progress > i} />
                        </View>
                    );
                } else {
                    return <View />
                }
            }
            return lessons;
        } else {
            return <View />
        }
    }


    //paths start from top of the montain
    _getSVGPath(length) {
        let cc = this.coordinates;

        if (cc.length == 0) {
            return `M ${this._getCordStr(cCoord[9])}`
        } else {
            let path = `M ${this._getCordStr(cc[0])} `; //Start of path
            for (var i = 1; i < length; i++) {
                path += this._getSmoothBesier(cc[i - 1], cc[i]) //generate bezier curves
            }
            return path;
        }
    }

    _getCoordinates(count) {
        switch (count) {
            case 1:
                return [cCoord[9], cCoord[8]];
            case 2:
                return [cCoord[0], cCoord[3], cCoord[8]];
            case 3:
                return [cCoord[0], cCoord[3], cCoord[7], cCoord[8]];
            case 4:
                return [cCoord[1], cCoord[2], cCoord[11], cCoord[7], cCoord[8]];
            case 5:
                return [cCoord[0], cCoord[12], cCoord[5], cCoord[11], cCoord[7], cCoord[8]];
            case 6:
                return [cCoord[15], cCoord[12], cCoord[5], cCoord[11], cCoord[13], cCoord[14], cCoord[8]];
            case 7:
                return [cCoord[0], cCoord[1], cCoord[12], cCoord[4], cCoord[16], cCoord[6], cCoord[7], cCoord[8]];
            default:
                return [cCoord[9]];
        }
    }


    //Get bezier path between two points
    //Curve strength is based on distance between points
    //Curve direction is based on x coordinates of the points
    _getSmoothBesier(startCord, endCord) {

        if (startCord[0] == endCord[0]) {
            return `${startCord[0]} ${startCord[1]} ${endCord[0]} ${endCord[1]} ${this._getCordStr(endCord)}`;
        } else {
            let distance = Math.sqrt(Math.pow(startCord[0] - endCord[0], 2) + Math.pow(startCord[1] - endCord[1], 2));// points determine strength

            let xDiff = Math.abs(startCord[0] - endCord[0]);
            let yDiff = Math.abs(startCord[1] - endCord[1]);
            
          //  console.log("x:"+xDiff+', y:'+yDiff+' dist:'+distance)

            let strenght = distance / 4;

            
            let curveDir = (startCord[0] < endCord[0]) ? strenght : -strenght;
            
            return ` C${startCord[0] + curveDir} ${startCord[1]} ${endCord[0]} ${endCord[1] + (yDiff/3)} ${this._getCordStr(endCord)}`;
        }
    }
    //get the string version of a coordinate for paths 
    _getCordStr(c) {
        return ` ${c[0]} ${c[1]} `
    }

    _getLesson() {
        getLesson(this.state.category.id).then(lessons => {
            this.coordinates = this._getCoordinates(lessons.length);
            this.setState({ lessons: lessons });
        });
    }

    _showModal = (lesson) => {
        this._modalRef.show({ lesson: lesson, progress: this.state.progress, total: this.state.lessons.length });
        this.setState({ selected: lesson });
    }

    _showLesson = () => {
        this.props.navigation.navigate('LessonView', { lesson: this.state.selected, category: this.state.category,
            updateData:  this.state.updateData })
        this._modalRef.close();
    }

}
/* structured 3 path

"M 
                    51 0  C55 12 50 5 
                    38 20 C45 20 58 20 
                    60 73 C50 75 35 75  
                    20 100"

                    
"M 51 0  C55 12 50 5 38 20 C45 20 58 20 60 73 C50 75 35 75  20 100"
"M 51 0  C55 12 50 5 38 20 C45 20 58 20 82 60 C74 70 69 71   20 100"

debug bezier path 
    p1 = [82, 60];//[20,100];
    p2 = [38,20];//[82, 60];
    c = [62, 60, 38, 40];//+201 0 0 +202
                    <Circle cx={this.p1[0]} cy={this.p1[1]} r={7} fill={'yellow'} />

                    <Circle cx={this.c[0]} cy={this.c[1]} r={2} fill={'red'} />
                    <Circle cx={this.c[2]} cy={this.c[3]} r={2} fill={'pink'} />

                    <Circle cx={this.p2[0]} cy={this.p2[1]} r={7} fill={'white'} />
                    
                    */

const LessonRowStyles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        height: '100%',
        top: Sizes.headerHeight
    },
    nameText: {
        fontSize: 13,
        textAlign: 'center',
        paddingBottom: 0,
    },
    icon: {
        width: 32,
        height: 32,
        alignSelf: 'center',
        resizeMode: 'contain',
    }
})

class LessonButtonComponent extends React.PureComponent {

    render() {
        console.table(this.props.item)
        const item = this.props.item;
        const isActive = this.props.active;
        let image_uri = `${BASE_URL}/img/${item.image_link}`;
        return (
            <TouchableOpacity style={{
                alignItems: 'center',
                width: xWidth * 0.24,
            }} onPress={() => { this.props.onPress(item) }}>
                <View style={{
                    elevation: 4,
                    //ios shadow
                    shadowOpacity: 0.15,
                    shadowRadius: 5,
                    shadowOffset: {
                        height: 2,
                        width: 0
                    },
                    borderColor: 'rgba(0,0,0,0.2)',
                    width: xWidth * 0.12,
                    height: xWidth * 0.12,
                    backgroundColor: isActive ? Colors.primary : Colors.inactive,
                    borderRadius: 50,
                    justifyContent: 'center'
                }}>
                    <Image style={[LessonRowStyles.icon, !isActive ? { tintColor: '#00000044' } : {}]} source={{ uri: image_uri }} />
                </View>
                <Text style={[Styles.titleTextWhite, LessonRowStyles.nameText]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
}