import * as z from "zod";
import { TRANSACTION_TYPE } from "@/constants/wallet.constants";

export const addMoneySchema = z.object({
  amount: z
    .number("Please enter a valid amount")
    .min(100, "Minimum deposit is ₹100")
    .max(50000, "Maximum single deposit is ₹50,000"),
  walletType: z.enum(TRANSACTION_TYPE, {
    message: "Please select a valid wallet transaction type.",
  }),
});
