import z from "zod";

export const userSelectSchema = z.object({
  userId: z.string(),
});
