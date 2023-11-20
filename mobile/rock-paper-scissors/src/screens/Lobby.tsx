import React, {FC, useContext} from 'react';

import { HomeNavProps } from 'navigation/stacks/HomeStack/HomeParamList';
import {View, Text, Image, StyleSheet, FlatList, ImageBackground, TouchableOpacity} from 'react-native';


import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    boxShadow,
    FONT_SIZE_32,
    LIGHT, PRIMARY, SECONDARY,
    WINDOW_HEIGHT, WINDOW_WIDTH
} from "shared/styles";

import {AuthContext} from "shared/providers";

import {StatsHeader} from "components/common/StatsHeader";
import {ILobbyItem, LobbyItem} from "components/lobby";


interface LobbyProps extends HomeNavProps<'Lobby'> {}

export const Lobby : FC<LobbyProps> = ({ navigation, route }: HomeNavProps<'Lobby'>) => {

    const { logout, user } = useContext(AuthContext);

    const lobbyItems: ILobbyItem[] = [
        { id: 0, title: 'Game Modes',   type: 'header', image: '' },
        { id: 1, title: 'Play',  type: 'option', image: '', onClick: ()=> navigation.navigate("Game", { mode: 'pvp' } )},
        { id: 2, title: 'Play',  type: 'option', image: '', onClick: ()=> navigation.navigate("Game", { mode: 'pvp' } )},
        { id: 3, title: 'Play',  type: 'option', image: '', onClick: ()=> navigation.navigate("Game", { mode: 'pvp' } )},
    ];

    return (
        <View style={styles.container}>

            <StatsHeader />

            <FlatList
                style={{ width: '92%' }}
                data={ lobbyItems }
                renderItem={ ({item}) => <LobbyItem item={item} />}
                keyExtractor={ (item) => item.id.toString() }
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={WINDOW_HEIGHT*0.5}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
            <View style={{ height: WINDOW_HEIGHT/10 }}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT,
        paddingVertical: 30,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {},
    listItem: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 15
    },
    listItemImage: {
        flex: 1,
        backgroundColor: PRIMARY,
        borderRadius: 15,
        marginHorizontal: 10,
        ...boxShadow('#000'),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        overflow: "hidden"
    },
    listItemDescription: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 15,
        backgroundColor: LIGHT,
        ...boxShadow(PRIMARY+'8d'),
        elevation: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        fontSize: FONT_SIZE_32,
        fontWeight: "bold",
        fontFamily: 'Roboto-Bold',
        padding: 20,
        backgroundColor: SECONDARY+'7d',
        color: LIGHT,
        borderRadius: 25
    },
})