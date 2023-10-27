import React, {ReactChild, ReactChildren} from "react";
import {View} from "react-native";
import {LIGHT} from "shared/styles";

interface CenterProps {
    children: JSX.Element | JSX.Element[]
}

export const Center: React.FC<CenterProps> = ({children}) => {
    return (
    <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // borderStyle: 'solid', borderWidth: 2, borderColor: 'red',
            backgroundColor: LIGHT
        }}
    >
        { children }
    </View>
  )
}
