import { env } from "@/env";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import axios from "axios";
import qs from "query-string";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function githubAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const githubAuthenticationBodySchema = z.object({
    code: z.string(),
  });

  const { code } = githubAuthenticationBodySchema.parse(request.body);

  async function exchangeCodeForAccessToken(code: string) {
    console.log(code);
    const githubAccessTokenURL = "https://github.com/login/oauth/access_token";
    const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = env;
    const params = {
      code,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URL,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    const { data } = await axios.post(githubAccessTokenURL, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parseData = qs.parse(data);

    return parseData.access_token;
  }

  async function fetchUser(token: any) {
    const githubEndpoint = "https://api.github.com/user";
    const response = await axios.get(githubEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  try {
    const token = await exchangeCodeForAccessToken(code);
    const user = await fetchUser(token);

    return reply.status(200).send({ user });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
