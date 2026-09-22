import { z } from "zod";
import "dotenv/config";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  PORT: z.coerce.number().default(3000),

  MONGODB_URI: z.string().url(),

  JWT_ACCESS_SECRET: z.string().min(32),

  JWT_REFRESH_SECRET: z.string().min(32),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Bad environment variables:");
  console.error(parsed.error.format());

  process.exit(1);
}

export const env = Object.freeze(parsed.data);