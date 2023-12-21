import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchPetsByCityUseCase } from "@/use-cases/factories/make-fetch-pets-by-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPetsByCityParamsSchema = z.object({
    city: z.string(),
  });

  const { city } = fetchPetsByCityParamsSchema.parse(request.params);

  try {
    const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase();
    const { pets } = await fetchPetsByCityUseCase.execute({
      city,
    });

    return reply.status(200).send({ pets });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
