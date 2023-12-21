import { InMemoryOrganizationRepository } from "../repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { FilterPetsUseCase } from "./filter-pets";

let petsRepository: InMemoryPetsRepository;
let organizationRepository: InMemoryOrganizationRepository;
let sut: FilterPetsUseCase;

describe("Filter pets Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new FilterPetsUseCase(petsRepository);
  });

  it("should be able to filter pets", async () => {
    const organization = await organizationRepository.create({
      name: "Organization Test",
      email: "johndoe@example.com",
      password_hash: "123456",
      cep: " 45345000",
      address: "Rua test",
      whatsapp: "73 99999999",
    });

    await petsRepository.create({
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

    await petsRepository.create({
      state: "BA",
      city: "Jaguaquara",
      neighborhood: "São Jorge",
      road: "Professora Carmem",
      number: 122,
      name: "Tobi",
      description: "Tob é um...",
      age: 3,
      size: "AVERAGE",
      energy_level: "HIGH",
      independence_level: "LOW",
      environment: "CLOSED",
      organization_id: organization.id,
    });
    ("");

    const { pets } = await sut.execute({ name: "Bobi", city: "Jaguaquara" });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Bobi" }),
      expect.objectContaining({ name: "Tobi" }),
    ]);
  });

  it("should not be able to filter pets with non-existent filters", async () => {
    const organization = await organizationRepository.create({
      name: "Organization Test",
      email: "johndoe@example.com",
      password_hash: "123456",
      cep: " 45345000",
      address: "Rua test",
      whatsapp: "73 99999999",
    });

    await petsRepository.create({
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

    await expect(() =>
      sut.execute({ name: "non-existent filter" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to filter pets with non-existent data", async () => {
    await expect(() =>
      sut.execute({ name: "non-existent filter" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
