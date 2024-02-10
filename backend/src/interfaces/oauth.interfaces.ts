import {User} from "@interfaces/users.interface";

export interface OAuthClient {
  user: User;
  clientId: string;
  clientSecret: string;
  // redirectUris: string[];
  // grants: string[];
  redirectUris: string;
  grants: string;
}

export interface OAuthAccessToken {
  user: User;
  client: OAuthClient;
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  scope: string;
}

export interface OAuthCode {
  user: User;
  client: OAuthClient;
  authorizationCode: string;
  expiresAt: Date;
  scope: string;
}
