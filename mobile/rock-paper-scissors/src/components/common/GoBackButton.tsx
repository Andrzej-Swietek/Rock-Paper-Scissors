import React from 'react';
import {TouchableOpacity} from "react-native";
import {boxShadow, flex, PRIMARY} from "shared/styles";
import {FontAwesome5} from "@expo/vector-icons";
import {StackNavigationProp} from "@react-navigation/stack";

interface GoBackButtonProps {
    navigation: StackNavigationProp<any>
}

export const GoBackButton: React.FC<GoBackButtonProps> = ({navigation}) => {
    return (
        <TouchableOpacity style={{ position: 'absolute', zIndex: 10,  top: 50, left: 10 ,borderRadius: 100, height: 80, width: 80, backgroundColor: PRIMARY, ...flex('row', 'nowrap', 'center', 'center'), ...boxShadow('#000000d3') }} onPress={()=> navigation.goBack()} >
            <FontAwesome5 name={'arrow-left'} size={24} color={'#fff'} style={{ textAlignVertical: 'center' }} />
        </TouchableOpacity>
    )
}
