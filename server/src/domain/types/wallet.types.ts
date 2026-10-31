import type { Wallet } from "../entities/wallet.entity.ts";

export type WalletOwnerType = "PATIENT" | "DOCTOR" | "ADMIN";

export type WalletOwnerModel = "Patient" | "Doctor" | "Admin";

export type WalletStatus = "ACTIVE" | "LOCKED" | "CLOSED";

export interface WalletProps {
  id: string | null;
  ownerId: string;
  ownerType: WalletOwnerType;
  balance: number;
  currency: "INR";
  status: WalletStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type SafeWallet = Omit<Wallet, "activate" | "lock" | "credit" | "debit">;
