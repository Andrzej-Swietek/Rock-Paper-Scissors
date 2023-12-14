import Prisma from "@/databases/prisma";
import {User} from "@interfaces/users.interface";

export default class OauthRepository {
  private readonly prisma = Prisma.getInstance();

  public async getAuthorizationCode(code: string) {
    return this.prisma.oAuthCode.findFirst({
      where: {
        authorizationCode: code,
      },
      include: {
        user: true,
        client: true,
      }
    });
  }

  public async getAccessToken(accessToken: any) {
    try {
      const _accessToken = await this.prisma.oAuthAccessToken.findFirst({
        where: {
          accessToken,
        },
        include: {
          user: true,
          client: true,
        },
      });

      return _accessToken;
    } catch (error) {
      console.error(`Error retrieving access token: ${error.message}`);
      // Handle the error appropriately (logging, throwing, etc.)
      return null;
    }
  }

  public async getClient(clientId: string, clientSecret?: string) {
    const params: {
      clientId: string;
      clientSecret?: string;
    } = {
      clientId,
    };

    if (clientSecret) {
      params.clientSecret = clientSecret;
    }
    return this.prisma.oAuthClient.findFirst({ where: params });
  }


  public async refreshTokenModel(refreshToken: string) {
    return this.prisma.oAuthAccessToken.findFirst({
      where: { refreshToken },
      include: { user: true, client: true }
    });
  }

  public async saveToken(token, client, user: User) {
    const accessToken = await this.prisma.oAuthAccessToken.create({
      data: {
        user: { connect: { uuid: user.uuid } }, // connect to the existing user
        client: { connect: { id: client.id } }, // connect to the existing client
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        scope: token.scope,
      },
    });

    return accessToken;
  }

  // ========== Revokes ==========

  public async revokeToken(accessToken: string): Promise<boolean> {
    const deleteResult = await this.prisma.oAuthAccessToken.deleteMany({
      where: {
        accessToken: accessToken,
      },
    });

    return deleteResult.count > 0;
  }

  public async revokeAuthorizationCode(code: string): Promise<boolean> {

      const deleteResult = await this.prisma.oAuthCode.deleteMany({
        where: {
          authorizationCode: code,
        },
      });

      return deleteResult.count > 0;
  }


}
