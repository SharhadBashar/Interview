import {
        PixelRatio,
        Dimensions,
} from 'react-native'

var width = Dimensions.get('window').width;
var PR = PixelRatio.get();
var m = PR * 1.8;

if (PR >= 1 && PR <= 2) {
        m = PR * 2.2;
}
//? When all necessary values are added from Dimens.js, remove it.
export default {
        textHeader1: 5.5 * m,  //!unused (was textTitle)
        textHeader2: 3.3 * m,
        textSubtitle: 4 * m,
        textBody: 3.2 * m,
        textBodySM: 2.2 * m,
        textButton: 15,
        textButtonLG: 20,

        iconReg: 3.5 * m,
        iconLarge: 6 * m,
        imageAlert: width * 0.30,


        //interactive elements (buttons) have static sizes
        buttonHeight: 44,// 11*m,
        buttonIcon: 30,
        buttonPadding: 12,

        headerHeight: 68,
}