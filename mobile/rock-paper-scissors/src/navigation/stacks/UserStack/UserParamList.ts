import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type UserParamList = {
    profile: undefined,
    settings: undefined,
}

export type UserNavProps<T extends keyof UserParamList> = {
    navigation: StackNavigationProp<UserParamList, T>,
    route: RouteProp<UserParamList, T>
}
