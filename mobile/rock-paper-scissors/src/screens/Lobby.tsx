import React, {FC} from 'react';

import { HomeNavProps } from 'navigation/stacks/HomeStack/HomeParamList';
import { View, Text } from 'react-native';

import { Center } from "components/common";

interface LobbyProps extends HomeNavProps<'Lobby'> {}

export const Lobby : FC<LobbyProps> = ({ navigation, route }: HomeNavProps<'Game'>) => {
    return (
        <Center>
            <Text> Lobby </Text>
        </Center>
    );
}