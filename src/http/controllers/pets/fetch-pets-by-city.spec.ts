import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization";
import { prisma } from "@/lib/prisma";

describe("Fetch Pets By City (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch pets by city", async () => {
    const { token, id } = await createAndAuthenticateOrganization(app);

    console.log(id);

    const { city } = await prisma.pet.create({
      data: {
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
        organization_id: id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/city/${city}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });
});
