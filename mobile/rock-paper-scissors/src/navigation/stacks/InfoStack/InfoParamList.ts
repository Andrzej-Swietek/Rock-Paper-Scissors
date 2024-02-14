import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type InfoParamList = {
    about: undefined,
    aboutProject: undefined,
}

export type InfoNavProps<T extends keyof InfoParamList> = {
    navigation: StackNavigationProp<InfoParamList, T>,
    route: RouteProp<InfoParamList, T>
}
