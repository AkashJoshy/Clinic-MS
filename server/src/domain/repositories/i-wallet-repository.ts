import type { Wallet } from "../entities/wallet.entity.ts";
import type { WalletOwnerType } from "../types/wallet.types.ts";
import type { IBaseRepository } from "./i-base.repository.ts";

export interface IWalletRepository extends IBaseRepository<Wallet> {
  findByOwner(
    ownerId: string,
    ownerType: WalletOwnerType,
  ): Promise<Wallet | null>;
}
