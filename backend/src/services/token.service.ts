import {sign} from "jsonwebtoken";
import {SECRET_KEY} from "@config";

import {DataStoredInToken, TokenData} from "@interfaces/auth.interface";
import {User} from "@interfaces/users.interface";

export default class TokenService {

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { user_uuid: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public async getAccessToken(accessToken: any) {
    // const _accessToken: OAuthAccessToken = await this.oauthToken
    //   .findOne({
    //     accessToken,
    //   })
    //   .populate('user')
    //   .populate('client');
    //
    // if (!_accessToken) {
    //   return false;
    // }
    //
    // return _accessToken;
  }
}
