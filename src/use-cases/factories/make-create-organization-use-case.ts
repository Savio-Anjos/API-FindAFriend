import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { CreateOrganizationUseCase } from "../create-organization";

export function makeCreateOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository();
  const useCase = new CreateOrganizationUseCase(organizationRepository);

  return useCase;
}
