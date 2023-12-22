import {
  Prisma,
  Pet,
  Size,
  EnergyLevel,
  IndependenceLevel,
  Environment,
  $Enums,
} from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  public async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  public async findByCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
    });

    return pets;
  }

  public async getPetDetails(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  public async delete(id: string): Promise<Pet | null> {
    const pet = prisma.pet.delete({
      where: {
        id,
      },
    });

    return pet;
  }

  public async filterPets(
    city?: string,
    neighborhood?: string,
    name?: string,
    age?: number,
    size?: Size,
    energyLevel?: EnergyLevel,
    independenceLevel?: IndependenceLevel,
    environment?: Environment
  ): Promise<Pet[]> {
    const filterConditions: Record<string, unknown>[] = [];

    const addCondition = (key: string, value?: unknown) => {
      if (value) {
        filterConditions.push({ [key]: value });
      }
    };

    addCondition("city", city);
    addCondition("neighborhood", neighborhood);
    addCondition("name", name);
    addCondition("age", age);
    addCondition("size", size);
    addCondition("energy_level", energyLevel);
    addCondition("independence_level", independenceLevel);
    addCondition("environment", environment);

    const pets = await prisma.pet.findMany({
      where: {
        OR: filterConditions,
      },
    });

    return pets;
  }
}
