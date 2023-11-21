
export interface UserCredentials {
    email?: string;
    username: string;
    password: string;
}

export class UserService {

    public static validateUsername(username: string): boolean { return true }

    public static createUser(user: UserCredentials) { }

    public static login(user: UserCredentials) { }

    public static logout(user: UserCredentials) { }

    public static updateUser(user: UserCredentials) {
    }

    public static async updateScore(){
    }

}