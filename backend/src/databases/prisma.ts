import { PrismaClient } from '@prisma/client';

class Prisma {
  private static prisma: PrismaClient;

  private constructor() {}

  public static isInitialized(): boolean {
    return Prisma.prisma !== undefined;
  }

  public static getInstance(): PrismaClient {
    if (!Prisma.isInitialized()) {
      Prisma.prisma = new PrismaClient();
    }

    return Prisma.prisma;
  }


}

export default Prisma;
