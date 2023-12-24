import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/organizations", create);
  app.post("/organizations/sessions", authenticate);
}
