import { OrganizationRepository } from "@/repositories/organization-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
  Size,
} from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetUseCaseRequest {
  state: string;
  city: string;
  neighborhood: string;
  road: string;
  number: number;
  name: string;
  description: string;
  age: number;
  size: Size;
  energy_level: EnergyLevel;
  independence_level: IndependenceLevel;
  environment: Environment;
  organization_id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationRepository: OrganizationRepository
  ) {}

  async execute({
    state,
    city,
    neighborhood,
    road,
    number,
    name,
    description,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    organization_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization = await this.organizationRepository.findById(
      organization_id
    );

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      state,
      city,
      neighborhood,
      road,
      number,
      name,
      description,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      organization_id,
    });

    return {
      pet,
    };
  }
}
