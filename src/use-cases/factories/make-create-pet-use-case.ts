import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../create-pet";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const organizationRepository = new PrismaOrganizationRepository();
  const useCase = new CreatePetUseCase(petsRepository, organizationRepository);

  return useCase;
}
