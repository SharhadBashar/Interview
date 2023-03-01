import React from 'react';

import {
    View,
    StyleSheet,
    Animated
} from 'react-native';

import styles from '../components/ComponentStyles';
import Colors from '../values/Colors';

const progressStyle = StyleSheet.create({
    wrapper: {
        flexDirection: 'row', 
        width: '100%',
        height: 15,
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 15,
        borderRadius: 6,
        flex: 1,
        overflow: 'hidden',

        //drop shadow ios      
        shadowOpacity: 0.15,
        shadowRadius: 1,
        //drop shadow android 
        elevation: 1,
    },
    fill: {
        backgroundColor: Colors.primary,
    },
});

export default class ProgressBarComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            bar: new Animated.Value(this.props.progress) 
        };
    }
    componentDidMount() {
        //let total = this.props.total;
       //this.setState({ progress: (this.state.current + 1) / this.props.total });
    }
    _fadeIn(){
        Animated.timing(
            this.state.fade,
            {
                toValue: 1,
                duration: 300,
                delay:100
            }
        ).start();
    }

    render() {

        return (
            <View style={[progressStyle.wrapper, { width: '40%', alignSelf: 'center' }]}>
                <View style={progressStyle.container}>
                    <Animated.View style={[progressStyle.fill, { flex: this.props.progress }]} />
                </View>
            </View>
        )
    };

}