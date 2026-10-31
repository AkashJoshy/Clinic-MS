import type {
  WalletPaymentMethod,
  WalletTransactionProps,
  WalletTransactionSource,
  WalletTransactionStatus,
  WalletTransactionType,
} from "../types/wallet-transaction.types.ts";
import type { WalletOwnerType } from "../types/wallet.types.ts";

export class WalletTransaction {
  private constructor(
    public readonly id: string | null,
    public readonly walletId: string,
    public readonly ownerId: string,
    public readonly ownerType: WalletOwnerType,
    public readonly type: WalletTransactionType,
    public readonly amount: number,
    public readonly currency: "INR",
    public readonly source: WalletTransactionSource,
    public readonly paymentMethod: WalletPaymentMethod,
    public status: WalletTransactionStatus,
    public readonly referenceId: string | null,
    public description: string,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(props: WalletTransactionProps): WalletTransaction {
    if (!props.walletId.trim()) {
      throw new Error("Wallet ID is required");
    }

    if (!props.ownerId.trim()) {
      throw new Error("Wallet owner ID is required");
    }

    if (!Number.isSafeInteger(props.amount) || props.amount <= 0) {
      throw new Error("Transaction amount must be a positive integer in paise");
    }

    if (!props.description.trim()) {
      throw new Error("Transaction description is required");
    }

    return new WalletTransaction(
      props.id,
      props.walletId,
      props.ownerId,
      props.ownerType,
      props.type,
      props.amount,
      props.currency,
      props.source,
      props.paymentMethod,
      props.status,
      props.referenceId,
      props.description,
      props.createdAt,
      props.updatedAt,
    );
  }

  complete(): void {
    if (this.status !== "PENDING") {
      throw new Error("Only pending transactions can be completed");
    }

    this.status = "COMPLETED";
    this.description = "Payment Completed"
  }
  
  fail(): void {
    if (this.status !== "PENDING") {
      throw new Error("Only pending transactions can be marked as failed");
    }
    
    this.status = "FAILED";
    this.description = "Payment Failed"
  }

  cancel(): void {
    if (this.status !== "PENDING") {
      throw new Error("Only pending transactions can be cancelled");
    }

    this.status = "CANCELLED";
  }

  isPaid() {
    return this.status === "COMPLETED";
  }
}
