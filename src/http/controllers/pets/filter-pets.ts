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
    road: z.string().optional(),
    number: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    age: z.number().optional(),
    size: z.nativeEnum(Size).optional(),
    energy_level: z.nativeEnum(EnergyLevel).optional(),
    independence_level: z.nativeEnum(IndependenceLevel).optional(),
    environment: z.nativeEnum(Environment).optional(),
  });

  console.log("Antes da validação");

  const {
    city,
    neighborhood,
    road,
    number,
    name,
    description,
    age,
    size,
    energy_level,
    independence_level,
    environment,
  } = filterPetsBodySchema.parse(request.body);

  console.log("Depois da validação");

  console.log(
    city,
    neighborhood,
    road,
    number,
    name,
    description,
    age,
    size,
    energy_level,
    independence_level,
    environment
  );

  try {
    const filterPetsUseCase = makeFilterPetsUseCase();
    const pets = await filterPetsUseCase.execute({
      data: {
        city,
        neighborhood,
        road,
        number,
        name,
        description,
        age,
        size,
        energy_level,
        independence_level,
        environment,
      },
    });

    return reply.status(200).send({ pets });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
