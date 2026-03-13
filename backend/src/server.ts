import dotenv from "dotenv"
dotenv.config()
import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import prismaPlugin from "./plugins/prisma";
import { authRoutes } from "./modules/auth/auth.routes";
import { actorRoutes } from "./modules/actors/actor.routes";
import { uploadRoutes } from "./modules/uploads/upload.routes";


const app = Fastify({
  logger: true
});

// CORS
app.register(cors, {
  origin: true
});

// Multipart (file uploads)
app.register(multipart);

// Health check route
app.get("/", async () => {
  return { message: "TAARA API running 🚀" };
});
app.register(prismaPlugin)
// Auth routes
app.register(authRoutes, {
  prefix: "/auth"
});

// Actor routes
app.register(actorRoutes);

// Upload routes
app.register(uploadRoutes, {
  prefix: "/upload"
});

const start = async () => {
  try {
    await app.listen({
      port: 4000,
      host: "0.0.0.0"
    });

    console.log("🚀 Server running on http://localhost:4000");

  } catch (err) {

    app.log.error(err);
    process.exit(1);

  }
};

start();