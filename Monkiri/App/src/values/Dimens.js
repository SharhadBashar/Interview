//!Removing this. It's a pigsty lol - will use 'Sizes.js' instead
import { PixelRatio } from 'react-native'
var TEXT_SIZE_LG = 20;
var TEXT_SIZE_MD = 16;
var TEXT_SIZE_SM = 14;
var TEXT_SIZE_BODY = 12;
var TEXT_SIZE_XS = 10;

var DEFAULT_PADDING = 4;
var BUTTON_PADDING = 10;
var PADDING_SM = 2;

//var MARGIN_LG = 38;
var MARGIN_MD = 28;
//var MARGIN_SM = 18;

var ITEM_SIZE_XL = 180;
var ITEM_SIZE_LG = 110;
var ITEM_SIZE_MD = 84;
var ITEM_SIZE_SM = 56;

var smallScreen = false;
//Set dimensions relative to screensize
var PR = PixelRatio.get();
// *tested on 2 and 3.5*
if (PR >= 1 && PR <= 2){// 1=mdpi, 1.5=hdpi, 2=xhdpi, 3=xxhdpi, 3.5=xxxhdpi
        smallScreen = true;
        TEXT_SIZE_LG = 16;
        TEXT_SIZE_MD = 13;
        TEXT_SIZE_SM = 11;
        TEXT_SIZE_BODY = 10;
        TEXT_SIZE_XS = 8;

        PADDING_SM = 0;
        DEFAULT_PADDING = 4;
        BUTTON_PADDING = 6;
        
        ITEM_SIZE_XL = 130;
        ITEM_SIZE_LG = 90;        
        ITEM_SIZE_MD = 68;   
        ITEM_SIZE_SM = 48;
}

export default {  
        containerPadding: 10,
        lessonButtonHeight: ITEM_SIZE_LG,        
        serviceButtonHeight: 83,       
        serviceButtonHeight2: 119,      
        challengeButtonHeight: 180,
        
        buttonRadius: 9,//
        buttonPadding: 9,//
    
        //font sizes
        headerPrimaryText: TEXT_SIZE_LG, 
        headerSecondaryText: TEXT_SIZE_MD,
        headerTabsText: TEXT_SIZE_SM,
        bodyText: 14,
        navText: TEXT_SIZE_SM,
        smallText: TEXT_SIZE_XS,
    
        tabIndicatorHeight: 5,
        tabBarPadding: PADDING_SM,

        defaultPadding: DEFAULT_PADDING,

        defaultItemSize: ITEM_SIZE_MD,
        
        dataContainerSize: ITEM_SIZE_SM,
        
        contentMargin: MARGIN_MD,

        iconSize: ITEM_SIZE_SM,
        iconSizeXL: ITEM_SIZE_XL,

        //
        smallScreen: smallScreen,
        buttonPadding: BUTTON_PADDING,
}