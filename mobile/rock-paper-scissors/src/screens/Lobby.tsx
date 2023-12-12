import React, {FC, useContext, useRef, useState} from 'react';

import { HomeNavProps } from 'navigation/stacks/HomeStack/HomeParamList';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';


import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';

import {
    boxShadow, flex, FONT_SIZE_24,
    FONT_SIZE_32,
    LIGHT, PRIMARY, SECONDARY,
    WINDOW_HEIGHT, WINDOW_WIDTH
} from "shared/styles";

// Contexts
import {AuthContext} from "shared/providers";

// Components
import {StatsHeader} from "components/common/StatsHeader";
import {GameModeModal, LobbySlider} from "components/lobby";
import {Row} from "components/common";
import {GameMode} from "shared/types";
import {MOCK_IMAGES} from "shared/constants";


interface LobbyProps extends HomeNavProps<'Lobby'> {}


export const Lobby : FC<LobbyProps> = ({ navigation, route }: HomeNavProps<'Lobby'>) => {

    const { logout, user } = useContext(AuthContext);

    const [ visibleModal, setModalVisible ] = useState<boolean>(false);

    const selectedMode = useRef<GameMode|'none'>('none');

    const openModal = (mode: GameMode) => {
        setModalVisible(true);
        selectedMode.current = mode;
    }

    const closeModal = () => {
        setModalVisible(false);
        selectedMode.current = 'none';
    }

    const selectModalOption = (mode: GameMode|'none', roomAction: 'create'|'join' ) => {
        if(selectedMode.current != 'none')
            navigation.navigate("GameQueue", { mode: mode as  "PvP" | "PvE" | "2 vs 2", roomAction: roomAction })
        closeModal();
    }

    return (
        <View style={styles.container}>

            <StatsHeader />
            <GameModeModal mode={selectedMode.current} close={()=> closeModal()} open={visibleModal}>
                <Row gap={20}>
                    <TouchableOpacity
                        onPress={()=>  selectModalOption( selectedMode.current, 'create') }
                        style={styles.modalOptionTile}
                    >
                        <AntDesign name={'pluscircleo'} size={32} color={'black'} />
                        <Text style={styles.modalOptionTileText}>Create</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> selectModalOption( selectedMode.current, 'join') }
                        style={styles.modalOptionTile}
                    >
                        <AntDesign name={'enter'} size={32} color={'black'} />
                        <Text style={styles.modalOptionTileText}>Join</Text>
                    </TouchableOpacity>
                </Row>
            </GameModeModal>
            <LobbySlider modes={[
                { id: 'left-spacer' , type: 'spacer'},
                {
                    id: '1',
                    type: 'normal',
                    name: 'PvP',
                    description: 'Description for Mode 1',
                    screen: 'Mode1Screen',
                    image: MOCK_IMAGES[0],
                    goTo: ()=> openModal('PvP'),
                },
                {
                    id: '2',
                    type: 'normal',
                    name: '2 vs 2',
                    description: 'Team up with another player',
                    screen: 'Mode2Screen',
                    image: MOCK_IMAGES[1],
                    goTo: ()=> openModal('2 vs 2'),
                },
                {
                    id: '3',
                    type: 'normal',
                    name: 'PvE',
                    description: 'Challenge a computer',
                    screen: 'Mode2Screen',
                    image: MOCK_IMAGES[2],
                    goTo: ()=> openModal('PvE'),
                    // goTo: ()=> navigation.navigate("Game", { mode: 'pvp' } ),
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
    modalOptionTile:{
        flex: 1,
        aspectRatio: 1,
        backgroundColor: LIGHT+'3d',
        borderRadius: 20 ,
        ...boxShadow('#000'),
        ...flex('column', 'nowrap', 'center', 'center')
    },
    modalOptionTileText: {
        marginTop: 10,
        fontSize: FONT_SIZE_24,
        fontWeight: "300"
    }
})