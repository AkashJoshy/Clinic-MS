import type { WalletTransaction } from "../entities/wallet-transaction.entity.ts";
import type { WalletOwnerType } from "./wallet.types.ts";

export type WalletTransactionType =
  | "CREDIT"
  | "DEBIT";

export type WalletTransactionStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export type WalletTransactionSource =
  | "WALLET_TOPUP"
  | "APPOINTMENT_PAYMENT"
  | "APPOINTMENT_REFUND"
  | "SUBSCRIPTION_PAYMENT"
  | "PAYOUT"
  | "ADMIN_ADJUSTMENT";

export type WalletPaymentMethod =
  | "WALLET"
  | "RAZORPAY"
  | "BANK_TRANSFER"
  | "SYSTEM";

export interface WalletTransactionProps {
  id: string | null;
  walletId: string;
  ownerId: string;
  ownerType: WalletOwnerType;
  type: WalletTransactionType;
  amount: number;
  currency: "INR";
  source: WalletTransactionSource;
  paymentMethod: WalletPaymentMethod;
  status: WalletTransactionStatus;
  referenceId: string | null;
  description: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}


export type SafeWalletTransaction = Pick<WalletTransaction, "cancel" | "fail" | "complete">

export type WalletTransactionResponseDto = SafeWalletTransaction