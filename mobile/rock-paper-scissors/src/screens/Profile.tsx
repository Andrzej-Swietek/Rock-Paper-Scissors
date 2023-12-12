import React, {useContext} from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, Image} from "react-native";

// Components
import {UserNavProps} from "navigation/stacks/UserStack/UserParamList";
import {
    boxShadow,
    flex, FONT_SIZE_12, FONT_SIZE_16, FONT_SIZE_24,
    FONT_SIZE_32, FONT_SIZE_48, FONT_SIZE_64,
    LIGHT,
    WIN, WINDOW_HEIGHT,
    WINDOW_WIDTH
} from "shared/styles";

// Contexts
import {AuthContext} from "shared/providers";

// Component
import {GamesHistoryList} from "components/profile";
import {HeaderImageBackdrop, StatsHeader, Row} from "components/common";
import {useQuery} from "@tanstack/react-query";
import {StatsService} from "shared/services";

interface SettingsProps extends UserNavProps<'profile'> {
}

const SPACING: number = 10;

export const Profile: React.FC<SettingsProps> = ({ route, navigation }) => {

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["user-stats"],
        queryFn: () => StatsService.getUserStats(''),
        // refetchInterval: 1000,
    });

    const { user, logout } = useContext(AuthContext);

    // if (isPending) return <></>
    // if (isError) return <></>

    return (
        <View style={styles.container}>
            {/*<StatsHeader />*/}
            <HeaderImageBackdrop
                imageSource={{ uri: 'https://images.pling.com/img/00/00/62/69/92/1727023/epic-071.jpg' }}
            />
            <ScrollView snapToInterval={WINDOW_HEIGHT * 0.3} decelerationRate="fast" bounces={false}>
                <View style={{height: WINDOW_HEIGHT*0.5, ...flex('column', 'nowrap', 'center', 'flex-start')}}>
                  <Row>
                      <Text style={{ textAlign: 'left', color: LIGHT,  fontSize: FONT_SIZE_48, fontWeight: "bold" }}> { user.username } </Text>
                  </Row>
                    <Row>
                        <View style={{ marginVertical: 10, marginBottom: 20,  flex: 1,  ...flex('column', 'nowrap', 'center', 'center') }}>
                            <Text style={{ paddingHorizontal: 20, color: LIGHT,  fontSize: FONT_SIZE_16, fontWeight: "bold", textAlign: 'left', width: '100%' }}> Gesture Stats: </Text>
                            <Row>
                                <View style={styles.statsColumn}>
                                    <Image style={styles.statsIcon} source={require('../../assets/img/rock-icon.png')} />
                                    <Text style={styles.gestureStatsValue}> { data?.rocks } </Text>
                                    <Text style={styles.gestureStatsName}>  Rock  </Text>
                                </View>
                                <View style={styles.statsColumn}>
                                    <Image style={styles.statsIcon} source={require('../../assets/img/paper-icon.png')} />
                                    <Text style={styles.gestureStatsValue}> { data?.papers } </Text>
                                    <Text style={styles.gestureStatsName}>  Paper  </Text>
                                </View>
                                <View style={styles.statsColumn}>
                                    <Image style={styles.statsIcon} source={require('../../assets/img/scissors-icon.png')} />
                                    <Text style={styles.gestureStatsValue}> { data?.scissors } </Text>
                                    <Text style={styles.gestureStatsName}>  Scissors  </Text>
                                </View>
                            </Row>
                        </View>
                    </Row>
                    <Row>
                        <View style={styles.statsColumn}>
                            <Text style={styles.statsTextValue}>{ data?.games } </Text>
                            <Text style={styles.statsTextName}>  Games </Text>
                        </View>
                        <View style={styles.statsColumn}>
                            <Text style={styles.statsTextValue}> { data?.wins }  </Text>
                            <Text style={styles.statsTextName}> Wins </Text>
                        </View>
                        <View style={styles.statsColumn}>
                            <Text style={styles.statsTextValue}> { data?.wins / data?.games || 0 } </Text>
                            <Text style={styles.statsTextName}> Win Ratio  </Text>
                        </View>
                    </Row>
                </View>
            <GamesHistoryList />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT,
        paddingVertical: 30,
        alignItems: 'center'
    },
    cardWrapper: {
        marginVertical: 30,
        paddingVertical: 10,
        width: 0.90* WINDOW_WIDTH,
        aspectRatio: 1,
        zIndex: 10,
        backgroundColor: LIGHT,
        marginHorizontal: SPACING,
        padding: SPACING * 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        borderRadius: 34,
        ...boxShadow('#000')
    },
    statsTextName: {
        color: LIGHT,  fontSize: FONT_SIZE_16, fontWeight: "bold"
    },
    statsTextValue: {
        color: LIGHT,  fontSize: FONT_SIZE_24, fontWeight: "bold"
    },
    statsIcon: {
        width: 30, height: 30, marginVertical: 10,
    },
    gestureStatsName: {
        color: LIGHT,  fontSize: FONT_SIZE_12, fontWeight: "bold"
    },
    gestureStatsValue: {
        color: LIGHT,  fontSize: FONT_SIZE_16, fontWeight: "bold"
    },
    statsColumn: {
        flex: 1,  ...flex('column', 'nowrap', 'center', 'center')
    }
});