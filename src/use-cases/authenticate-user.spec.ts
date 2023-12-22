import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUseCase;

describe("Authenticate User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUseCase(usersRepository);
  });

  it("should be able to authenticate user", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "jonhdoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(async () => {
      await sut.execute({
        email: "jonhdoe@example.com",
        password: "123123",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with a non-existent user", async () => {
    expect(async () => {
      await sut.execute({
        email: "jonhdoe@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
