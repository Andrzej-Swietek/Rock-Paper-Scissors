import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  user_uuid: string;
  email: string;
}

export interface TokenData {
  token: string;
  is_expired?: boolean;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface ILoginData {
  user: User;
  token: string;
}
