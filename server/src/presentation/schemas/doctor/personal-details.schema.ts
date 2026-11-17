import { z } from "zod";
import { createName, phone } from "../base.schema.ts";

export const personalDetailsSchema = z.object({
  section: z.literal("PROFILE_INFO"),
  displayName: createName("Display Name", 3, 50),
  acceptNewPatients: z.boolean(),
  emergencyContactPhone: phone,
  publicProfileVisible: z.boolean(),
});
