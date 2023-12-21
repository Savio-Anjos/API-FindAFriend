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
    city: z.string().optional(),
    neighborhood: z.string().optional(),
    name: z.string().optional(),
    age: z.string().optional(),
    size: z.nativeEnum(Size).optional(),
    energy_level: z.nativeEnum(EnergyLevel).optional(),
    independence_level: z.nativeEnum(IndependenceLevel).optional(),
    environment: z.nativeEnum(Environment).optional(),
  });

  const {
    city,
    neighborhood,
    name,
    age,
    size,
    energy_level,
    independence_level,
    environment,
  } = filterPetsBodySchema.parse(request.query);

  let ageConverted;

  if (age) {
    ageConverted = parseInt(age);
  }

  try {
    const filterPetsUseCase = makeFilterPetsUseCase();
    const { pets } = await filterPetsUseCase.execute({
      city,
      neighborhood,
      name,
      age: ageConverted,
      size,
      energy_level,
      independence_level,
      environment,
    });

    return reply.status(200).send({ pets });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
