// Interfaces
import {User} from "@interfaces/users.interface";

// Exceptions
import {HttpException} from "@exceptions/HttpException";

// DTO
import {CreateUserDto} from "@dtos/user.dto";

// Utils
import { isEmpty } from '@utils/isEmpty';

export default class UserService {

  public async findAllUser(): Promise<User[]> {
    // const users: User[] = await this.users.find();
    // return users;
    return [];
  }

  public async findUserByUUID(uuid: string) {
    if (isEmpty(uuid)) throw new HttpException(400, "Missing uuid attribute");

  }

  public async findUserByEmail(email: string) {
    if (isEmpty(email)) throw new HttpException(400, "Missing email attribute");
    // const user: User = await this.users.findOne({ email });
    // return user;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No Required Data Attributes");

    // const findUser: User = await this.users.findOne({ email: userData.email });
    // if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
    //
    // const hashedPassword = await hash(userData.password, 10);
    // const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
    //
    // return createUserData;
    return;
  }

  public async editUser() {

  }

  public async deleteUser() {
    // const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    // if (!deleteUserById) throw new HttpException(409, "You're not user");
    //
    // return deleteUserById;
  }


}
