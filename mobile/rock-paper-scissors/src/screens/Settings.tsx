import React from 'react';
import {Text, View} from "react-native";

// Components
import {Center} from "components/common";
import { HomeNavProps } from 'navigation/stacks/HomeStack/HomeParamList';

interface SettingsProps extends HomeNavProps<'Settings'> {
}

export const Settings: React.FC<SettingsProps> = ({ route, navigation }) => {
    return (
        <Center>
            <Text> Settings </Text>
        </Center>
    )
}
