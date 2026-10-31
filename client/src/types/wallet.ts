import type { RouteRoleProps } from "./auth";
import type { PaymentStatus } from "./common";
import type { RazorpaySuccessResponse } from "./razorpay";

export interface WalletOwnerParams {
  ownerRole: RouteRoleProps;
  id: string;
}

export interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBalanceUpdate: (newBalance: string, walletTransaction: WalletTransaction) => void;
  availableBalance: number;
  roleOverride: RouteRoleProps
}

export interface CreateWalletTopUpOrderParams {
  amount: number;
  authRole: RouteRoleProps;
}

export interface verifyPaymentMutationParams {
  status: PaymentStatus;
  orderDetails: RazorpaySuccessResponse;
  authRole: RouteRoleProps;
}

export type TransactionType = "credit" | "debit";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface WalletStats {
  totalBalance: number;
  availableBalance: number;
  pendingSettlement: number;
  totalEarnings: number;
  totalSpent: number;
  earningsTrendPercent: number;
  currency: string;
}

export type TimeRange = "7D" | "1M" | "3M" | "1Y";

export interface ChartPoint {
  date: string;
  label: string;
  balance: number;
}

export type WalletOwnerType = "PATIENT" | "DOCTOR" | "ADMIN";

export type WalletStatus = "ACTIVE" | "LOCKED" | "CLOSED";

export interface Wallet {
  id: string | null;
  ownerId: string;
  ownerType: WalletOwnerType;
  balance: number;
  currency: "INR";
  status: WalletStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type FilterType =
  | "all"
  | "credit"
  | "debit"
  | "pending"
  | "completed"
  | "failed";

export interface AddMoneyFormData {
  amount: number;
  paymentMethod: "upi" | "card" | "netbanking";
  upiId?: string;
}

export interface WithdrawFormData {
  amount: number;
  bankAccountId: string;
  notes?: string;
}

export interface WalletSummaryCardsProps {
  stats: WalletStatus;
  wallet: Wallet;
}


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

export type PaymentMethod =
  | "WALLET"
  | "RAZORPAY"
  | "BANK_TRANSFER"
  | "SYSTEM";


export type WalletTransaction = {
  id: string | null;
  walletId: string;
  ownerId: string;
  ownerType: WalletOwnerType;
  type: WalletTransactionType;
  amount: number;
  currency: "INR";
  source: WalletTransactionSource;
  paymentMethod: PaymentMethod;
  status: WalletTransactionStatus;
  referenceId: string | null;
  description: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export interface WalletActivityProps {
  transactions: WalletTransaction[];
}

