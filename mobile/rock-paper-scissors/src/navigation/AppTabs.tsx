import React, {ComponentType, useState} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

// Styles
import {PRIMARY} from "shared/styles/colors";

// Navigations Params
import {AppParamList} from "./AppParamList";

// Independent Navigations Stacks
import {HomeStack} from "./stacks/HomeStack/HomeStack";
import {InfoStack} from "./stacks/InfoStack/InfoStack";
import {UserStack} from "navigation/stacks/UserStack/UserStack";

interface AppTabsProps {
}

const Tabs  = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
    type tab = { name: keyof AppParamList, component: ComponentType<any>, icon: keyof typeof AntDesign.glyphMap | any }
    const [ tabs, setTabs ] = useState<tab[]>([
        { name: 'User', component: UserStack, icon: "user" },
        { name: 'Home', component: HomeStack, icon: "gamepad" },
        { name: 'Info', component: InfoStack, icon: "infocirlceo" },
    ])

    return (
        <Tabs.Navigator
            initialRouteName={ 'Home' }
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 15,
                    left: 10,
                    right: 10,
                    elevation: 0,
                    backgroundColor: "#ffffff",
                    borderRadius: 20,
                    height: 90,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = tabs.filter( element => element.name === route.name )[0].icon;
                    if ( route.name === "Home" ) return (<FontAwesome5 name={iconName} size={size} color={color} style={{ textAlignVertical: 'center' }} />)
                    return <AntDesign name={iconName} size={size} color={color} style={{ textAlignVertical: 'center' }} />;
                },
                tabBarActiveTintColor: PRIMARY,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            {
                tabs.map( (tab,i) => (<Tabs.Screen key={i} name={tab.name} component={tab.component}/>))
            }
        </Tabs.Navigator>
    )
}
