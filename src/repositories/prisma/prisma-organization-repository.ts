import { Organization, Prisma } from "@prisma/client";
import { OrganizationRepository } from "./../organization-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrganizationRepository implements OrganizationRepository {
  public async create(
    data: Prisma.OrganizationCreateInput
  ): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }

  public async findByEmail(email: string): Promise<Organization | null> {
    const organization = prisma.organization.findUnique({
      where: {
        email,
      },
    });

    return organization;
  }

  public async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    });

    return organization;
  }
}
