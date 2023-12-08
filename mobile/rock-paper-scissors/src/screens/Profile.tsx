import React from 'react';
import {StyleSheet, Text, View} from "react-native";

// Components
import {Center, Row} from "components/common";
import { HomeNavProps } from 'navigation/stacks/HomeStack/HomeParamList';
import {UserNavProps} from "navigation/stacks/UserStack/UserParamList";
import {LIGHT, PRIMARY} from "shared/styles";
import {StatsHeader} from "components/common/StatsHeader";
import {FontAwesome5} from "@expo/vector-icons";

interface SettingsProps extends UserNavProps<'profile'> {
}

export const Profile: React.FC<SettingsProps> = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <StatsHeader />
            <Row>
                <Text> Lorem ipsum  </Text>
            </Row>
            <Center>
                <Text> Profile </Text>
            </Center>
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
});