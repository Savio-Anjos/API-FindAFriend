import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeletePetUseCaseRequest {
  id: string;
}

interface DeletePetUseCaseResponse {
  pet: Pet;
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute({
    id,
  }: DeletePetUseCaseRequest): Promise<DeletePetUseCaseResponse> {
    const pet = await this.petsRepository.delete(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
