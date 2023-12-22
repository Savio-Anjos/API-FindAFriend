import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeAuthenticateUserUseCase } from "@/use-cases/factories/make-authenticate-user-use-case";
import { makeCreateUserUseCase } from "@/use-cases/factories/make-create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateUserBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateUserBodySchema.parse(request.body);

  try {
    const authenticateUserUseCase = makeAuthenticateUserUseCase();

    const { user } = await authenticateUserUseCase.execute({ email, password });

    const token = await reply.jwtSign({}, { sign: { sub: user.id } });

    return reply.status(200).send({
      token,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
