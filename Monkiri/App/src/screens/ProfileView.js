import React from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';
import ProfileColumnComponent from '../components/ProfileColumnComponent';
import Colors from '../values/Colors';
import Dimens from '../values/Dimens';
import Fonts from '../values/Fonts';
import styles from '../components/ComponentStyles';
import FilledButton from '../components/FIlledButton';
import OutlineButton from '../components/OutlineButton';

import FeedbackModal from '../modals/FeedbackModal';

import { sendFeedback } from '../services/UserServices';

export default class ProfileView extends React.PureComponent {

    constructor(props){
        super(props);
        
        this._sendFeedback = this._sendFeedback.bind(this);
    }

    state = {
        headerHeight: 0,
        trophies: null,
        unlockables: null,
        userData: this.props.screenProps.userData,
        screenProps: this.props.screenProps,
        feedback: {
            text: "",
            private: false,
        }
    }
    _modalRef = null;


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, height: 1000 }}>
                        <ProfileColumnComponent user={this.state.userData} />
                        <View
                            style={[styles.statCompletionRow, { height: Dimens.defaultItemSize }]}>
                            <CounterComponent
                                label={'Trophies'}
                                count={'0'} />
                            <CounterComponent
                                label={'Unlockables'}
                                count={'0'} />
                            <CounterComponent
                                label={'Progress'}
                                count={'0%'} />
                        </View>
                        <View>
                            <View style={[styles.buttonContainer, ProfileHeaderStyles.contentContainer]}>
                                <FilledButton label={'FEEDBACK'.getString()} onPress={this._showModal}/>
                            </View>
                            <View style={[styles.buttonContainer, ProfileHeaderStyles.contentContainer]}>
                                <OutlineButton label={'Log Out'.getString()} onPress={this._logout.bind(this)}/>
                            </View>                            
                        </View>
                    </View>
                </ScrollView>
                <FeedbackModal
                    ref={o => this._modalRef = o}
                    onPress={this._sendFeedback}/>
            </View>
        )
    }

    _sendFeedback(data) {
        console.log("clssose");
        console.table(this.props)

        let message = data.text;
        let email = '';
        if(data.private){
            email = "private@email.co"
        }else{
            email = this.state.userData.email
        }
        sendFeedback(email, message).then(data => {
            console.table(data)
        }).catch(reason => {
            console.log(reason)            
        });;

        this._modalRef.close();
    }


    _showModal = (category) => {
        this._modalRef.show({category: category, email: this.state.userData.email});  
    }   
    

    _logout(){
        this.state.screenProps.logOut();
    }

}

const CounterComponent = props => (
    <View style={styles.statContainer}>
        <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.statLabelText, { textAlign: 'center' }]}>{props.label}</Text>
            <Text style={[styles.statCountText, { textAlign: 'center', marginLeft: 0, marginTop: 4 }]}>{props.count}</Text>
        </View>
    </View>
)


const ProfileHeaderStyles = StyleSheet.create({
    contentContainer: {
        width: '80%',
        marginTop: Dimens.contentMargin,
        marginBottom: 10,
    },
});
/*unused for now (trophies + unlockables)

    //incomplete
    _showTrophies = (trophies) => {
        console.log("open trophies screen");
    }
    _showUnlockables = (unlockables) => {
        console.log("open unlockables screen");
    }
                            <View
                                style={[styles.statCompletionRow, { flexDirection: 'column', backgroundColor: 'white' }]}>
                                <AllTrophiesView trophiesPressed={this._showTrophies} />
                                <AllUnlockablesView unlockablesPressed={this._showUnlockables} />
                            </View>

    _renderItem = ({ item }) => {
        return <ProfileItemView item={item} />
    }
class AllTrophiesView extends React.PureComponent {

    state = {
        trophies: null,
    };

    componentDidMount() {
        getChallenges().then(data => {//todo: create getTrophies
            this.setState({ trophies: data });
        }).catch(reason => {

        });
    }

    render() {
        return (
            <ItemGridComponent
                trophiesPressed={this.props.trophiesPressed}
                data={this.state.trophies}
                label={'Trophies (13/20)'}
                buttonLabel={'See more'.getString()} />
        )
    }
}

class AllUnlockablesView extends React.PureComponent {

    state = {
        unlockables: null,
    };

    componentDidMount() {
        getChallenges().then(data => {//todo: create getUnlockables
            this.setState({ unlockables: data });
        }).catch(reason => {

        });
    }

    render() {
        return (
            <ItemGridComponent
                unlockablesPressed={this.props.unlockablesPressed}
                data={this.state.unlockables}
                label={'Unlockables (3/100)'}
                buttonLabel={'See more'.getString()} />
        )
    }
}
*/