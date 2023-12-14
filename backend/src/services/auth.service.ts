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
import {TokenData} from "@interfaces/auth.interface";

// Services
import TokenService from "@services/token.service";

// Utils
import {isEmpty} from "@utils/isEmpty";


export default class AuthService {

  private readonly userRepository: UserRepository = new UserRepository();
  private readonly oauthRepository = new OauthRepository();

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No user data was provided");
    const createdUser: User = await this.userRepository.createUser(userData);
    return createdUser;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; foundUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "User data not found");
    const foundUser: User = await this.userRepository.getUserByEmail(userData.email);
    if (!foundUser) throw new HttpException(409, `Your email: ${userData.email} not found`);


    const isPasswordMatching: boolean = await compare(userData.password, foundUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Your password is incorrect");


    const tokenData: TokenData = TokenService.createToken(foundUser);
    const cookie: string = this.createCookie(tokenData);

    return { cookie, foundUser };
  }

  public async logout(userData: User) {
    if (isEmpty(userData)) throw new HttpException(400, "User data not found");

    const foundUser: User = await this.userRepository.getUserByEmail(userData.email);

    const isPasswordMatching: boolean = await compare(userData.password, foundUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Your password is incorrect");

    // TODO Revoke ones token
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }


}
