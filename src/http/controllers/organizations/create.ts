import { OrganizationAlreadyExistsError } from "@/use-cases/errors/organization-already-exists-error";
import { makeCreateOrganizationUseCase } from "@/use-cases/factories/make-create-organization-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    cep: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
  });

  const { name, email, cep, address, whatsapp, password } =
    createOrganizationBodySchema.parse(request.body);

  try {
    const createOrganizationUseCase = makeCreateOrganizationUseCase();
    await createOrganizationUseCase.execute({
      name,
      email,
      cep,
      address,
      whatsapp,
      password,
    });
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
