import type { Document, Types } from "mongoose";

import type {
  WalletTransactionType,
  WalletTransactionStatus,
  WalletTransactionSource,
  WalletPaymentMethod,
} from "../../../domain/types/wallet-transaction.types.ts";

import type { WalletOwnerType } from "../../../domain/types/wallet.types.ts";

export interface IPersistenceWalletTransaction extends Document {
  _id: Types.ObjectId;
  walletId: Types.ObjectId;
  ownerId: Types.ObjectId;
  ownerType: WalletOwnerType;

  type: WalletTransactionType;
  amount: number;
  currency: "INR";

  source: WalletTransactionSource;
  paymentMethod: WalletPaymentMethod;
  status: WalletTransactionStatus;

  referenceId: string | null;
  description: string;

  createdAt: Date;
  updatedAt: Date;
}