import type {
  WalletOwnerType,
  WalletProps,
  WalletStatus,
} from "../types/wallet.types.ts";

export class Wallet {
  private constructor(
    public readonly id: string | null,
    public readonly ownerId: string,
    public readonly ownerType: WalletOwnerType,
    public balance: number,
    public readonly currency: "INR",
    public status: WalletStatus,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(props: WalletProps): Wallet {
    if (!props.ownerId.trim()) {
      throw new Error("Wallet owner ID is required");
    }

    if (!Number.isSafeInteger(props.balance) || props.balance < 0) {
      throw new Error("Wallet balance must be a non-negative integer in paise");
    }

    return new Wallet(
      props.id,
      props.ownerId,
      props.ownerType,
      props.balance,
      props.currency,
      props.status,
      props.createdAt,
      props.updatedAt,
    );
  }

  credit(amount: number): void {
    this.validateAmount(amount);

    if (this.status !== "ACTIVE") {
      throw new Error("Only active wallets can receive money");
    }

    const newBalance = this.balance + amount;

    if (!Number.isSafeInteger(newBalance)) {
      throw new Error("Wallet balance exceeds the safe integer limit");
    }

    this.balance = newBalance;
  }

  debit(amount: number): void {
    this.validateAmount(amount);

    if (this.status !== "ACTIVE") {
      throw new Error("Only active wallets can be used for payments");
    }

    if (this.balance < amount) {
      throw new Error("Insufficient wallet balance");
    }

    this.balance -= amount;
  }

  private validateAmount(amount: number): void {
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Amount must be a positive integer in paise");
    }
  }

  lock(): void {
    if (this.status === "CLOSED") {
      throw new Error("A closed wallet cannot be locked");
    }

    this.status = "LOCKED";
  }

  activate(): void {
    if (this.status === "CLOSED") {
      throw new Error("A closed wallet cannot be activated");
    }

    this.status = "ACTIVE";
  }

  isLocked() {
    return this.status;
  }
  
}
