import React, {FC} from "react";
import {
    ImageBackground,
    StyleSheet, Text,
    TouchableOpacity, View
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import {
    boxShadow,
    FONT_SIZE_24, FONT_SIZE_32,
    LIGHT, PRIMARY, SECONDARY,
    WINDOW_HEIGHT
} from "shared/styles";


export type ILobbyItem = { id: number, title: string, image: string, type?: 'option'|'header', onClick?: ()=>void  }


export const LobbyItem: FC<{ item: ILobbyItem }>= ({item})=> {
    if ( item.type === 'header' ){
        const headerImagePath: string = '../../../assets/img/lobby_header.jpg';
        // const headerImagePath: string = '../../../assets/img/lobbyHeader.webp';
        return (
            <ImageBackground
                style={ [styles.listItem, styles.header, { height: WINDOW_HEIGHT/3, borderRadius: 15, overflow: 'hidden' }] }
                source={ require(headerImagePath) }
            >
                <Text style={ styles.headerText }>{ item.title }</Text>
            </ImageBackground>
        )
    }
    return (
        <TouchableOpacity onPress={ ()=> item.onClick() } style={[styles.listItem, { height: WINDOW_HEIGHT/3, marginVertical: 10 }]}>
            <View style={[ styles.listItemImage ]} >
                <MaterialCommunityIcons name="sword-cross" size={50} color="white" />
            </View>
            <View style={ styles.listItemDescription }>
                <Text style={{ fontFamily: 'Roboto-Bold', color: SECONDARY, fontSize: FONT_SIZE_24 }}> { item.title } </Text>
            </View>
        </TouchableOpacity>
    )
}

 const styles= StyleSheet.create({
     header: {
         alignItems: 'center',
         justifyContent: 'center'
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
 })