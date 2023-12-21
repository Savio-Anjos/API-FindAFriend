import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFilterPetsUseCase } from "@/use-cases/factories/make-fetch-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function filterPets(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsBodySchema = z.object({
    city: z.string().optional(),
    neighborhood: z.string().optional(),
    name: z.string().optional(),
    age: z.string().optional(),
  });

  const { city, neighborhood, name, age } = filterPetsBodySchema.parse(
    request.query
  );

  let ageConverted;

  if (age) {
    ageConverted = parseInt(age);
  }

  try {
    const filterPetsUseCase = makeFilterPetsUseCase();
    const pets = await filterPetsUseCase.execute({
      city,
      neighborhood,
      name,
      age: ageConverted,
    });

    return reply.status(200).send({ pets });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
