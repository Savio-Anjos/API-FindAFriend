import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  const { id } = await prisma.organization.create({
    data: {
      name: "Organization test",
      cep: "45345000",
      address: "Rua Jose...",
      whatsapp: "73 998645456",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    },
  });

  const authResponse = await request(app.server)
    .post("/organizations/sessions")
    .send({
      email: "jonhdoe@example.com",
      password: "123456",
    });

  const { token } = authResponse.body;

  return { token, id };
}
