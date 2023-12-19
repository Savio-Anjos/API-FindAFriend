import { OrganizationAlreadyExistsError } from "@/use-cases/errors/organization-already-exists-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCreateOrganizationUseCase } from "@/use-cases/factories/make-create-organization-use-case";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Size,
} from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    organizationId: z.string(),
  });

  const createPetBodySchema = z.object({
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    road: z.string(),
    number: z.number(),
    name: z.string(),
    description: z.string(),
    age: z.number(),
    size: z.nativeEnum(Size),
    energy_level: z.nativeEnum(EnergyLevel),
    independence_level: z.nativeEnum(IndependenceLevel),
    environment: z.nativeEnum(Environment),
  });

  const { organizationId } = createPetParamsSchema.parse(request.params);

  const {
    state,
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
  } = createPetBodySchema.parse(request.body);

  try {
    const createPetUseCase = makeCreatePetUseCase();
    await createPetUseCase.execute({
      state,
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
      organization_id: organizationId,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
