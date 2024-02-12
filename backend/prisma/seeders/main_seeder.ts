import { PrismaClient } from '@prisma/client'
import Seeder from "./Seeder";
import UserSeeder from "./UserSeeder";
import {User} from "../../src/interfaces/users.interface";

const prisma = new PrismaClient()

async function main() {
  const seeders: Seeder<any>[] = [
    new UserSeeder(prisma, 10, 'user'),
  ]
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
