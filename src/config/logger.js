import pino from "pino";

import { env } from "./env.js";

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",

  redact: {
    paths: [
      "req.headers.authorization",
      "*.password",
      "*.passwordHash",
      "req.headers.cookie",
      "*.token",
    ],
    censor: "[REDACTED]",
  },

  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
        }
      : undefined,
});