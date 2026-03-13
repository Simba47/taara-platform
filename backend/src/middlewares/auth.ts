import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

type AuthUser = {
  userId: string;
};

export async function authMiddleware(
  req: FastifyRequest,
  reply: FastifyReply
) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({
      message: "Unauthorized"
    });
  }

  try {

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;

    // extend request safely
    (req as FastifyRequest & { user: AuthUser }).user = decoded;

  } catch {

    return reply.status(401).send({
      message: "Invalid token"
    });

  }

}
