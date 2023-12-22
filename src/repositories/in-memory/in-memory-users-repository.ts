import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public itens: User[] = [];

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.itens.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.itens.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
