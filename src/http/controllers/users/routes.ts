import { FastifyInstance } from "fastify";
import { createUser } from "./create-user";
import { authenticateUser } from "./authenticate-user";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUser);
  app.post("/users/sessions", authenticateUser);
}
