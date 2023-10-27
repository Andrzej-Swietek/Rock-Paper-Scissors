import React from 'react';
import {FlexAlignType, View} from "react-native";

interface RowProps {
    flex?: {
        justifyContent?:  "flex-start" | "flex-end" | "center" | "space-between" | "space-around",
        alignItems?: FlexAlignType
    },
    children: React.ReactNode
}

export const Row: React.FC<RowProps> = ({flex,children}) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: flex?.justifyContent ? flex?.justifyContent : 'center', alignItems: flex?.alignItems ? flex?.alignItems : 'center' }}>
            {
                children
            }
        </View>
    )
}
