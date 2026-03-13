import { FastifyRequest, FastifyReply } from "fastify";
import { Prisma } from "@prisma/client";
import * as authService from "./auth.service";

type AuthBody = {
  email: string;
  password: string;
};

export async function register(
  req: FastifyRequest<{ Body: AuthBody }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.status(400).send({
        message: "Email and password required"
      });
    }

    const user = await authService.register(email, password);

    return reply.status(201).send({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      }
    });

  } catch (error: any) {

    console.error("REGISTER ERROR:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return reply.status(409).send({
          message: "Email already registered"
        });
      }
    }

    return reply.status(500).send({
      message: "Failed to register",
      error: error.message
    });
  }
}

export async function login(
  req: FastifyRequest<{ Body: AuthBody }>,
  reply: FastifyReply
) {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return reply.status(400).send({
        message: "Email and password required"
      });
    }

    const result = await authService.login(email, password);

    return reply.send({
      message: "Login successful",
      token: result.token,
      user: result.user
    });

  } catch (error: any) {

    console.error("LOGIN ERROR:", error);

    return reply.status(401).send({
      message: error.message || "Invalid credentials"
    });

  }
}