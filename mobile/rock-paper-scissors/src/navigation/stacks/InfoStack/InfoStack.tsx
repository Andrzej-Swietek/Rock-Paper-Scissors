import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {InfoParamList} from "./InfoParamList";
import {AboutProject} from "screens/AboutProject";
import {Rules} from "screens/Rules";

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
            <Stack.Screen name={'rules'} component={Rules} />
            <Stack.Screen name={'aboutProject'} component={AboutProject} />
        </Stack.Navigator>
    )
}
