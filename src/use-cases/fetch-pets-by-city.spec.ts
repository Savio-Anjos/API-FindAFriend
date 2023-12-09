import { InMemoryOrganizationRepository } from "../repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let petsRepository: InMemoryPetsRepository;
let organizationRepository: InMemoryOrganizationRepository;
let sut: FetchPetsByCityUseCase;

describe("Fetch pets by city Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new FetchPetsByCityUseCase(petsRepository);
  });

  it("should be able to fetch pets by city", async () => {
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

    const { pets } = await sut.execute({ city: "Jaguaquara" });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Bobi" })]);
  });

  it("shouldn't be able to pick up pets around the non-existent city", async () => {
    await expect(() =>
      sut.execute({ city: "non-existent-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
