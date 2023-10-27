import React from 'react';
import {Text, View} from "react-native";

// Components
import {Center} from "components/common";
import { InfoNavProps } from 'navigation/stacks/InfoStack/InfoParamList';

interface RulesProps extends InfoNavProps<'rules'> {
}

export const Rules: React.FC<RulesProps> = ({ route, navigation }) => {
    return (
        <Center>
            <Text> Rules </Text>
        </Center>
    )
}
