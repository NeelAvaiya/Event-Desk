import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { connectDatabase } from "./config/database.js";
import mongoose from "mongoose";
import app from "./app.js";

await connectDatabase();

const server = app.listen(env.PORT, () => {
  logger.info(`Listening on ${env.PORT}`);
});

async function shutdown(signal) {
  logger.info({ signal }, "Shutting down");

  server.close(async () => {
    // Stop accepting new requests.
    // Existing requests get time to finish.
    await mongoose.connection.close();

    logger.info("MongoDB connection closed");

    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));