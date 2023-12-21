import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization";
import { prisma } from "@/lib/prisma";

describe("Filter pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to filter pets", async () => {
    const { token, id } = await createAndAuthenticateOrganization(app);

    await prisma.pet.create({
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
      .get("/pets/filter")
      .set("Authorization", `Bearer ${token}`)
      .query({
        name: "Bobi",
      });

    expect(response.statusCode).toEqual(200);
  });
});
