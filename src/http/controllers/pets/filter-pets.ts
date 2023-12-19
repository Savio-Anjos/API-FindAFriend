import { OrganizationAlreadyExistsError } from "@/use-cases/errors/organization-already-exists-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCreateOrganizationUseCase } from "@/use-cases/factories/make-create-organization-use-case";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
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
    state: z.string().optional(),
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

  const data = filterPetsBodySchema.parse(request.body);

  try {
    const filterPetsUseCase = makeFilterPetsUseCase();
    const pets = await filterPetsUseCase.execute({
      data,
    });

    return reply.status(200).send({ pets });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
