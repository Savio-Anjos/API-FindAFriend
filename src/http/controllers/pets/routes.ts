import { FastifyInstance } from "fastify";
import { createPet } from "./create-pet";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, createPet);
}
