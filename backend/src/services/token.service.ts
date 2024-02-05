import jwt, {sign} from "jsonwebtoken";
import {JWT_SECRET, SECRET_KEY} from "@config";

// Interfaces
import {DataStoredInToken, TokenData} from "@interfaces/auth.interface";
import {User} from "@interfaces/users.interface";
import OauthRepository from "@/repositories/oauth.repository";
import TokenRepository from "@/repositories/token.repository";
import {Token} from "@prisma/client";

export default class TokenService {

  private oauthRepository = new OauthRepository();
  private tokenRepository = new TokenRepository();

  public static createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { user_uuid: user.uuid, email: user.email };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public async getToken(token : string): Promise<Token> {
    return this.tokenRepository.getToken(token);
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

  public async generateJWT(user: User) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    const payload = {
      user_uuid: user.uuid,
      email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: parseInt((expirationDate.getTime() / 1000) as any as string, 10),
    });
  }
}
