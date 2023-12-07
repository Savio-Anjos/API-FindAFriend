import { hash } from "bcryptjs";
import { InMemoryOrganizationRepository } from "../repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let organizationRepository: InMemoryOrganizationRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Organization Use Case", () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new AuthenticateUseCase(organizationRepository);
  });

  it("should be able to authenticate organization", async () => {
    await organizationRepository.create({
      name: "Organization Test",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
      cep: " 45345000",
      address: "Rua test",
      whatsapp: "73 99999999",
      id: "",
      created_at: new Date(),
    });

    const { organization } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong password", async () => {
    await organizationRepository.create({
      name: "Organization Test",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
      cep: " 45345000",
      address: "Rua test",
      whatsapp: "73 99999999",
      id: "",
      created_at: new Date(),
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
