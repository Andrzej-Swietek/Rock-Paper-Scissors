import Prisma from "@/databases/prisma";
import {Token} from "@prisma/client";

export default class TokenRepository {
  private readonly prisma = Prisma.getInstance();


  public getToken(token: string) {
    return this.prisma.token.findMany({
      where: {
        token: token,
      },
    })[0];
  }

  public getUserTokens(userUUID: string) {
    return this.prisma.token.findMany({
      where: {
        userId: userUUID
      },
    });
  }

  public createToken(userId: string, jwtToken: string) {
    return this.prisma.token.create({
      data: {
        userId,
        token: jwtToken,
        is_revoked: false
      }
    });
  }

  public revokeToken(token: string) {
    return this.prisma.token.updateMany({
      where: {
        token: token,
      },
      data: {
        is_revoked: true
      },
    });
  }

  public revokeUsersTokens(uuid: string) {
    return this.prisma.token.updateMany({
      where: {
        userId: uuid,
      },
      data: {
        is_revoked: true
      },
    });
  }

}
