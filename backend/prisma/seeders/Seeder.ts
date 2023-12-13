import {PrismaClient} from "@prisma/client";

export default abstract class Seeder<T>{
  private readonly count: number;
  private readonly entityName: string;

  public constructor(
    private prisma: PrismaClient,
    count: number,
    entityName: string
  ) {
    this.count = count;
    this.entityName = entityName;
  }

  /**
   * Method That Provides mock object of desired type
   */
  abstract create(): Promise<Partial<T>>;

  /**
   * Method used for DB population with mock data
   */
  async seed(): Promise<void> {
    for (let i = 0; i < this.count; i++) {
      const entity = await this.create();
      await this.prisma.$transaction([this.prisma[this.entityName].create({ data: entity })]);
    }
  }

  /**
   * Method that removes all elements from table in DB
   */
  async clearTable(): Promise<void> {
    await this.prisma[this.entityName].deleteMany({});
  }
}
