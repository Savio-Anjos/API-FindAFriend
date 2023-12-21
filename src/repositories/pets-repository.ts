import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findByCity(city: string): Promise<Pet[]>;
  getPetDetails(id: string): Promise<Pet | null>;
  filterPets(filter: string): Promise<Pet[]>;
}
