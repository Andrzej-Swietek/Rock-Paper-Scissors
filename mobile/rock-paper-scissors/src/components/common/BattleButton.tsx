import {StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle, Text} from "react-native";
import React, {FC} from "react";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";


interface BattleButtonProps {
    text?: string;
    onPress: () => void,
    customStyle?: StyleProp<ViewStyle|TextStyle>
    disabled?: boolean
}

export const BattleButton: FC<BattleButtonProps> = ({
    text,
    onPress,
    customStyle,
    disabled
}) => {
    return (
        <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => onPress()} disabled={disabled}>
                <MaterialCommunityIcons name="sword-cross" size={24} color="white" />
                <Text style={styles.text}>{text}</Text>
                <MaterialCommunityIcons name="sword-cross" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

BattleButton.defaultProps = {
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        height: 60,
        backgroundColor: '#3498db', // Use your desired primary color
        width: '100%',
        alignSelf: 'center',
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        fontFamily: 'Roboto-Bold',
        marginHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
});