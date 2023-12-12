import axios from "shared/libs/axios";
import {Token, User} from "shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserCredentials {
    email?: string;
    username: string;
    password: string;
}

export class UserService {

    public static validateUsername(username: string): boolean { return true }

    public static async createUser(user: UserCredentials) {
        const response = await axios.post<User>(`/register`, user)
        const data = response.data;
        return data;
    }

    public static async login(user: UserCredentials) {
        const response = await axios.post<User&Token>(`/login`, {
            username: user.username,
            password: user.password
        });
        const data = response.data;

        // Setting token for requests
        await AsyncStorage.setItem('access_token', data.access_token);

        return data;
    }

    public static async logout(uuid: string) {
        const response = await axios.post(`/logout`, {
            uuid: uuid
        });
        const data = response.data;
        return data;
    }

    public static async updateUser(user: UserCredentials|User) {
        const response = await axios.post(`/update-user`, {
           ...user
        });
        const data = response.data;
        return data;
    }


}