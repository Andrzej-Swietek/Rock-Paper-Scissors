import React, {FC} from "react";
import {StyleSheet, View} from "react-native";

interface MidProps {
    children: React.ReactNode;
}
export const Mid : FC<MidProps> = ({ children }) => {
    return (
        <View style={ styles.mid }>
            { children }
        </View>
    )
}
const styles = StyleSheet.create({
    mid: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
