import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from "react-native";
import {useFonts} from "expo-font";
import * as Font from "expo-font";

// Styles
import {PRIMARY} from "shared/styles/colors";

// Components
import {Center} from "components/common/Center";

interface FontsLoaderProps {
    children
}

export const FontsLoader: React.FC<FontsLoaderProps> = ({ children }) => {
    let [fontsLoaded] = useFonts({
        'Roboto-Regular': require('../../../assets/fonts/Roboto/Roboto-Regular.ttf'),
        'Roboto-Thin': require('../../../assets/fonts/Roboto/Roboto-Thin.ttf'),
        'Roboto-Light': require('../../../assets/fonts/Roboto/Roboto-Light.ttf'),
        'Roboto-Bold': require('../../../assets/fonts/Roboto/Roboto-Bold.ttf'),
    });

    return (
        <>
            {
                fontsLoaded ? children : (<Center><ActivityIndicator size="large" color={ PRIMARY } /></Center>)
            }
        </>
    )
}
