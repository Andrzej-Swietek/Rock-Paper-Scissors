import {useIsFocused} from "@react-navigation/core";
import { JSX } from "react";
import {StatusBar, StatusBarProps} from "react-native";

export const FocusAwareStatusBar = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<StatusBar> & Readonly<StatusBarProps>) => {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}