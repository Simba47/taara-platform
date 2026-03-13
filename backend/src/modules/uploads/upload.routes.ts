import { FastifyInstance } from "fastify";
import cloudinary from "../../plugins/cloudinary";
import { pipeline } from "stream/promises";

export async function uploadRoutes(app: FastifyInstance) {

  app.post("/upload", async (req: any, reply) => {

    const data = await req.file();

    if (!data) {
      return reply.status(400).send({ error: "No file uploaded" });
    }

    const upload = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        { folder: "actors" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      pipeline(data.file, stream);

    });

    return {
      url: (upload as any).secure_url
    };

  });

}