export interface User {
    id: number;
    email: string;
    password?: string;
    firstname: string;
    lastname: string;
    last_session: string;
}


export interface UserTokens {
    access_token: string;
    refresh_token: string;
}