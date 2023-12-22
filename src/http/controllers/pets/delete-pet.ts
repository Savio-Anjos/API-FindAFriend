import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeDeletePetUseCase } from "@/use-cases/factories/make-delete-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deletePetParamsSchema.parse(request.params);

  try {
    const createPetUseCase = makeDeletePetUseCase();
    await createPetUseCase.execute({
      id,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send();
}
