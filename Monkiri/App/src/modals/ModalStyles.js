import {
    StyleSheet,
} from 'react-native';

import Colors from '../values/Colors';
import Dimens from '../values/Dimens';
import Fonts from '../values/Fonts';

const borderRadius = 20;
const backgroundColor = 'white';
const margin = Dimens.smallScreen ? 12 : 18;  
const padding = 20;

export default StyleSheet.create({

    modalWrapper: {
        padding: margin,
        flex: 1,
        backgroundColor:'#000000AA',
        justifyContent: 'center',
    },

    fullscreen: {
        borderRadius,
        backgroundColor,
        flex: 1,
        overflow: 'hidden',
    },

    wrap: {
        borderRadius: borderRadius,
        marginLeft: margin,
        marginRight: margin,
        paddingBottom: padding,
        backgroundColor: 'white',
        //drop shadows
        elevation: 12, //android
        shadowOpacity: 0.15, //ios
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },

    textTitle: {
        fontSize: Dimens.headerPrimaryText,
        margin: 8,
        fontFamily: Fonts.primaryBold,
        color: Colors.textPrimary,
    },

    textHeader: {
        fontFamily: Fonts.primaryBold,
        color: Colors.primary,
        textAlign: 'center',
        fontSize: Dimens.headerSecondaryText,
    },

    textDescription: {
        fontSize: Dimens.bodyText,
        margin: 4,
        textAlign: 'center',
        fontFamily: Fonts.primaryBold,
    },
    
    textSubtitle: {
        color: Colors.primary,
        fontSize: Dimens.headerSecondaryText,
        fontFamily: Fonts.primaryBold,
        textAlign: 'center',
    },
    
    textBold:{
        fontSize: 20,
        fontFamily: Fonts.primaryBold,
        textAlign: 'center',
        color:'black'
    },
    
    textDescriptionBold: {
        fontSize: Dimens.headerSecondaryText,
        margin: 4,
        textAlign: 'center',
        fontFamily: Fonts.primaryBold,
        color: Colors.textPrimary
    },
    textDescription: {
        fontSize: Dimens.headerSecondaryText,
        margin: 4,
        textAlign: 'center',
        fontFamily: Fonts.primary,
        color: Colors.textPrimary
    },

    buttonContainer: {
        alignSelf: 'center',        
        width: '90%',
        marginTop: 6,
        marginBottom: 8
    },

    iconStyle: {        
        width: Dimens.iconSize,
        height: Dimens.iconSize,
        resizeMode: 'contain',
    }
});