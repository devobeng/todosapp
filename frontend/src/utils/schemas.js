import { z } from "zod";

export const TodoSchema = z.object({
  title: z
    .string()
    .min(4, "Title must be at least 4 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .max(255, "Description must be at most 255 characters"),
  isCompleted: z.boolean().optional(),
});
