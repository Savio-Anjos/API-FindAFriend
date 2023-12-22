import { Prisma, Pet, $Enums } from "@prisma/client";
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

  public findByCity(city: string): Promise<Pet[]> {
    const pets = this.itens.filter((item) => item.city === city);

    return Promise.resolve(pets);
  }

  public async getPetDetails(id: string): Promise<Pet | null> {
    const pet = this.itens.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  public async delete(id: string): Promise<Pet | null> {
    const pet = this.itens.find((item) => item.id === id);

    if (!pet) return null;

    return pet;
  }

  public async filterPets(
    city?: string,
    neighborhood?: string,
    name?: string,
    age?: number
  ): Promise<Pet[]> {
    const pets = this.itens.filter(
      (item) =>
        item.city === city ||
        item.neighborhood === neighborhood ||
        item.name === name ||
        item.age === age
    );

    return pets;
  }
}
