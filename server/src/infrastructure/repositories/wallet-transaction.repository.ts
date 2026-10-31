import { Types } from "mongoose";

import { BaseRepository } from "./base/base.repository.ts";

import { WalletTransactionModel } from "../models/wallet-transaction/wallet-transaction.model.ts";

import { WalletTransaction } from "../../domain/entities/wallet-transaction.entity.ts";

import type { IWalletTransactionRepository } from "../../domain/repositories/i-wallet-transaction-repository.ts";
import type { IPersistenceWalletTransaction } from "../models/wallet-transaction/wallet-transaction.types.ts";

export class WalletTransactionRepository
  extends BaseRepository<WalletTransaction, IPersistenceWalletTransaction>
  implements IWalletTransactionRepository
{
  constructor() {
    super(WalletTransactionModel);
  }

  async findPendingTransactions(): Promise<WalletTransaction[]> {
    const cutoffDate = new Date(Date.now() - 15 * 60 * 1000);

    const transactions = await WalletTransactionModel.find().where({
      status: "PENDING",
      createdAt: { $lt: cutoffDate },
    });

    if (transactions.length === 0 || !transactions) return []
    return transactions.map(transaction => this.toDomain(transaction))
  }

  async findByWalletId(walletId: string): Promise<WalletTransaction[]> {
    const docs = await WalletTransactionModel.find({
      walletId: new Types.ObjectId(walletId),
    }).sort({ createdAt: -1 });

    return docs.map((doc) => this.toDomain(doc));
  }

  async findByReferenceId(
    referenceId: string,
  ): Promise<WalletTransaction | null> {
    const doc = await WalletTransactionModel.findOne({
      referenceId,
    });

    if (!doc) {
      return null;
    }

    return this.toDomain(doc);
  }

  protected toDomain(doc: IPersistenceWalletTransaction): WalletTransaction {
    return WalletTransaction.create({
      id: doc._id.toString(),
      walletId: doc.walletId.toString(),
      ownerId: doc.ownerId.toString(),
      ownerType: doc.ownerType,
      type: doc.type,
      amount: doc.amount,
      currency: doc.currency,
      source: doc.source,
      paymentMethod: doc.paymentMethod,
      status: doc.status,
      referenceId: doc.referenceId,
      description: doc.description,
      createdAt: doc.createdAt ?? null,
      updatedAt: doc.updatedAt ?? null,
    });
  }

  protected toPersistence(
    entity: WalletTransaction,
  ): Partial<IPersistenceWalletTransaction> {
    return {
      walletId: new Types.ObjectId(entity.walletId),
      ownerId: new Types.ObjectId(entity.ownerId),
      ownerType: entity.ownerType,
      type: entity.type,
      amount: entity.amount,
      currency: entity.currency,
      source: entity.source,
      paymentMethod: entity.paymentMethod,
      status: entity.status,
      referenceId: entity.referenceId,
      description: entity.description,
    };
  }
}
