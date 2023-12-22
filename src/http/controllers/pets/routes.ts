import { FastifyInstance } from "fastify";
import { createPet } from "./create-pet";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { fetchPetsByCity } from "./fetch-pets-by-city";
import { filterPets } from "./filter-pets";
import { getPetDatails } from "./get-pet-details";
import { deletePet } from "./delete-pet";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets/:organizationId", { onRequest: [verifyJWT] }, createPet);
  app.delete("/pets/:id", { onRequest: [verifyJWT] }, deletePet);
  app.get("/pets/city/:city", { onRequest: [verifyJWT] }, fetchPetsByCity);
  app.get("/pets/filter", { onRequest: [verifyJWT] }, filterPets);
  app.get("/pets/details/:id", { onRequest: [verifyJWT] }, getPetDatails);
}
