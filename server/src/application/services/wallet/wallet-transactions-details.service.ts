import { NotFoundError } from "../../../domain/errors/not-found.error.ts";
import type { IWalletTransactionRepository } from "../../../domain/repositories/i-wallet-transaction-repository.ts";
import type {
  WalletTransactionResponseDto,
} from "../../../domain/types/wallet-transaction.types.ts";
import type { IWalletTransactionsDetailsService } from "../../interfaces/services/wallet/i-wallet-transactions-details.service.ts";

export class WalletTransactionsDetailsService implements IWalletTransactionsDetailsService {
  constructor(
    private readonly _walletTransactionRepository: IWalletTransactionRepository,
  ) {}

  async execute(walletId: string): Promise<WalletTransactionResponseDto[]> {
    if (!walletId) {
      throw new NotFoundError("Wallet transactions");
    }

    const transactions =
      await this._walletTransactionRepository.findByWalletId(walletId);

    return transactions;
  }
}
