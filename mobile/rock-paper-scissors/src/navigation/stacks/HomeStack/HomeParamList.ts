import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type HomeParamList = {
    Lobby: undefined;
    Game: {
        mode: 'pva' | 'pvp' | 'online' | 'pve',
    };
    GameQueue: {
        mode: 'PvE' | 'PvP' | '2 vs 2',
        roomAction: 'join' | 'create'
    }
    Settings: undefined;
}

export type HomeNavProps<T extends keyof HomeParamList> = {
    navigation: StackNavigationProp<HomeParamList, T>,
    route: RouteProp<HomeParamList, T>
}
