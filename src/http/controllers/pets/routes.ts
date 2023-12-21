import { FastifyInstance } from "fastify";
import { createPet } from "./create-pet";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { fetchPetsByCity } from "./fetch-pets-by-city";
import { filterPets } from "./filter-pets";
import { getPetDatails } from "./get-pet-details";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets/:organizationId", { onRequest: [verifyJWT] }, createPet);
  app.get("/pets/city/:city", { onRequest: [verifyJWT] }, fetchPetsByCity);
  app.get("/pets/filter", { onRequest: [verifyJWT] }, filterPets);
  app.get("/pets/details/:id", { onRequest: [verifyJWT] }, getPetDatails);
}
