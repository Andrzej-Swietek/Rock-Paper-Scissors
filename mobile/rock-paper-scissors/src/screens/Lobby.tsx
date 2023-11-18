import React, {FC, useContext} from 'react';

import { HomeNavProps } from 'navigation/stacks/HomeStack/HomeParamList';
import {View, Text, Image, StyleSheet, FlatList, ImageBackground, TouchableOpacity} from 'react-native';


import {
    boxShadow, flex, FONT_SIZE_16,
    FONT_SIZE_24,
    FONT_SIZE_32,
    LIGHT, PRIMARY, SECONDARY,
    WINDOW_HEIGHT, WINDOW_WIDTH
} from "shared/styles";

import {AuthContext} from "shared/providers";
import {AntDesign} from "@expo/vector-icons";
import {Row} from "components/common";


type LobbyItem = { id: number, title: string, image: string, type?: 'option'|'header', onClick?: ()=>void  }

interface LobbyProps extends HomeNavProps<'Lobby'> {}

export const Lobby : FC<LobbyProps> = ({ navigation, route }: HomeNavProps<'Lobby'>) => {

    const { logout, user } = useContext(AuthContext);

    const lobbyItems: LobbyItem[] = [
        { id: 0, title: 'Game Modes',   type: 'header', image: '' },
        { id: 1, title: 'Play',  type: 'option', image: '', onClick: ()=> navigation.navigate("Game", { mode: 'pvp' } )},
    ]

    const calculateExp = () => {
        const MAX_EXP: number = user.level * 100;
        const progress: number = (user.exp+1 / MAX_EXP) * 100;
        return Math.min(progress, 100);
    };

    return (
        <View style={styles.container}>
            <View style={styles.statsHeader}>
                <Text style={styles.nickname}> { user.username } </Text>
                <Row>
                    <AntDesign style={{marginTop: 10}} name={'star'} size={24} color={PRIMARY} />
                    <Text style={{ marginTop: 10, marginRight: 10, fontWeight: "bold", fontSize: FONT_SIZE_16}}> { user.points } </Text>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View
                                style={{
                                    width: `${calculateExp()}%`,
                                    height: '100%',
                                    backgroundColor: '#3498db',
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                    </View>
                </Row>

                <TouchableOpacity onPress={()=> logout()}>
                    <AntDesign name={'logout'} size={24} color={PRIMARY} />
                </TouchableOpacity>
            </View>



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
            <View style={{ height: WINDOW_HEIGHT/10 }}>

            </View>
        </View>
    );
}

const LobbyItem = ({item})=> {
    if ( item.type === 'header' ){
        return (
            <ImageBackground style={ [styles.listItem, styles.header, { height: WINDOW_HEIGHT/3, borderRadius: 15, overflow: 'hidden' }] } source={ require('../../assets/img/lobbyHeader.webp') }>
                <Text style={ styles.headerText }>{ item.title }</Text>
            </ImageBackground>
        )
    }
    return (
        <TouchableOpacity onPress={ ()=> item.onClick() } style={[styles.listItem, { height: WINDOW_HEIGHT/4, marginVertical: 10 }]}>
            <View style={[ styles.listItemImage ]} >
                {/*<Image style={{ aspectRatio: 1 }} resizeMode={'contain'} source={ item.image } />*/}
            </View>
            <View style={ styles.listItemDescription }>
                <Text style={{ fontFamily: 'Roboto-Bold', color: SECONDARY, fontSize: FONT_SIZE_24 }}> { item.title } </Text>
            </View>
        </TouchableOpacity>
    )
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
    nickname: {
        fontSize: FONT_SIZE_24,
        fontWeight: "bold",
        fontFamily: 'Roboto-Bold',
    },
    statsHeader: {
        top: 20,
        color: LIGHT,
        width: WINDOW_WIDTH,
        padding: 20,
        ...flex("row", "nowrap", "space-between")
    },
    progressContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    progressBar: {
        width: 100,
        height: 10,
        backgroundColor: '#bdc3c7', // Change the unfilled color as per your design
        borderRadius: 5,
        overflow: 'hidden',
    },
})