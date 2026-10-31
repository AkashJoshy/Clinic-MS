import * as z from "zod";
import { featureSchema } from "../base.schema.ts";



export const subscriptionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Subscription plan name must be at least 3 characters.")
    .max(50, "Subscription plan name cannot exceed 50 characters."),
  tagline: z
    .string()
    .trim()
    .max(80, "Tagline cannot exceed 80 characters.")
    .optional(),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(300, "Description cannot exceed 300 characters."),
  price: z.coerce
    .number("Price must be a valid number")
    .min(0, "Price must be 0 or higher."),
  currency: z.string().default("INR"),
  billingCycle: z.enum(["MONTHLY", "QUARTERLY", "YEARLY", "LIFETIME"], {
    message: "Please select a billing cycle.",
  }),
  status: z.enum(["ACTIVE", "INACTIVE"], {
    message: "Please select plan status.",
  }),
  isPopular: z.boolean().default(false),
  badgeText: z
    .string()
    .trim()
    .max(30, "Badge text cannot exceed 30 characters.")
    .optional(),
  colorTheme: z.enum(["emerald", "blue", "purple", "amber"]).default("emerald"),
  features: z
    .array(featureSchema)
    .min(1, "Please add at least one feature to this plan."),
});
