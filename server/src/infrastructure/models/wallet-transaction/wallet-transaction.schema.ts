import { Schema } from "mongoose";
import type { IPersistenceWalletTransaction } from "./wallet-transaction.types.ts";
import {
  WALLET_PAYMENT_METHOD,
  WALLET_TRANSACTION_SOURCE,
  WALLET_TRANSACTION_STATUS,
  WALLET_TRANSACTION_TYPE,
} from "../../../domain/constants/wallet-transaction.constants.ts";
import { WALLET_OWNER_TYPE } from "../../../domain/constants/wallet.constants.ts";

export const WalletTransactionSchema =
  new Schema<IPersistenceWalletTransaction>(
    {
      walletId: {
        type: Schema.Types.ObjectId,
        ref: "Wallet",
        required: true,
        index: true,
      },
      ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
      },
      ownerType: {
        type: String,
        enum: Object.values(WALLET_OWNER_TYPE),
        required: true,
      },
      type: {
        type: String,
        enum: Object.values(WALLET_TRANSACTION_TYPE),
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        min: 1,
        validate: {
          validator: Number.isSafeInteger,
          message: "Transaction amount must be an integer in paise",
        },
      },
      currency: {
        type: String,
        enum: ["INR"],
        default: "INR",
        required: true,
      },
      source: {
        type: String,
        enum: Object.values(WALLET_TRANSACTION_SOURCE),
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: Object.values(WALLET_PAYMENT_METHOD),
        required: true,
      },
      status: {
        type: String,
        enum: Object.values(WALLET_TRANSACTION_STATUS),
        default: "PENDING",
        required: true,
      },
      referenceId: {
        type: String,
        default: null,
        index: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );
