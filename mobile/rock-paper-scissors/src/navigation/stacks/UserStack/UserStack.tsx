import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {UserParamList} from "./UserParamList";

// Screens
import {About} from "screens/About";
import {Settings} from "screens/Settings";
import {Profile} from "screens/Profile";

interface UserStackProps {
}

const Stack = createStackNavigator<UserParamList>();

export const UserStack: React.FC<UserStackProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen name={'profile'} component={Profile} />
            <Stack.Screen name={'settings'} component={Settings} />
        </Stack.Navigator>
    )
}
