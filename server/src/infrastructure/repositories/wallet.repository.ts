import { Types } from "mongoose";

import { BaseRepository } from "./base/base.repository.ts";
import { WalletModel } from "../models/wallet/wallet.model.ts";
import { Wallet } from "../../domain/entities/wallet.entity.ts";
import type { IWallet } from "../models/wallet/wallet.types.ts";
import type { IWalletRepository } from "../../domain/repositories/i-wallet-repository.ts";
import { ownerModel } from "../../domain/enums/user.enums.ts";
import type { WalletOwnerType } from "../../domain/types/wallet.types.ts";

export class WalletRepository
  extends BaseRepository<Wallet, IWallet>
  implements IWalletRepository
{
  constructor() {
    super(WalletModel);
  }

  async findByOwner(
    ownerId: string,
    ownerType: WalletOwnerType,
  ): Promise<Wallet | null> {
    const doc = await WalletModel.findOne({
      ownerId,
      ownerType,
    })

    if (!doc) {
      return null;
    }

    return this.toDomain(doc);
  }

  protected toDomain(doc: IWallet): Wallet {
    return Wallet.create({
      id: doc._id.toString(),
      ownerId: doc.ownerId.toString(),
      ownerType: doc.ownerType,
      balance: doc.balance,
      currency: doc.currency,
      status: doc.status,
      createdAt: doc.createdAt ?? null,
      updatedAt: doc.updatedAt ?? null,
    });
  }

  protected toPersistence(entity: Wallet): Partial<IWallet> {
    return {
      ownerId: new Types.ObjectId(entity.ownerId),
      ownerType: entity.ownerType,
      ownerModel: ownerModel[entity.ownerType],
      balance: entity.balance,
      currency: entity.currency,
      status: entity.status,
    };
  }
}
