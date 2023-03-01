import React from 'react';
import { BASE_URL } from 'react-native-dotenv';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Sizes from '../values/Sizes';

import ComponentStyles from './ComponentStyles';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        opacity: 0.3
    },
    image: {
        opacity: 0.5,
    },
    title: {
        margin: 12
    },
    subtitle: {
        color: 'black'
    }
})

export default class EmptyListComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }
    componentDidMount() {
        this.setState({
            ready: true
        })
    }

    render() {
        if (this.state.ready) {
            return (
                <View style={styles.container}>
                    
                    <Text style={[ComponentStyles.subtitleText, styles.title]}>No Saved Lessons</Text>
                    <Text style={styles.subtitle}>Find lessons in the 'Browse' sections</Text>
                </View>

            )
        } else {
            return <View />
        }
    }
}
