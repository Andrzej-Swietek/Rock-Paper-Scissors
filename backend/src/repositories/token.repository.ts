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
}
