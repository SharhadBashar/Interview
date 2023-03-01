import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';

String.prototype.getString = function() {
    return this;
}

AppRegistry.registerComponent('Monkiri', () => App);
