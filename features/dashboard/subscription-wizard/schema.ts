import { z } from "zod";

export const newSubscriptionSchema = z.object({
  packageId: z.string().min(1, "Please select a care plan"),
  pediatricianId: z.string().min(1, "Please choose your pediatrician"),
  psychologistId: z.string().min(1, "Please choose your psychologist"),
});

export type NewSubscriptionPayload = z.infer<typeof newSubscriptionSchema>;
