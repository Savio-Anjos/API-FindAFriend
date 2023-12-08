import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public itens: Pet[] = [];

  public async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      road: data.road,
      number: data.number,
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      created_at: new Date(),
      organization_id: data.organization_id,
    };

    this.itens.push(pet);

    return pet;
  }
}
