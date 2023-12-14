import {CreateUserDto} from "@dtos/user.dto";
import {HttpException} from "@exceptions/HttpException";
import {isEmpty} from "@utils/isEmpty";

// Repositories
import UserRepository from "@/repositories/user.repository";
import OauthRepository from "@/repositories/oauth.repository";

export default class AuthService {

  private readonly userRepository: UserRepository = new UserRepository();
  private readonly oauthRepository = new OauthRepository();

  public signup(userData: CreateUserDto) {
    if (isEmpty(userData)) throw new HttpException(400, "No user data was provided");
    const createdUser = this.userRepository.createUser(userData);
    return createdUser;
  }

  public login() {

  }

  public logout() {

  }



}
