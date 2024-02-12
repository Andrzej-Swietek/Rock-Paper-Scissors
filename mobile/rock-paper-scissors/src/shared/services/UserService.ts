import axios from "shared/libs/axios";
import {Token, User, UserStats} from "shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserCredentials {
    email?: string;
    username: string;
    password: string;
}

export interface UserProfileResponse {
    user: {
        uuid: string,
        username: string,
        email: string,
        password: string,
        verificationCode?: string,
        verifiedAt?: string|null,
        isVerified: boolean
    },
    profile: {
        id: number,
        userId: string,
        rocks: number,
        papers: number,
        scissors: number,
        wins: number,
        games: number,
        points: number,
        level: number,
        exp: number
    }
}

export class UserService {

    public static validateUsername(username: string): boolean { return true }

    public static async createUser(user: UserCredentials) {
        const response = await axios.post<User>(`/auth/register`, user)
        const data = response.data;
        return data;
    }

    public static async login(user: UserCredentials) {
        const response = await axios.post<{user: User}&Token>(`/auth/login`, {
            username: user.username,
            password: user.password
        });
        const data = response.data;

        // Setting token for requests
        await AsyncStorage.setItem('access_token', data.token);

        return data;
    }

    public static async logout(uuid: string) {
        const response = await axios.post(`/auth/logout`, {
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

    public static async getUserProfile(username: string): Promise<UserProfileResponse> {
        const response = await axios.get<{data: UserProfileResponse}>(`/user/profile/${username}`);
        const data = response.data;
        return data.data as UserProfileResponse;
    }

    public static async getUserStats(username: string): Promise<UserStats> {
        const response = await axios.get<{data: { user: User, profile: UserStats }}>(`/user/stats/${username}`);
        const data = response.data;
        return data.data.profile;
    }
}