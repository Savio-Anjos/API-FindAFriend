import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUserUseCase } from "../authenticate-user";
import { CreateUserUseCase } from "../create-user";

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUserRepository();
  const useCase = new CreateUserUseCase(usersRepository);

  return useCase;
}
