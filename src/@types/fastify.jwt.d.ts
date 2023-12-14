import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    organization: {
      sub: string;
    };
  }
}
