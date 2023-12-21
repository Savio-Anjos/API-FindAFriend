import { PetsRepository } from "@/repositories/pets-repository";
import { Pet, Prisma } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IFilterPets } from "@/interfaces/filterPets.interface";

interface FilterPetsUseCaseRequest {
  filter: string;
}

interface FilterPetsUseCaseResponse {
  pets: Prisma.PetUpdateInput[];
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    filter,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filterPets(filter);

    if (pets.length === 0) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}
