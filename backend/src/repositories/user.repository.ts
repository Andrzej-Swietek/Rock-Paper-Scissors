import Prisma from "@/databases/prisma";
import {User} from "@interfaces/users.interface";
import {CreateUserDto} from "@dtos/user.dto";
import * as crypto from "crypto";
import {SALT} from "@config";
import {compare, hash} from "bcrypt";

class UserRepository {
  private readonly prisma = Prisma.getInstance();

  public async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async findBy(key: keyof User, value: any) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          [key]: value,
        },
      });

      return users;
    } catch (error) {
      throw new Error(`Error finding users by ${key}: ${error.message}`);
    }
  }

  async getUserByUUID(uuid: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async createUser(userInput: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        uuid: crypto.randomUUID(),
        username: userInput.username,
        email: userInput.email,
        password: userInput.password,
        isVerified: true, // TODO: Can be changed when needed
        verificationCode: '',

        userStats: {
          create: {
            rocks: 0,
            papers: 0,
            scissors: 0,
            wins: 0,
            games: 0,
            exp: 0,
            level: 1,
            points: 1,
          },
        },
      },
    });
  }

  public async updateUser(uuid: string, updates: Partial<User>): Promise<User | null> {
    return this.prisma.user.update({
      where: {
        uuid,
      },
      data: updates,
    });
  }

  public async deleteUser(uuid: string): Promise<User | null> {
    return this.prisma.user.delete({
      where: {
        uuid,
      },
    });
  }

  public async comparePasswords(user: User, password: string): Promise<boolean> {
    const isPasswordMatch: boolean = await compare(password, user.password);
    return isPasswordMatch;
  }

  public async getUserProfile(username: string) {
    return this.prisma.userStats.findFirst({
      where: {
        user: {
          username
        }
      }
    })
  }
}

export default UserRepository;
