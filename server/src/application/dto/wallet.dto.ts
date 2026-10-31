import type { WalletTransaction } from "../../domain/entities/wallet-transaction.entity.ts";
import type { ownerModel } from "../../domain/enums/user.enums.ts";
import type { PaymentStatus } from "../../domain/types/shared.types.ts";
import type { SafeWalletTransaction } from "../../domain/types/wallet-transaction.types.ts";
import type {
  SafeWallet,
  WalletOwnerType,
} from "../../domain/types/wallet.types.ts";

export type SafeWalletDto = SafeWallet;

export type WalletResponseDto = {
  wallet: SafeWallet;
  walletTransactions: SafeWalletTransaction[];
};

export type WalletBalanceResponseDto = {
  balance: SafeWallet["balance"];
  currency: SafeWallet["currency"];
  status: SafeWallet["status"];
};

export type CreateWalletTopupOrderDto = {
  ownerId: string;
  amount: number;
};

export interface CreateWalletTopupOrderInputDto {
  ownerId: string;
  ownerRole: ownerModel;
  amount: number;
}

export interface CreateWalletTopupOrderOutputDto {
  orderId: string;
  amount: number;
  currency: string;
  status: string;
}

export interface CreateWalletTopupOrderRequestDto {
  ownerId: string;
  amount: number;
  receipt: string;
  purpose: string;
}

export interface TopupOrderResponseDto {
  orderId: string;
  amount: number;
  currency: "INR";
  status: string;
}

export interface RazorpaySuccessDto {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentDto {
  verified: boolean;
  razorpayOrderId: string;
  razorpayPaymentId: string;
}

export interface VerifyTopupDto {
  ownerId: string;
  status: PaymentStatus;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface VerifyTopupResponseDto {
  success: boolean;
  message: string;
  orderId: string;
  balance: number;
  transaction: SafeWalletTransaction;
}

export interface WalletTopupResponseDto {
  message: string;
  success: boolean;
  orderId: string;
  balance: number;
  transaction: WalletTransaction;
}

export interface TransactionDto {
  transactionId: string;
  amount: number;
  type: string;
  status: string;
}

export interface CreateWalletDto {
  ownerId: string;
  ownerType: WalletOwnerType;
}
