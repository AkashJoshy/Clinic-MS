import { createName, phone } from "@/schemas/base.schema";
import { z } from "zod";

export const profileInfoSchema = z.object({
  section: z.literal("PROFILE_INFO").default("PROFILE_INFO"),
  displayName: createName("Display name", 3, 60),
  acceptNewPatients: z.boolean().default(true),
  publicProfileVisible: z.boolean().default(true),
  emergencyContactPhone: phone,
});

export type ProfileInfoFormValues = z.infer<typeof profileInfoSchema>;
