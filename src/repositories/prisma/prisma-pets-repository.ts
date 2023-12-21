import { Prisma, $Enums, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";
import { object } from "zod";
import { IFilterPets } from "@/interfaces/filterPets.interface";

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

  public async filterPets(filter: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          { city: { contains: filter } },
          { neighborhood: { contains: filter } },
          { name: { contains: filter } },
        ],
      },
    });

    return pets;
  }
}
