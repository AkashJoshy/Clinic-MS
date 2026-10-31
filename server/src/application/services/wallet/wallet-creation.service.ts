import { Wallet } from "../../../domain/entities/wallet.entity.ts";
import type { IWalletRepository } from "../../../domain/repositories/i-wallet-repository.ts";
import type { CreateWalletDto } from "../../dto/wallet.dto.ts";
import type { IWalletCreationService } from "../../interfaces/services/wallet/i-wallet-creation.service.ts";

export class WalletCreationService implements IWalletCreationService {
  constructor(private _walletRepository: IWalletRepository) {}

  async execute(data: CreateWalletDto): Promise<void> {
    const wallet = Wallet.create({
      id: null,
      ownerId: data.ownerId,
      ownerType: data.ownerType,
      balance: 0,
      currency: "INR",
      status: "ACTIVE",
      createdAt: null,
      updatedAt: null,
    });

    await this._walletRepository.save(wallet);
  }
}
