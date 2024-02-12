import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, ViewStyle, StyleProp, TextStyle} from "react-native";
import {boxShadow, LIGHT, PRIMARY, SECONDARY} from "shared/styles";

interface StandardButtonProps {
    text: string;
    onPress: () => void,
    customStyle?: StyleProp<ViewStyle|TextStyle>
    disabled?: boolean
}

export const StandardButton: React.FC<StandardButtonProps> = ({text, onPress, customStyle, disabled}) => {
    return (
        <View style={styles.buttonWrapper}>
            {
                <TouchableOpacity style={[ styles.button ]} onPress={ ()=> onPress() } disabled={ disabled }>
                    <Text style={[ styles.text ]}> { text } </Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export const SecondaryButton: React.FC<StandardButtonProps> = ({text, onPress, customStyle, disabled}) => {
    return (
        <View style={styles.buttonWrapper}>
            {
                <TouchableOpacity style={[ styles.buttonSecondary ]} onPress={ ()=> onPress() } disabled={ disabled }>
                    <Text style={[ styles.text, { color: PRIMARY } ]}> { text } </Text>
                </TouchableOpacity>
            }
        </View>
    )
}

StandardButton.defaultProps = {
    disabled: false
}

const styles = StyleSheet.create({
    buttonWrapper: {
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'none'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 26,
        elevation: 3,
        height: 60,
        backgroundColor: PRIMARY,
        width: '100%',
        alignSelf: 'center',
        zIndex: 1,
        ...boxShadow('#000')
        // flex: 1
    },
    buttonSecondary: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 26,
        elevation: 3,
        height: 60,
        // backgroundColor: SECONDARY,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: PRIMARY,
        width: '100%',
        alignSelf: 'center',
        zIndex: 1,
        ...boxShadow('#000')
        // flex: 1
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: 'Roboto-Bold'
    }
})
