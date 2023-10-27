import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type InfoParamList = {
    rules: undefined,
    aboutProject: undefined,
}

export type InfoNavProps<T extends keyof InfoParamList> = {
    navigation: StackNavigationProp<InfoParamList, T>,
    route: RouteProp<InfoParamList, T>
}
