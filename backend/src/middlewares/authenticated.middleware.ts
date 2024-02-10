import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';

import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import {User} from "@interfaces/users.interface";

import UserRepository from "@/repositories/user.repository";
import TokenRepository from "@/repositories/token.repository";

const authenticatedMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (!Authorization)
      throw new HttpException(404, 'Authentication token missing');

    // Token Validity
    const secretKey: string = SECRET_KEY;
    const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
    const userUuid = verificationResponse.user_uuid;
    console.log(verificationResponse, userUuid)

    // Token Validity (Expired / Revoked)
    const tokenRepository = new TokenRepository();
    const token = await tokenRepository.getToken(Authorization);
    if (!token || token.is_revoked)
      throw new HttpException(401, 'Authentication token revoked or expired');


    // User Validity
    const userRepository = new UserRepository();
    const user: User = await userRepository.getUserByUUID(userUuid)
    if (!user)
      throw new HttpException(401, 'User not found');


    req.user = user;
    next();

  } catch (error) {
    next(error instanceof HttpException ? error : new HttpException(401, 'Wrong authentication token'));
  }
};

export default authenticatedMiddleware;
