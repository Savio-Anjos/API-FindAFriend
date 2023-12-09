import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchPetsByCityUseCaseRequest {
  city: string;
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity(city);

    if (pets.length === 0) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}
