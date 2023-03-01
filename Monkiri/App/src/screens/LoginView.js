import React from 'react';

import {
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    ProgressBarAndroid,
    ProgressViewIOS
} from 'react-native';

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import FilledButton from '../components/FIlledButton';
import OutlineButton from '../components/OutlineButton';
import SimpleProgress from '../components/SimpleProgressComponent';
import styles from '../components/ComponentStyles';

const LoginStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 48,
    },
    button: {
        margin: 8,
        alignSelf: 'stretch',
    },
});

export default class LoginView extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: this.props.isLoading,
            welcomeText: 'Welcome to Monkiri',
            user_name: ''
        }

        this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    }

    componentDidUpdate(){
        this.setState({
            isLoading: this.props.isLoading
        })
    }
    
    componentWillReceiveProps(newProp){
        console.log("props"+this.props.isLoading)
        if(newProp.user_name){
            this.setState({
                user_name: `${newProp.user_name}`
            })
        }
    }

    render() {
        return (

            <SafeAreaView>
                <View style={LoginStyles.container}>
                    <Image style={LoginStyles.logo} source={require('../res/icons/ic_logo.png')} />
                    <Text style={[styles.titleTextWhite, { color: 'black', marginBottom: 48 }]}>{(this.state.welcomeText).getString()}</Text>

                    {this.state.isLoading ?
                        <SimpleProgress /> :
                        <View style={LoginStyles.button}>
                            <FilledButton label={'Continue with Facebook'.getString()}
                                onPress={this.handleFacebookLogin} />
                        </View>}

                    {this.state.isLoading ? null :
                        <View style={LoginStyles.button}>
                            <OutlineButton label={'Create an Account'} />
                        </View>}

                        {this.state.user_name ? 
                    <Text style={styles.normalText}>{('Logged in as ').getString()} 
                    <Text style={styles.textHightlight}>{(this.state.user_name).getString()} </Text></Text> : null}

                </View>
            </SafeAreaView>
        )
    }

    handleFacebookLogin() {
        this.props.login();
    }
}