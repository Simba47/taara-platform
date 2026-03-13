import { FastifyInstance } from "fastify"
import { authMiddleware } from "../../middlewares/auth"
export async function actorRoutes(app: FastifyInstance) {

  // Get all actors (Dashboard / Roster)
  app.get("/actors",{preHandler: authMiddleware}, async (request, reply) => {

    const { search, limit = 20, cursor } = request.query as any

    const actors = await app.prisma.actor.findMany({

      take: Number(limit),

      ...(cursor && {
        skip: 1,
        cursor: { id: cursor }
      }),

      where: search
        ? {
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        : {},

      orderBy: {
        createdAt: "desc"
      }

    })

    return actors
  })



  // Get single actor profile
  app.get("/actors/:id", async (request, reply) => {

    const { id } = request.params as any

    const actor = await app.prisma.actor.findUnique({
      where: { id }
    })

    if (!actor) {
      return reply.code(404).send({
        message: "Actor not found"
      })
    }

    return actor
  })



  // Create actor (Add Talent page)
  app.post("/actors",{preHandler: authMiddleware}, async (request, reply) => {

    const data = request.body as any
    const user = (request as any).user
    if (!user){
      return reply.status(401).send({message: "Unauthorized"})
    }
    const actor = await app.prisma.actor.create({
      data: {
        name: data.name,
        age: Number(data.age),
        gender: data.gender,
        type: data.type,
        location: data.location,
        status: data.status || "Available",
        bio: data.bio,
        height: data.height,
        hair: data.hair,
        eyes: data.eyes,
        slug:data.slug,
        userId: user.userId
      }
    })

    return actor
  })



  // Update actor
  app.put("/actors/:id", async (request, reply) => {

    const { id } = request.params as any
    const data = request.body as any

    const actor = await app.prisma.actor.update({
      where: { id },
      data
    })

    return actor
  })



  // Delete actor
  app.delete("/actors/:id", async (request, reply) => {

    const { id } = request.params as any

    await app.prisma.actor.delete({
      where: { id }
    })

    return {
      success: true
    }
  })

}