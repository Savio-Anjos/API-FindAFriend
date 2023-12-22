import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate user (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to authenticate user", async () => {
    await prisma.user.create({
      data: {
        name: "John Doe",
        email: "jonhdoe@example.com",
        password_hash: await hash("123456", 6),
      },
    });

    const response = await request(app.server).post("/users/sessions").send({
      email: "jonhdoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
