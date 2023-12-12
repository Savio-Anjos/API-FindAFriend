import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const organizationRepository = new PrismaOrganizationRepository();
  const useCase = new AuthenticateUseCase(organizationRepository);

  return useCase;
}
