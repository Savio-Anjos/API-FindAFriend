import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
  Prisma,
  Size,
} from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findByCity(city: string): Promise<Pet[]>;
  getPetDetails(id: string): Promise<Pet | null>;
  delete(id: string): Promise<Pet | null>;
  filterPets(
    city?: string,
    neighborhood?: string,
    name?: string,
    age?: number,
    size?: Size,
    energyLevel?: EnergyLevel,
    independenceLevel?: IndependenceLevel,
    environment?: Environment
  ): Promise<Pet[]>;
}
