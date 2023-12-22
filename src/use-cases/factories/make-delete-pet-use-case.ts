import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { DeletePetUseCase } from "../delete-pet";

export function makeDeletePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new DeletePetUseCase(petsRepository);

  return useCase;
}
