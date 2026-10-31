import * as z from "zod";

export const addMoneySchema = z.object({
  amount: z
    .number("Please enter a valid amount")
    .min(100, "Minimum deposit is ₹100")
    .max(50000, "Maximum single deposit is ₹50,000"),
});
