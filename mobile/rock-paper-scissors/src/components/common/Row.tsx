import React from 'react';
import {FlexAlignType, View} from "react-native";

interface RowProps {
    flex?: {
        justifyContent?:  "flex-start" | "flex-end" | "center" | "space-between" | "space-around",
        alignItems?: FlexAlignType
    },
    customStyle?: any;
    gap?: number;
    children: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({flex, gap=0,children, customStyle={}}) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: flex?.justifyContent ? flex?.justifyContent : 'center',
            alignItems: flex?.alignItems ? flex?.alignItems : 'center',
            gap,
            ...customStyle
        }}>
            {
                children
            }
        </View>
    )
}
