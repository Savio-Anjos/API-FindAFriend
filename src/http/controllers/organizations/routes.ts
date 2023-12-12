import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/organizations", create);
}
