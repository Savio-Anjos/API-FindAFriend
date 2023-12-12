import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { CreateOrganizationUseCase } from "../create-organization";
import { FetchPetsByCityUseCase } from "../fetch-pets-by-city";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new FetchPetsByCityUseCase(petsRepository);

  return useCase;
}
