import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomeView from './src/screens/HomeView';
import LoginView from './src/screens/LoginView';
import { loginFacebook, logoutFacebook } from './src/services/UserServices';

import { AccessToken, LoginManager } from 'react-native-fbsdk';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedin: false,
      userData: {
        name: ''
      },//

      isLoading: true,
    }
    this.logOut = this.logOut.bind(this)
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }
  componentDidMount() {
    StatusBar.setHidden(true);

    //log in automatically if user data available
    AccessToken.getCurrentAccessToken().then((data) => {
      if(data !== null){
        this.setState({isLoading: true});
        this.getLoginData(data);
      }else{
        this.setState({isLoading: false});
      }
    })
  }

  getLoginData(){
    AccessToken.getCurrentAccessToken().then((data) => {
      const { accessToken, userID } = data;

      loginFacebook(accessToken, userID).then(userdata => {
        console.log("loginFacebook")
        console.table(userdata)

        this.setState({
          userData: userdata,
          isLoggedin: true
        });
      });
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoggedin ?
          <HomeView screenProps={{
            userData: this.state.userData,
            logOut: this.logOut
          }} />
          :
          <LoginView login={this.logIn.bind(this)} data={this.getLoginData.bind(this)} isLoading={this.state.isLoading}/>}
      </View>
    );
  }

  logOut() {
    this.setState({
       isLoading: true
    });

    //remove user credentials
    AccessToken.getCurrentAccessToken().then((data) => {
      const { accessToken, userID } = data;
      
      logoutFacebook(accessToken, userID).then(resultCode => {
        if (resultCode != 200) {
          console.log("Server error while logging out. Could not delete user data");
        }
        this.setState({
          isLoggedin: false,
          isLoading: false,
          userData: { name: '' }
        });
        LoginManager.logOut();
      });
    })
  }

  logIn() {
    this.setState({
       isLoading: true
    });
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
          
          this.setState({
            isLoggedin: false, isLoading: false
          });
        }
        else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString());
          this.getLoginData();
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      }
    ).catch((error) => console.error(error)); // error handling for promise
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
