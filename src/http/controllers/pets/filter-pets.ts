import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFilterPetsUseCase } from "@/use-cases/factories/make-fetch-pets-use-case";
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Size,
} from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function filterPets(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsBodySchema = z.object({
    filter: z.string(),
  });

  console.log("Antes da validação");

  const { filter } = filterPetsBodySchema.parse(request.params);

  console.log("Depois da validação");

  console.log(filter);

  try {
    const filterPetsUseCase = makeFilterPetsUseCase();
    const pets = await filterPetsUseCase.execute({
      filter,
    });

    return reply.status(200).send({ pets });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
