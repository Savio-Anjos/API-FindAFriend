import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateOrganizationBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = authenticateOrganizationBodySchema.parse(
    request.body
  );

  try {
    const authenticateOrganizationUseCase = makeAuthenticateUseCase();
    await authenticateOrganizationUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send();
}
