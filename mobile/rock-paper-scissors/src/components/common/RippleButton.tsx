import React from 'react';
import {TouchableNativeFeedback, View, StyleSheet} from "react-native";
import {PRIMARY} from "shared/styles";


interface RippleButtonProps {
    onPress: ()=> void
    customStyle?: StyleSheet,
    children: React.ReactNode
}

export const RippleButton: React.FC<RippleButtonProps> = ({onPress, children}) => {
    console.log(typeof styles)
    return (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
            onPress={ () => onPress() }
            style={{
                width: 50,
                height: 50,

            }}
        >
            <View style={[ styles.view ]}>
                {  children }
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
        height: 60,
        backgroundColor: PRIMARY,
        width: '100%',
        alignSelf: 'center'
    }
})