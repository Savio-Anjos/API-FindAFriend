import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FilterPetsUseCaseRequest {
  data: Pet;
}

interface FilterPetsUseCaseResponse {
  pets: Pet[];
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    data,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filterPets(data);

    if (pets.length === 0) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}
