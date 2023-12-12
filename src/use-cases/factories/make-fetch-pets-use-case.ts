import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FilterPetsUseCase } from "../filter-pets";

export function makeFilterPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new FilterPetsUseCase(petsRepository);

  return useCase;
}
