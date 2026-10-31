import { model } from "mongoose";
import type { IPersistenceWalletTransaction } from "./wallet-transaction.types.ts";
import { WalletTransactionSchema } from "./wallet-transaction.schema.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const WalletTransactionModel = model<IPersistenceWalletTransaction>(
  MODEL_NAMES.WALLET_TRANSACTION,
  WalletTransactionSchema,
);
