import { InMemoryOrganizationRepository } from "../repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./create-pet";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let petsRepository: InMemoryPetsRepository;
let organizationRepository: InMemoryOrganizationRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new CreatePetUseCase(petsRepository, organizationRepository);
  });

  it("should be able to create pet", async () => {
    const organization = await organizationRepository.create({
      name: "Organization Test",
      email: "johndoe@example.com",
      password_hash: "123456",
      cep: " 45345000",
      address: "Rua test",
      whatsapp: "73 99999999",
    });

    const { pet } = await sut.execute({
      state: "BA",
      city: "Jaguaquara",
      neighborhood: "São Jorge",
      road: "Professora Carmem",
      number: 122,
      name: "Bobi",
      description: "Bob é um...",
      age: 3,
      size: "AVERAGE",
      energy_level: "HIGH",
      independence_level: "LOW",
      environment: "CLOSED",
      organization_id: organization.id,
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be possible to register with a non-existent organization", async () => {
    await expect(() =>
      sut.execute({
        state: "BA",
        city: "Jaguaquara",
        neighborhood: "São Jorge",
        road: "Professora Carmem",
        number: 122,
        name: "Bobi",
        description: "Bob é um...",
        age: 3,
        size: "AVERAGE",
        energy_level: "HIGH",
        independence_level: "LOW",
        environment: "CLOSED",
        organization_id: "non-existent id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
