import { UsersRepository } from "@/repositories/users-repository";
import { CreateUserUseCase } from "./create-user";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it("should be able to create user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should reate a hash of the password", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
