import { hash } from 'bcrypt';

// Interfaces
import {User} from "@interfaces/users.interface";

// Exceptions
import {HttpException} from "@exceptions/HttpException";

// DTO
import {CreateUserDto} from "@dtos/user.dto";

// Utils
import { isEmpty } from '@utils/isEmpty';

// Repositories
import UserRepository from "@/repositories/user.repository";

export default class UserService {

  private readonly userRepository: UserRepository = new UserRepository();

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.userRepository.getAllUsers()
    return users || [];
  }

  public async findUserByUUID(uuid: string): Promise<User|null> {
    if (isEmpty(uuid)) throw new HttpException(400, "Missing uuid attribute");

    const user: User = await this.userRepository.getUserByUUID(uuid)
    return user;
  }

  public async findUserByEmail(email: string): Promise<User> {
    if (isEmpty(email)) throw new HttpException(400, "Missing email attribute");

    const user: User = await this.userRepository.getUserByEmail(email)
    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No Required Data Attributes");

    const findUser: User = await this.userRepository.getUserByEmail(userData.email)
    if (findUser)
      throw new HttpException(409, `Your email ${userData.email} already taken`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.userRepository.createUser({ ...userData, password: hashedPassword })

    return createUserData;
  }

  public async editUser() {

  }

  public async deleteUser(uuid: string): Promise<User> {
    const deletedUser: User = await this.userRepository.deleteUser(uuid)
    if (!deletedUser) throw new HttpException(409, "Unable to delete user");

    return deletedUser;
  }

  public async verifyUser(uuid: string): Promise<User> {
    if (isEmpty(uuid)) throw new HttpException(400, "Missing uuid attribute");

    const findUser = await this.userRepository.getUserByUUID(uuid);
    if (!findUser) throw new HttpException(400, "User not found");

    const newUser: User = await this.userRepository.updateUser(uuid, {
      isVerified: true
    })

    return newUser;
  }
}
