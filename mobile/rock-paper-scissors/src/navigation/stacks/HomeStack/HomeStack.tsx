import React, {useLayoutEffect} from 'react';
import {View} from "react-native";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {HomeParamList} from "./HomeParamList";
import {Lobby, Game, BotPick, GameHistory} from "../../../screens";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";

interface HomeStackProps {
    navigation, route
}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({ navigation, route }) => {

    useLayoutEffect( ()=> {
        const routeName = getFocusedRouteNameFromRoute(route);
        if ( routeName === 'Game' )  navigation.setOptions({tabBarStyle: {display: 'none'}});
        else navigation.setOptions({tabBarStyle: {
                position: 'absolute',
                bottom: 15,
                left: 10,
                right: 10,
                elevation: 0,
                backgroundColor: "#ffffff",
                borderRadius: 20,
                height: 90,
            }})
    },[navigation, route] )

    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen name={'Lobby'} component={Lobby} />
            <Stack.Screen name={'Game'} component={Game} />
            <Stack.Screen name={'GameHistory'} component={GameHistory} />
            <Stack.Screen name={'BotPick'} component={BotPick} />
            {/*<Stack.Screen name={'Settings'} component={Settings} />*/}
        </Stack.Navigator>
    )
}
