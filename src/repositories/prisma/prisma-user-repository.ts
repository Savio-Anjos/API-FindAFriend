import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UsersRepository {
  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
