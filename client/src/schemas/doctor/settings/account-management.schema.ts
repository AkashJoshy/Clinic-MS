import { z } from "zod";

export const accountManagementSchema = z.object({
  section: z.literal("ACCOUNT_MANAGEMENT").default("ACCOUNT_MANAGEMENT"),
  practiceStatus: z.enum(["ACTIVE", "ON_LEAVE", "BUSY"]).default("ACTIVE"),
  leaveStartDate: z.string().optional().default(""),
  leaveEndDate: z.string().optional().default(""),
  autoResponderMessage: z
    .string()
    .max(300, "Auto-responder message cannot exceed 300 characters")
    .optional()
    .default(""),
});

export type AccountManagementFormValues = z.infer<
  typeof accountManagementSchema
>;
