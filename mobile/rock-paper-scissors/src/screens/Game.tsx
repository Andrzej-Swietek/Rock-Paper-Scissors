import React, {FC} from 'react';
import {View, Text} from "react-native";

// Navigation Params
import {HomeNavProps} from "navigation/stacks/HomeStack/HomeParamList";
import { Center } from "components/common";

interface GameProps extends HomeNavProps<'Game'> {
}

export const Game: FC<GameProps> = ({ navigation, route }: HomeNavProps<'Game'>) => {
    console.log(route.params)
    switch (route.params.mode) {
        // case 'pva':
        //     return (
        //         <GamePvA
        //             navigation={navigation}
        //             route={route}
        //         />
        //     )
        // case 'pvp':
        //     return (
        //         <GamePvP
        //             navigation={navigation}
        //             route={route}
        //         />
        //     )
        default:
            return (
                <Center>
                    <Text> No Such Mode Available </Text>
                </Center>
            )
    }
}