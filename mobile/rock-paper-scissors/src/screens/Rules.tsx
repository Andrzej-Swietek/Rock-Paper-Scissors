import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

// Components
import {Center, FramedContainer, Row} from "components/common";
import { InfoNavProps } from 'navigation/stacks/InfoStack/InfoParamList';
import {LIGHT, PRIMARY} from "shared/styles";
import {StatsHeader} from "components/common/StatsHeader";

interface RulesProps extends InfoNavProps<'rules'> {
}

export const Rules: React.FC<RulesProps> = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <StatsHeader />
            <Row>
                <FontAwesome5 style={{marginVertical: 30, marginHorizontal: 10}} name="node" size={48} color={PRIMARY} />
                <FontAwesome5 style={{marginVertical: 30, marginHorizontal: 10}} name="python" size={48} color={PRIMARY}  />
                <FontAwesome5 style={{marginVertical: 30, marginHorizontal: 10}} name="react" size={48} color={PRIMARY} />
            </Row>
            <Center>
                <Text> Rules </Text>
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