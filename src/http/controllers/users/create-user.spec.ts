import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create user (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to create user", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
