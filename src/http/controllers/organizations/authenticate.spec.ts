import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate organization", async () => {
    await request(app.server).post("/organizations").send({
      name: "Organization test",
      cep: "45345000",
      address: "Rua Jose...",
      whatsapp: "73 998645456",
      email: "jonhdoe@example.com",
      password: "123456",
    });

    const response = await request(app.server)
      .post("/organizations/sessions")
      .send({
        email: "jonhdoe@example.com",
        password: "123456",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
