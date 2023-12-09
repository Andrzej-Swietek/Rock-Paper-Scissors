import React, {FC, useContext} from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {AntDesign} from "@expo/vector-icons";

import {
    flex,
    FONT_SIZE_16, FONT_SIZE_24, FONT_SIZE_32,
    LIGHT, PRIMARY, SECONDARY,
    WINDOW_WIDTH
} from "shared/styles";

import {AuthContext} from "shared/providers";
import {Row} from "components/common/Row";

export const StatsHeader: FC<{}> = ({}) => {

    const { logout, user } = useContext(AuthContext);

    const calculateExp = () => {
        const MAX_EXP: number = user.level * 100;
        const progress: number = (user.exp+10 / MAX_EXP) * 100;
        return Math.min(progress, 100);
    };

    return (
        <View style={styles.statsHeader}>
            <View style={{ marginTop: 0 }}>
                <Text style={styles.nickname}> { user.username } </Text>
            </View>
            <Row>
                <AntDesign style={{marginTop: 0}} name={'star'} size={24} color={PRIMARY} />
                <Text style={styles.points}> { user.points } </Text>
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
    )
}

const styles = StyleSheet.create({
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
        color: '#fff'
    },
    statsHeader: {
        top: 20,
        color: LIGHT,
        width: WINDOW_WIDTH,
        padding: 20,
        paddingBottom: 30,
        // marginBottom: 20,  // TODO: RETHINK
        zIndex: 100,
        ...flex("row", "nowrap", "space-between")
    },
    progressContainer: {
        alignItems: 'center',
        marginTop: 0,
    },
    progressBar: {
        width: 100,
        height: 10,
        backgroundColor: '#bdc3c7', // Change the unfilled color as per your design
        borderRadius: 5,
        overflow: 'hidden',
    },
    points: {
        marginTop: 0,
        marginRight: 10,
        fontWeight: "bold",
        fontSize: FONT_SIZE_16,
        color: '#fff'
    }
});