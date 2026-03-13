import "fastify";
import { PrismaClient } from "@prisma/client";


declare module "fastify" {
  interface FastifyRequest {
    user?: {
      userId: string
    };
  }
  interface FastifyInstance{
    prisma:PrismaClient
  }
}
