import React from 'react';
import {Text, View} from "react-native";

// Components
import {Center} from "components/common";
import { InfoNavProps } from 'navigation/stacks/InfoStack/InfoParamList';

interface AboutProjectProps extends InfoNavProps<'aboutProject'> {
}

export const AboutProject: React.FC<AboutProjectProps> = ({ route, navigation }) => {
    return (
        <Center>
            <Text> About the Project </Text>
        </Center>
    )
}
