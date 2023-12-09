import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {
    boxShadow,
    FONT_SIZE_12,
    GRAY,
    LIGHT,
    LOSE,
    PVE_COLOR,
    PVP_COLOR,
    WIN,
    WINDOW_HEIGHT,
    WINDOW_WIDTH
} from "shared/styles";
import React, {useContext} from "react";
import {AuthContext} from "shared/providers";



const BACKDROP_HEIGHT = WINDOW_HEIGHT*0.65;
const SPACING: number = 10;

export const GamesHistoryList = () => {
    const { user, logout } = useContext(AuthContext);

    const gameHistory = [
        { win: true,  mode: 'PvP', opponent: 'Caren', date: '2023.03.21' },
        { win: false, mode: 'PvP', opponent: 'Caren', date: '2023.03.21' },
        { win: true,  mode: 'PvE', opponent: 'Caren', date: '2023.03.21' },
        { win: true,  mode: 'PvP', opponent: 'Caren', date: '2023.03.21' },
        { win: false, mode: 'PvP', opponent: 'Caren', date: '2023.03.21' },
        { win: true,  mode: 'PvE', opponent: 'Caren', date: '2023.03.21' },
    ];

    return (
        <View style={styles.historyWrapper}>
            <View style={styles.historyCarpet}>
                {
                    gameHistory.map( (item, index) => (
                        <ImageBackground source={item.mode === 'PvP' ? require('../../../assets/img/game_2.jpg') : require('../../../assets/img/game_3.jpg')} key={index} style={styles.historyCardItem}>
                            <View style={{ marginBottom: 10, paddingHorizontal: 20, paddingVertical: 5, width: 80, borderRadius: 15, backgroundColor: item.mode == 'PvP' ? PVP_COLOR : PVE_COLOR }}>
                                    <Text style={{ fontSize: FONT_SIZE_12, textAlign: 'center', fontWeight: 'bold' }}> {item.mode} </Text>
                            </View>
                            <Text style={[{ color: LIGHT, fontWeight: "700" }, styles.textShadow]}> { user.username } vs {item.opponent} </Text>
                            <Text style={[{ color: LIGHT, fontWeight: "200" }, styles.textShadow]}> { item.date }</Text>
                            <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 20, borderRadius: 15, backgroundColor: item.win ? WIN : LOSE }}></View>
                        </ImageBackground>
                    ))
                }
                <View style={{ height: WINDOW_HEIGHT/10 }}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    historyWrapper: {
        width: '100%',
        height: 'auto',
        marginTop: -50,
        paddingHorizontal: SPACING * 2,
        paddingVertical: SPACING * 2,
        alignItems: 'center',
        borderRadius: 26,
        zIndex: 9,
    },
    historyCarpet: {
        width:  0.90* WINDOW_WIDTH,
        // backgroundColor: GRAY,
        borderRadius: 26,
        padding: SPACING,
        height: '100%',
        ...boxShadow('#000')
    },
    historyCardItem: {
        width: '100%',
        backgroundColor: '#8e8e8e',
        borderRadius: 10,
        marginVertical: 5,
        paddingVertical: 15,
        paddingLeft: 10,
        ...boxShadow('#000')
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
})