import {sign} from "jsonwebtoken";
import {SECRET_KEY} from "@config";

// Interfaces
import {DataStoredInToken, TokenData} from "@interfaces/auth.interface";
import {User} from "@interfaces/users.interface";

export default class TokenService {

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { user_uuid: user.uuid };
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

  public async revokeToken(accessToken: string) {
    // const deleteResult = await this.oauthToken.deleteOne({
    //   accessToken: accessToken,
    // });

    // return deleteResult.deletedCount > 0;
  }

  public async revokeAuthrizationCode(code: string) {
    // const deleteResult = await this.oauthCode.deleteOne({
    //   authorizationCode: code,
    // });

    // return deleteResult.deletedCount > 0;
  }

  public async getClient(clientId: any, clientSecret: string) {
    const params: {
      clientId: string;
      clientSecret?: string;
    } = {
      clientId,
    };
    if (clientSecret) {
      params.clientSecret = clientSecret;
    }
    // return this.oauthClient.findOne(params);
  }
}
