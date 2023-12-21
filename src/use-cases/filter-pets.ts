import { PetsRepository } from "@/repositories/pets-repository";
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Prisma,
  Size,
} from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FilterPetsUseCaseRequest {
  city?: string;
  neighborhood?: string;
  name?: string;
  age?: number;
  size?: Size;
  energy_level?: EnergyLevel;
  independence_level?: IndependenceLevel;
  environment?: Environment;
}

interface FilterPetsUseCaseResponse {
  pets: Prisma.PetUpdateInput[];
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    neighborhood,
    name,
    age,
    size,
    energy_level,
    independence_level,
    environment,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filterPets(
      city,
      neighborhood,
      name,
      age,
      size,
      energy_level,
      independence_level,
      environment
    );

    if (pets.length === 0) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}
