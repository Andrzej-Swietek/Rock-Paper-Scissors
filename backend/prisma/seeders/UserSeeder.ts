import Seeder from "./Seeder";
import {User} from "../../src/interfaces/users.interface";
import * as crypto from "crypto";

export default class UserSeeder extends Seeder<User> {
  create(): Promise<Partial<User>> {
    const uuid = crypto.randomUUID();
    const user: User = {
      email: `test.user-${uuid}@example.com`,
      username: `test.user-${uuid}`,
      uuid: `${uuid}`,
      verificationCode: crypto.randomUUID(),
      verifiedAt: `${Date.now()}`,
      password: 'zaq1@WSX',
      isVerified: true,
    }
    return Promise.resolve(user);
  }

}
