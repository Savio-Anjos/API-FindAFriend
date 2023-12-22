import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization";
import { prisma } from "@/lib/prisma";

describe("Delete pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete pet", async () => {
    const { token, id: organization_id } =
      await createAndAuthenticateOrganization(app);

    const { id } = await prisma.pet.create({
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
        organization_id: organization_id,
      },
    });

    const response = await request(app.server)
      .delete(`/pets/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });
});
