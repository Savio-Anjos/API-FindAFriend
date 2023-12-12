import { $Enums } from "@prisma/client";
export interface IFilterPets {
  city?: string;
  neighborhood?: string;
  road?: string;
  number?: number;
  name?: string;
  description?: string;
  age?: number;
  size?: $Enums.Size;
  energy_level?: $Enums.EnergyLevel;
  independence_level?: $Enums.IndependenceLevel;
  environment?: $Enums.Environment;
  created_at?: Date | string;
}
