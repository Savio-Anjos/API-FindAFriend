import { OrganizationRepository } from "@/repositories/organization-repository";
import { Organization } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface OrganizationUseCaseRequest {
  email: string;

  password: string;
}

interface OrganizationUseCaseResponse {
  organization: Organization;
}

export class OrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    email,
    password,
  }: OrganizationUseCaseRequest): Promise<OrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash
    );

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      organization,
    };
  }
}
