import type { WalletTransaction } from "../../../domain/entities/wallet-transaction.entity.ts";
import type { CreateWalletTransactionDto } from "../../dto/wallet.dto.ts";
import type { ICreateWalletTransactionService } from "../../interfaces/services/wallet/i-create-wallet-transaction.service.ts";
import { WalletMapper } from "../../mappers/wallet/wallet.mapper.ts";

export class CreateWalletTransactionService implements ICreateWalletTransactionService {

  async execute(data: CreateWalletTransactionDto): Promise<WalletTransaction> {
    const { transactionType, status, ...updatedData } = data;

    const transaction =
      transactionType === "CREDIT"
        ? WalletMapper.toCreditTransactionEntity(updatedData)
        : WalletMapper.toDebitTransactionEntity(updatedData);

    const updatedTransaction = WalletMapper.updateTransactionStatus(
      transaction,
      status,
    );

    return updatedTransaction;
  }
}
