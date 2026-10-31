import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IWalletRepository } from "../../../../domain/repositories/i-wallet-repository.ts";
import type { WalletResponseDto } from "../../../dto/shared.dto.ts";
import type { IWalletTransactionsDetailsService } from "../../../interfaces/services/wallet/i-wallet-transactions-details.service.ts";
import type { IGetWalletUseCase } from "../../../interfaces/repositories/shared/i-get-wallet.usecase.ts";

export class GetPatientWalletUseCase implements IGetWalletUseCase {
  constructor(
    private readonly _walletRepository: IWalletRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _patientRepository: IPatientRepository,
    private readonly _walletTransactionsDetailsService: IWalletTransactionsDetailsService,
  ) {}

  async execute(ownerId: string): Promise<WalletResponseDto> {
    const selfAccount = await this._userRepository.findById(ownerId);

    if (!selfAccount || !selfAccount.id) {
      throw new NotFoundError("User not found");
    }

    if (!ownerId?.trim()) {
      throw new Error("Owner ID is required");
    }

    const patient = await this._patientRepository.findByUserId(selfAccount.id);

    if (!patient || !patient.id) {
      throw new NotFoundError("Patient");
    }

    const wallet = await this._walletRepository.findByOwner(ownerId, "PATIENT");

    if (!wallet || !wallet.id) {
      throw new NotFoundError("wallet not found");
    }

    const transactions = await this._walletTransactionsDetailsService.execute(
      wallet.id,
    );

    return {
      wallet,
      walletTransactions: transactions,
    };
  }
}
