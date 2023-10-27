import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from "react-native";
import {FONT_SIZE_32, LIGHT, SECONDARY, WINDOW_HEIGHT} from "shared/styles";

interface FramedContainerProps {
    width?: string | number,
    height?: string | number,
    style?:  StyleProp<ViewStyle>
    children
}

export const FramedContainer: React.FC<FramedContainerProps> = ({width, height,style, children}) => {
    return (
        <View style={ [styles.container,  style ] }>
            {
                children
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        margin: 15,
        marginTop: 25,
        borderColor: SECONDARY,
        borderWidth: 3,
        alignItems: 'center',
        flexDirection: "column",
        justifyContent: 'center',
        padding: 10,
        height: WINDOW_HEIGHT/3,
        borderRadius: 15,
        // overflow: 'hidden',
        zIndex: -1,
        position: 'relative'
    },
});
