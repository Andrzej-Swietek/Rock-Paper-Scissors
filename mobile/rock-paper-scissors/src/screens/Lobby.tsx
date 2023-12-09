import React, {FC, useContext} from 'react';

import { HomeNavProps } from 'navigation/stacks/HomeStack/HomeParamList';
import {View, StyleSheet, Button} from 'react-native';


import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    boxShadow,
    FONT_SIZE_32,
    LIGHT, PRIMARY, SECONDARY,
    WINDOW_HEIGHT, WINDOW_WIDTH
} from "shared/styles";

// Contexts
import {AuthContext} from "shared/providers";

// Components
import {StatsHeader} from "components/common/StatsHeader";
import {LobbySlider} from "components/lobby";


interface LobbyProps extends HomeNavProps<'Lobby'> {}

export const Lobby : FC<LobbyProps> = ({ navigation, route }: HomeNavProps<'Lobby'>) => {

    const { logout, user } = useContext(AuthContext);

    return (
        <View style={styles.container}>

            <StatsHeader />

            <LobbySlider modes={[
                { id: 'left-spacer' , type: 'spacer'},
                {
                    id: '1',
                    type: 'normal',
                    name: 'PvP',
                    description: 'Description for Mode 1',
                    screen: 'Mode1Screen',
                    image: 'https://images.pling.com/img/00/00/62/69/92/1727023/epic-071.jpg',
                    goTo: ()=> navigation.navigate("Game", { mode: 'pvp' } ),
                },
                {
                    id: '2',
                    type: 'normal',
                    name: '2 vs 2',
                    description: 'Team up with another player',
                    screen: 'Mode2Screen',
                    image: 'https://images.pling.com/img/00/00/62/69/92/1727029/epic-091.jpg',
                    goTo: ()=> navigation.navigate("Game", { mode: 'pvp' } )
                },
                {
                    id: '3',
                    type: 'normal',
                    name: 'PvE',
                    description: 'Challenge a computer',
                    screen: 'Mode2Screen',
                    image: 'https://images.pling.com/img/00/00/62/69/92/1727023/epic-071.jpg',
                    goTo: ()=> navigation.navigate("Game", { mode: 'pve' } )
                },
                { id: 'right-spacer' , type: 'spacer'},
            ]} />

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