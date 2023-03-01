import {
    StyleSheet
} from 'react-native';

import Colors from '../values/Colors';
import Fonts from '../values/Fonts';
import Dimens from '../values/Dimens';
import Sizes from '../values/Sizes';

export default StyleSheet.create({

    /* Text styles */
    titleText: {
        fontSize: Dimens.headerSecondaryText,
        margin: 8,
        fontFamily: Fonts.primary,
        color: Colors.textPrimary,
    },    
    headerText: {
        fontFamily: Fonts.primaryBold,
        color: Colors.primary,
        textAlign: 'center',
        fontSize: Dimens.headerTabsText
    },
    titleTextWhite: {//!
        color: 'white',
        fontFamily: Fonts.primaryBold,
        fontSize: Sizes.textHeader2,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowRadius: 5,
        paddingTop: 4,
        paddingBottom: 4,
    },
    subtitleTextWhite: {
        color: 'white',
        fontFamily: Fonts.primaryBold,
        fontSize: Sizes.textSubtitle,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 3,
        paddingTop: 2,
        paddingBottom: 2,
    },
    smallText: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontFamily: Fonts.primary,
        fontSize: Dimens.bodyText,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowRadius: 2,
        textAlign: 'center',     
        padding: 7,   
    },
    grayText: {
        color: 'rgba(0, 0, 0, 0.25)',
        fontFamily: Fonts.primary,
        fontSize: Dimens.headerTabsText,
    },
    subtitleText: {//!
        color:'black',
        fontFamily: Fonts.primaryBold,
        fontSize: Sizes.textSubtitle,
    },
    subtitleText2: {//!
        color:'black',
        fontFamily: Fonts.primary,
        fontSize: Sizes.textSubtitle,
    },
    normalText: {//!
        color:'black',
        fontFamily: Fonts.primary,
        fontSize: Sizes.textBody,
    },
    textHightlight: {//!
        color: Colors.primary,
    },
    normalIcon:{//!
        height: Sizes.iconReg,
        width: Sizes.iconReg,
    },
    categoryTitle:{
        fontFamily: Fonts.primary,
        fontSize: Sizes.textBodySM,
    },

    /* Component styles */
    buttonContainer: {
        alignSelf:'center',        
        width: '90%',
        paddingLeft:12,
        paddingRight: 12,
    },
    defaultButtonStyle: {
        alignSelf: 'stretch',
        padding: Sizes.buttonPadding,
        borderRadius: 50, // Will round fully
        //ios
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0
        },
        //android 
        elevation: 2,
    },
    defaultButtonLabel:{
        fontSize: Sizes.textButton,
        fontFamily: Fonts.primaryBold,
        textAlign: 'center'
    },

    /* Stat container style */  
    statCompletionRow: {
        width: '100%',
        height: Dimens.dataContainerSize,
        backgroundColor: Colors.backgroundGray,
        flexDirection: 'row',
    },
    statContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    statTextWrapper: {
        flexDirection: 'row',
    },
    statLabelText: {
        color: Colors.textPrimary,
        fontFamily: Fonts.primaryBold,
        fontSize: Dimens.bodyText,
        alignSelf: 'center',
    },
    statCountText: {
        fontFamily: Fonts.primaryBold,
        color: Colors.primary,
        marginLeft: 16,
        fontSize: Dimens.headerPrimaryText - 1,
        alignSelf: 'center',
    },

    /* Tab bar style */
    tabBarLabel: {
        fontFamily: Fonts.primaryBold, 
        fontSize: Dimens.headerTabsText, 
        padding: Dimens.tabBarPadding,
    },
    tabIndicator: {
        backgroundColor: Colors.primary, 
        height: Dimens.tabIndicatorHeight
    },

    /* Progress bar style !use progressbarcomponent instead */
    progressWrapper: {
        flexDirection: 'row', 
        width: '100%',
        height: 12,
        alignItems: 'center',
    },
    
    progressContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 12,
        borderRadius: 6,
        flex: 1,
        overflow: 'hidden',

        //drop shadow ios      
        shadowOpacity: 0.15,
        shadowRadius: 1,
        //drop shadow android 
        elevation: 1,
    },
    progressFill: {
        backgroundColor: Colors.primary,
    },
    percentText: {
        fontFamily: Fonts.primaryBold,
        color: 'white',
        fontSize: Dimens.headerSecondaryText,
        width: 60,
        textAlign: 'center',
        
        //drop shadow
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowRadius: 5,
    },
    infoContainer: {
        width: '100%',
        height: 58,
        backgroundColor: Colors.backgroundGray,
        flexDirection: 'row',    
    },
    
});
