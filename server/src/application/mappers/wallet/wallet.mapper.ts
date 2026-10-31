
import { WalletTransaction } from "../../../domain/entities/wallet-transaction.entity.ts";
import {
  walletPaymentMethod,
  walletStatus,
  walletTransactionSource,
  walletType,
} from "../../../domain/enums/user.enums.ts";
import type { Role } from "../../../domain/types/user.types.ts";
import type { WalletTransactionType } from "../../../domain/types/wallet-transaction.types.ts";
import type { TopupOrderResponseDto, WalletTopupResponseDto } from "../../dto/wallet.dto.ts";

type TransactionData = {
  orderId: string | null;
  amount: number;
  walletId: string;
  ownerId: string;
  role: Role;
  currency: TopupOrderResponseDto["currency"];
  paymentMethod: walletPaymentMethod;
  source: walletTransactionSource;
  description: string;
};

export class WalletMapper {
  static success(
    orderId: string,
    balance: number,
    transaction: WalletTransaction,
  ): WalletTopupResponseDto {
    return {
      message: "Wallet top-up completed successfully.",
      success: true,
      orderId,
      balance,
      transaction,
    };
  }

  static failed(
    orderId: string,
    balance: number,
    transaction: WalletTransaction,
  ): WalletTopupResponseDto {
    return {
      message: "Wallet top-up failed. Please try again.",
      success: false,
      orderId,
      balance,
      transaction,
    };
  }

  private static toTransactionEntity(
    data: TransactionData & { type: WalletTransactionType },
  ): WalletTransaction {
    return WalletTransaction.create({
      id: null,
      amount: data.amount,
      walletId: data.walletId,
      ownerId: data.ownerId,
      ownerType: data.role,
      type: data.type,
      currency: data.currency,
      paymentMethod: data.paymentMethod,
      description: data.description,
      referenceId: data.orderId,
      source: data.source,
      status: walletStatus.PENDING,
      createdAt: null,
      updatedAt: null,
    });
  }

  static toCreditTransactionEntity(
    data: TransactionData,
  ): WalletTransaction {
    return this.toTransactionEntity({
      ...data,
      type: walletType.CREDIT,
    });
  }

  static toDebitTransactionEntity(
    data: TransactionData,
  ): WalletTransaction {
    return this.toTransactionEntity({
      ...data,
      type: walletType.DEBIT,
    });
  }

  static updateTransactionStatus(
    transaction: WalletTransaction,
    status: walletStatus,
  ): WalletTransaction {
    const descriptions: Record<walletStatus, string> = {
      [walletStatus.PENDING]: "Transaction is pending.",
      [walletStatus.COMPLETED]: "Transaction completed successfully.",
      [walletStatus.FAILED]: "Transaction failed.",
      [walletStatus.CANCELLED]: "Transaction was cancelled.",
    };

    return WalletTransaction.create({
      ...transaction,
      status,
      description: descriptions[status],
    });
  }
}
