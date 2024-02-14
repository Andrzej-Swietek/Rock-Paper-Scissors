import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {InfoParamList} from "./InfoParamList";
import {AboutProject} from "screens/AboutProject";
import {About} from "screens/About";

interface InfoStackProps {
}

const Stack = createStackNavigator<InfoParamList>();
export const InfoStack: React.FC<InfoStackProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen name={'about'} component={About} />
            <Stack.Screen name={'aboutProject'} component={AboutProject} />
        </Stack.Navigator>
    )
}
