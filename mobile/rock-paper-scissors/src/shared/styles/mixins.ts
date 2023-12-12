import {Dimensions, PixelRatio, TextStyle, ViewStyle} from 'react-native';
import {LIGHT} from "shared/styles/colors";
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 375;

// export const scaleSize = size => (WINDOW_WIDTH/guidelineBaseWidth) * size;
//
// export const scaleFont = size => size * PixelRatio.getFontScale();

function dimensions(top, right = top, bottom = top, left = right, property){
    let styles = {};

    styles[`${property}Top`] = top;
    styles[`${property}Right`] = right;
    styles[`${property}Bottom`] = bottom;
    styles[`${property}Left`] = left;

    return styles;
}

export function margin(top, right, bottom, left){
    return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left){
    return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(color, offset = {height:2,width:2}, radius = 8, opacity = 0.2){
    return {
        shadowColor: color,
        shadowOffset: offset,
        shadowOpacity: opacity,
        shadowRadius: radius,
        // elevation: radius,
    };
}

type JustifyContentType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type FlexAlignType = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

export function flex(dir:'row'|'column' ='row', wrap: 'wrap'|'nowrap' = 'wrap', x: JustifyContentType ='center', y: FlexAlignType='center') {
 return {
     justifyContent: x,
     alignItems: y,
     flexDirection: dir,
     flexWrap: wrap
 }
}
// export const absolute: (left,top) => {
//     return({
//        position: 'absolute',
//        top: top,
//        left: left
//    })
// }

export const DEFAULT_SCREEN_CONTAINER: ViewStyle | TextStyle  =  {
    flex: 1,
    backgroundColor: LIGHT,
    paddingVertical: 30,
    alignItems: 'center'
}