
export interface UserCredentials {
    email?: string;
    username: string;
    password: string;
}

export class UserService {

    public static validateUsername(username: string): boolean { return true }

    public static async createUser(user: UserCredentials) { }

    public static async login(user: UserCredentials) { }

    public static async logout(user: UserCredentials) { }

    public static async updateUser(user: UserCredentials) {
    }

    public static async updateScore(){
    }

}