import { FastifyInstance } from "fastify";
import { githubAuthentication } from "./github-authentication";

export async function githubRoutes(app: FastifyInstance) {
  app.post("/auth/github", githubAuthentication);
}
