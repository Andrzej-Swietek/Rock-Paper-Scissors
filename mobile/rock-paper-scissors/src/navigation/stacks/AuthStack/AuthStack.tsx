import {AuthNavProps, AuthParamList} from "./AuthParamList";
import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {Login} from "screens/Login";
import {Register} from "screens/Register";

interface AuthStackProps { }


const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null
            }}
            initialRouteName="Login"
        >
            <Stack.Screen
                options={{
                    headerTitle: "Sign In"
                }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Sign Up"
                }}
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
};
