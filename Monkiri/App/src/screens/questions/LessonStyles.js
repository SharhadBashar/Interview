import {
    StyleSheet,
} from 'react-native';

import Colors from '../../values/Colors';
import Fonts from '../../values/Fonts';

export default StyleSheet.create({

    viewWrapper: {
        justifyContent: 'center',
        paddingTop: 58,
    },

    buttonContainer: {
        padding: 8,
    },

    icon: {
        height: 350,
        alignSelf: 'center',
        resizeMode: 'contain',
    },

    inputBox: {
        borderRadius: 12, // Will round fully
        borderWidth: 2,
        borderColor: Colors.mobileWallet,
        height: 40,
        width: 38,
        margin: 1,
        textAlign: 'center',
        fontFamily: Fonts.primary,
        fontSize: 30,
        padding: 0,
    },
    exitBtn: { 
        position: 'absolute',
        right: 32,
        top: 40
    },
    submitBtn: { 
        padding: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },

    //answer type question styles
    contentContainer: { flexGrow: 1, alignSelf: 'stretch', justifyContent: 'space-between', },
    curveImage: { resizeMode: 'stretch', height: 30, width: '100%' },
    answerContainer: {flex: 1, justifyContent: 'center', alignSelf: 'center', width: '80%'}
});