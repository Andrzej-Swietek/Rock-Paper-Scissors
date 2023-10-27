import {Dimensions,PixelRatio} from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
 const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 375;

export const scaleSize = size => (WINDOW_WIDTH/guidelineBaseWidth) * size;

// export const scaleFont = size => size * PixelRatio.getFontScale();

export const SCALE_18 = scaleSize(18);
export const SCALE_16 = scaleSize(16);
export const SCALE_12 = scaleSize(12);
export const SCALE_8 = scaleSize(8);
