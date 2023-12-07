import { Prisma, Organization } from "@prisma/client";

export interface OrganizationRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  findByEmail(email: string): Promise<Organization | null>;
  findById(id: string): Promise<Organization | null>;
}
