import {sign} from "jsonwebtoken";
import {SECRET_KEY} from "@config";

// Interfaces
import {DataStoredInToken, TokenData} from "@interfaces/auth.interface";
import {User} from "@interfaces/users.interface";
import OauthRepository from "@/repositories/oauth.repository";

export default class TokenService {

  private oauthRepository = new OauthRepository();

  public static createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { user_uuid: user.uuid };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public async getAccessToken(accessToken: any) {
    return await this.oauthRepository.getAccessToken(accessToken);
  }

  public async revokeToken(accessToken: string): Promise<boolean> {
    return await this.oauthRepository.revokeToken(accessToken);
  }

  public async revokeAuthorizationCode(code: string): Promise<boolean> {
    return await this.oauthRepository.revokeAuthorizationCode(code);
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
    return await this.oauthRepository.getClient(params.clientId, params.clientSecret)
  }
}
