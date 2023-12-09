import React, {FC} from "react";
import {Image, ImageSourcePropType, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import {WINDOW_HEIGHT, WINDOW_WIDTH} from "shared/styles";



const BACKDROP_HEIGHT = WINDOW_HEIGHT*0.65;
const SPACING: number = 10;

interface HeaderImageBackdropProps {
    imageSource: ImageSourcePropType;
}

export const HeaderImageBackdrop : FC<HeaderImageBackdropProps>= ({ imageSource }) => {
    return (
        <View style={{ height: BACKDROP_HEIGHT, position: 'absolute', left: 0, top: 0 }}>

            <Image
                style={{
                    width: WINDOW_WIDTH,
                    height: BACKDROP_HEIGHT,
                    position: 'absolute',
                    left: 0,
                    top: 0
                }}
                source={imageSource}
            />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'white']}
                style={{
                    height: BACKDROP_HEIGHT,
                    width: WINDOW_WIDTH,
                    position: 'absolute',
                    bottom: 0,
                }}
            />
        </View>
    );
}