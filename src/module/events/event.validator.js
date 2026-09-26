import { z } from "zod";

export const listEventsQuerySchema = z.object({
  city: z.string().trim().min(1).optional(),

  status: z
    .enum(["draft", "published", "cancelled"])
    .optional(),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(20),

  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),
});

export const eventSlugParamsSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1),
});