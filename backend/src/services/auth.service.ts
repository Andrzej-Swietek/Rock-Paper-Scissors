import {compare} from "bcrypt";
// DTO
import {CreateUserDto} from "@dtos/user.dto";

// Exceptions
import {HttpException} from "@exceptions/HttpException";

// Repositories
import UserRepository from "@/repositories/user.repository";
import OauthRepository from "@/repositories/oauth.repository";

// Interfaces
import {User} from "@interfaces/users.interface";
import {ILoginData, TokenData} from "@interfaces/auth.interface";

// Services
import TokenService from "@services/token.service";

// Utils
import {isEmpty} from "@utils/isEmpty";
import userRepository from "@/repositories/user.repository";


export default class AuthService {

  private readonly userRepository: UserRepository = new UserRepository();
  private readonly oauthRepository = new OauthRepository();
  private readonly tokenService = new TokenService();

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No user data was provided");
    const createdUser: User = await this.userRepository.createUser(userData);
    return createdUser;
  }

  public async loginUser(email: string, password: string): Promise<ILoginData> {
    console.log({ password, email });
    if (!email) throw new HttpException(400, 'Invalid request');
    const user: User = await this.userRepository.getUserByEmail(email);

    if (await this.userRepository.comparePasswords(user, password)) throw new HttpException(400, 'Invalid credentials');
    if (!user.isVerified) throw new HttpException(401, 'Your account has not been verified.');

    return {
      user,
      token: await this.tokenService.generateJWT(user),
    };
  }

  public async logout(userData: User) {
    if (isEmpty(userData)) throw new HttpException(400, "User data not found");

    const foundUser: User = await this.userRepository.getUserByEmail(userData.email);

    const isPasswordMatching: boolean = await compare(userData.password, foundUser.password) || userData.password == foundUser.password;
    if (!isPasswordMatching) throw new HttpException(409, "Your password is incorrect");

    // TODO Revoke ones token
    return userData;
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

}
