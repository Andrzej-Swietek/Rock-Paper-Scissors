import React, {FC} from 'react';

import { HomeNavProps } from 'navigation/stacks/HomeStack/HomeParamList';
import {View, Text, Image, StyleSheet} from 'react-native';

import { Center } from "components/common";
import {FONT_SIZE_24, LIGHT, PRIMARY, SECONDARY} from "shared/styles";

interface LobbyProps extends HomeNavProps<'Lobby'> {}

export const Lobby : FC<LobbyProps> = ({ navigation, route }: HomeNavProps<'Lobby'>) => {
    return (
        <Center>
            <Text> Lobby </Text>
            <Image source={ require('../../assets/img/loginBlob.png') }  style={styles.image}/>
        </Center>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT,
    },
    header: {
        flex: 4,
        margin: 10,
        borderRadius: 10,
        borderColor: SECONDARY,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    body: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
    },
    accent: {
        color: PRIMARY,
        fontWeight: "bold",
        fontFamily: 'Roboto-Bold'
    },
    headerText: {
        fontSize: 54,
        // lineHeight: 44,
        width: '80%',
        textAlign: 'left',
        color: SECONDARY,
        fontFamily: 'Roboto-Regular'
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
    button: {
        width: '80%',
        backgroundColor: SECONDARY,
        textAlign: 'center'
    },
    image: {
        height: 270,
        width: 209,
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 2,
        // elevation: 2
    },

})
