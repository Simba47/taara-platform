

export async function getActors(
  app:any,
  limit: number,
  cursor: string | undefined,
  userId: string,
  search?: string,
  gender?: string,
  status?: string
) {

  const actors = await app.prisma.actor.findMany({

    take: limit + 1,

    skip: cursor ? 1 : 0,

    cursor: cursor ? { id: cursor } : undefined,

    where: {
      userId,

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive"
        }
      }),

      ...(gender && { gender }),

      ...(status && { status })
    },

    orderBy: {
      createdAt: "desc"
    }

  })

  let nextCursor: string | null = null

  if (actors.length > limit) {
    const nextItem = actors.pop()
    nextCursor = nextItem!.id
  }

  return {
    actors,
    nextCursor
  }
}

export async function getActorById(app:any,id: string, userId: string) {

  return app.prisma.actor.findFirst({
    where: {
      id,
      userId
    }
  })

}

export async function createActor(app:any,data: any) {

  return app.prisma.actor.create({
    data
  })

}

export async function deleteActor(app:any,id: string, userId: string) {

  return app.prisma.actor.deleteMany({
    where: {
      id,
      userId
    }
  })

}