import { PetsRepository } from "@/repositories/pets-repository";
import { Pet, Prisma } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IFilterPets } from "@/interfaces/filterPets.interface";

interface FilterPetsUseCaseRequest {
  data: IFilterPets;
}

interface FilterPetsUseCaseResponse {
  pets: Prisma.PetUpdateInput[];
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
