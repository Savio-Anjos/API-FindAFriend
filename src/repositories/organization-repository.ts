import { Prisma, Organization } from "@prisma/client";

export interface OrganizationRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
}
