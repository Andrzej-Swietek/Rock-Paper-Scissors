import React, {FC} from "react";
import {StyleSheet, View} from "react-native";
import {ALERT, boxShadow, flex, LIGHT, SUCCESS} from "shared/styles";
import {TurnPanel} from "components/common/TurnPanel";

interface TopProps {
    children: React.ReactNode;
}
export const Top : FC<TopProps> = ({ children }) => {
    return (
        <View style={ styles.top }>
            { children }
        </View>
    )
}
const styles = StyleSheet.create({
    top: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        // backgroundColor: PRIMARY+'3d',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        ...boxShadow('#000')
    },
})
