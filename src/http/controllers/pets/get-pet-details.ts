import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchPetsByCityUseCase } from "@/use-cases/factories/make-fetch-pets-by-city-use-case";
import { makeGetPetDetailsUseCase } from "@/use-cases/factories/make-get-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetDatails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetDetaisParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getPetDetaisParamsSchema.parse(request.params);

  try {
    const getPetDetailsUseCase = makeGetPetDetailsUseCase();
    const { pet } = await getPetDetailsUseCase.execute({
      id,
    });

    return reply.status(200).send({ pet });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
