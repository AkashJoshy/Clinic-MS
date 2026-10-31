import type { IWalletTransactionRepository } from "../../../domain/repositories/i-wallet-transaction-repository.ts";
import type { IExpirePendingWalletTransactionsUseCase } from "../../interfaces/repositories/shared/i-expire-pending-wallet-transactions.usecase.ts";

export class ExpirePendingWalletTransactionsUseCase implements IExpirePendingWalletTransactionsUseCase {
  constructor(
    private _walletTransactionRepository: IWalletTransactionRepository,
  ) {}

  async execute(): Promise<void> {
    const transactions =
      await this._walletTransactionRepository.findPendingTransactions();

    await Promise.all(
      transactions.map(async (transaction) => {
        transaction.fail();

        await this._walletTransactionRepository.findByIdAndUpdate(
          transaction.id!,
          {
            status: transaction.status,
            description: transaction.description,
          },
        );
      }),
    );
  }
}
