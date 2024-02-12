import {UserStats} from "shared/types/UserStats";

export type User = {
    uuid?: string;
    username: string,
    points: number,
    gamesPlayed: number,
    level: number,
    exp: number
}

export type Token =  {
    token: string
}

export type UserProfile = {
    user: User,
    profile: UserStats
}