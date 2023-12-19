import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Create pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create pet", async () => {
    const { token, id } = await createAndAuthenticateOrganization(app);

    const response = await request(app.server)
      .post(`/pets/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
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
      });

    expect(response.statusCode).toEqual(201);
  });
});
