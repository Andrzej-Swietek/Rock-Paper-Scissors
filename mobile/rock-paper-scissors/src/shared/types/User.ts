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