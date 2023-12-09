import { InMemoryOrganizationRepository } from "../repositories/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city";
import { GetPetDetailsUseCase } from "./get-pet-details";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let petsRepository: InMemoryPetsRepository;
let organizationRepository: InMemoryOrganizationRepository;
let sut: GetPetDetailsUseCase;

describe("Get pet details Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it("should be able to search the details of a pet", async () => {
    const organization = await organizationRepository.create({
      name: "Organization Test",
      email: "johndoe@example.com",
      password_hash: "123456",
      cep: " 45345000",
      address: "Rua test",
      whatsapp: "73 99999999",
    });

    const petCreated = await petsRepository.create({
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

    const { pet } = await sut.execute({ id: petCreated.id });

    expect(pet).toEqual(expect.objectContaining({ name: "Bobi" }));
  });

  it("shouldn't be able to fetch the details with an inexistant id", async () => {
    await expect(() =>
      sut.execute({ id: "non-existent-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
