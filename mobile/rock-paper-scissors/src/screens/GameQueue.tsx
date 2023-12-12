import {HomeNavProps} from "navigation/stacks/HomeStack/HomeParamList";
import React, {FC, useEffect, useState} from "react";
import {
    DEFAULT_SCREEN_CONTAINER,
    flex,
    FONT_SIZE_24,
    FONT_SIZE_48,
    LIGHT, PRIMARY, SECONDARY,
    WINDOW_HEIGHT
} from "shared/styles";
import {
    Keyboard,
    KeyboardAvoidingView, Platform,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {BattleButton, HeaderImageBackdrop, Row, StandardButton} from "components/common";
import {MOCK_IMAGES} from "shared/constants";
import {FontAwesome5} from "@expo/vector-icons";

interface GameQueue extends HomeNavProps<'GameQueue'> {
}

export const GameQueue: FC<GameQueue> = ({
 route,
 navigation
}) => {
    const { mode, roomAction,  } = route.params;

    const [dots, setDots] = useState(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots.length === 3 ? "" : prevDots + "."));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const [roomId, setRoomId] = useState<string>('')

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={DEFAULT_SCREEN_CONTAINER}>
            <HeaderImageBackdrop imageSource={{ uri: MOCK_IMAGES[ mode == 'PvP' ? 2 : mode == 'PvE' ? 0 : 2 ] }} />
            <View style={styles.header}>
                    <Text style={styles.headerText}> Queueing {dots} </Text>
                    <Text style={styles.headerSmallText}> { mode } </Text>
            </View>

            {
                {
                    "join": <>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={ setRoomId }
                                        value={ roomId }
                                        placeholder="Room ID ..."
                                        keyboardType={'number-pad'}
                                    />
                                </TouchableWithoutFeedback>
                                <BattleButton text={'Join Room'} onPress={()=> alert(roomId)} />
                                <TouchableOpacity style={styles.randomButton}>
                                    <FontAwesome5 name="dice" size={48} color={PRIMARY} />
                                    <Text style={styles.randomButtonText}> Random </Text>
                                </TouchableOpacity>
                            </>,
                    "create": <></>
                }[roomAction]
            }

            <View>

            </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingHorizontal: 20,
        height: WINDOW_HEIGHT*0.5,
        ...flex('column', 'nowrap', 'center', 'flex-start')
    },
    headerText: {
        textAlign: 'left', color: LIGHT,  fontSize: FONT_SIZE_48, fontWeight: "bold"
    },
    headerSmallText: {
        width: '100%',
        textAlign: 'center',
        color: LIGHT,
        fontSize: FONT_SIZE_24,
        fontWeight: "400",
        marginVertical: 10,
    },
    input: {
        height: 60,
        width: '80%',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 3,
        margin: 12,
        padding: 15,
        fontFamily: 'Roboto-Regular',
        fontSize: FONT_SIZE_24,
        borderColor: SECONDARY,
    },
    randomButtonText: {
            fontSize: 18,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: PRIMARY,
            fontFamily: 'Roboto-Bold',
            marginHorizontal: 10,
            marginTop: 10,
    },
    randomButton: {
        marginTop: 20,
        ...flex('row', 'nowrap', 'center', 'center')
    }
});