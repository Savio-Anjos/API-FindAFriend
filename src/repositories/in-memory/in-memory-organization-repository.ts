import { OrganizationRepository } from "../organization-repository";
import { Prisma } from "@prisma/client";
import { Organization } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: Organization[] = [];

  public async create(
    data: Prisma.OrganizationCreateInput
  ): Promise<Organization> {
    const organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      address: data.address,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(organization);

    return organization;
  }

  public async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email);

    if (!organization) {
      return null;
    }

    return organization;
  }

  public async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id === id);

    if (!organization) {
      return null;
    }

    return organization;
  }
}
