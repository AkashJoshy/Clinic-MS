import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { IWalletRepository } from "../../../../domain/repositories/i-wallet-repository.ts";
import type { WalletBalanceResponseDto } from "../../../dto/wallet.dto.ts";
import type { IGetWalletBalanceUseCase } from "../../../interfaces/repositories/shared/i-get-wallet-balance.usecase.ts";

export class GetDoctorWalletBalanceUseCase implements IGetWalletBalanceUseCase {
  constructor(
    private readonly _walletRepository: IWalletRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _doctorRepository: IDoctorRepository,
  ) {}

  async execute(ownerId: string): Promise<WalletBalanceResponseDto> {
    const selfAccount = await this._userRepository.findById(ownerId);

    if (!selfAccount) {
      throw new NotFoundError("User not found");
    }

    if (!ownerId?.trim()) {
      throw new Error("Owner ID is required");
    }

    const doctor = await this._doctorRepository.findOneBy({
      userId: selfAccount.id,
    });

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor not found");
    }

    const wallet = await this._walletRepository.findByOwner(ownerId, "DOCTOR");

    if (!wallet || !wallet.id) {
      throw new NotFoundError("wallet not found");
    }

    return {
      balance: wallet.balance,
      currency: wallet.currency,
      status: wallet.status,
    }
  }
}
