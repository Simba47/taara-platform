import { FastifyRequest, FastifyReply } from "fastify"
import * as actorService from "./actor.service"

type GetActorsQuery = {
  limit?: string
  cursor?: string
  search?: string
  gender?: string
  status?: string
}

type ActorParams = {
  id: string
}

type AuthUser = {
  userId: string
}

/* ---------------- GET ACTORS ---------------- */

export async function getActors(
  req: FastifyRequest<{ Querystring: GetActorsQuery }>,
  reply: FastifyReply
) {
  try {

    const {
      limit = "10",
      cursor,
      search,
      gender,
      status
    } = req.query  as GetActorsQuery

    const user = (req as any).user as AuthUser

    // Fix cursor type safely
    const safeCursor : string | undefined =
      typeof cursor === "string" ? cursor : undefined

    const result = await actorService.getActors(
      req.server,
      Number(limit),
      safeCursor,
      user.userId,
      search,
      gender,
      status
    )

    return reply.send(result)

  } catch (error) {

    console.error("GET ACTORS ERROR:", error)

    return reply.status(500).send({
      message: "Failed to fetch actors"
    })

  }
}


/* ---------------- GET SINGLE ACTOR ---------------- */

export async function getActor(
  req: FastifyRequest<{ Params: ActorParams }>,
  reply: FastifyReply
) {
  try {

    const { id } = req.params
    const user = (req as any).user as AuthUser

    const actor = await actorService.getActorById(
      req.server,
      id,
      user.userId
    )

    if (!actor) {
      return reply.status(404).send({
        message: "Actor not found"
      })
    }

    return reply.send(actor)

  } catch (error) {

    console.error("GET ACTOR ERROR:", error)

    return reply.status(500).send({
      message: "Failed to fetch actor"
    })

  }
}


/* ---------------- CREATE ACTOR ---------------- */

export async function createActor(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {

    const user = (req as any).user as AuthUser
    const data = req.body as any

    const actor = await actorService.createActor(
      req.server,
      {
        ...data,
        userId: user.userId
      }
    )

    return reply.status(201).send(actor)

  } catch (error) {

    console.error("CREATE ACTOR ERROR:", error)

    return reply.status(500).send({
      message: "Failed to create actor"
    })

  }
}


/* ---------------- DELETE ACTOR ---------------- */

export async function deleteActor(
  req: FastifyRequest<{ Params: ActorParams }>,
  reply: FastifyReply
) {
  try {

    const { id } = req.params
    const user = (req as any).user as AuthUser

    await actorService.deleteActor(
      req.server,
      id,
      user.userId
    )

    return reply.send({
      message: "Actor deleted"
    })

  } catch (error) {

    console.error("DELETE ACTOR ERROR:", error)

    return reply.status(500).send({
      message: "Failed to delete actor"
    })

  }
}