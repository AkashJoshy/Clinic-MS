import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type {
  DoctorBankDetailsResponseDto,
  UpdateDoctorBankDetailsDto,
} from "../../../dto/kyc.dto.ts";
import type { IKycRepository } from "../../../../domain/repositories/i-kyc.repository.ts";
import { ConflictError } from "../../../../domain/errors/conflict.error.ts";
import { DatabaseError } from "../../../../domain/errors/database.error.ts";
import type { IKycEncryptionService } from "../../../interfaces/services/kyc/ikyc-encryption.service.ts";
import type { IUpdateDoctorBankDetailsUseCase } from "../../../interfaces/repositories/doctor/kyc/i-update-doctor-bank-details.usecase.ts";
import { ValidationError } from "../../../../domain/errors/validation.error.ts";

export class UpdateDoctorBankDetailsUseCase implements IUpdateDoctorBankDetailsUseCase {
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    readonly _kycRepository: IKycRepository,
    readonly _kycEncryptionService: IKycEncryptionService,
  ) {}

  async execute(
    userId: string,
    data: UpdateDoctorBankDetailsDto,
  ): Promise<DoctorBankDetailsResponseDto> {
    const doctor = await this._doctorRepository.findOneBy({
      userId,
    });

    if (data.accountNumber !== data.confirmAccountNumber) {
      throw new ValidationError("Account number doesn't match");
    }

    if (!doctor || !doctor.id || !doctor.userId) {
      throw new NotFoundError("Doctor");
    }

    const kyc = await this._kycRepository.findByUserId(doctor.userId);

    if (!kyc || !kyc.id) {
      throw new NotFoundError("Doctor KYC");
    }

    if (kyc.isPending(data.section)) {
      throw new ConflictError(`${data.section} is pending to verify`);
    }

    const { section, status, ...updatedData } = data;

    const encryptedAccountNumber = this._kycEncryptionService.encrypt(
      updatedData.accountNumber,
    );

    kyc.submitBank({
      ...updatedData,
      accountNumber: encryptedAccountNumber,
    });

    const response = await this._kycRepository.findByIdAndUpdate(kyc.id, {
      bank: kyc.bank,
    });

    if (!response) {
      throw new DatabaseError("Error While Updating the Bank Details");
    }

    return {
      accountHolderName: response.bank.accountHolderName,
      accountNumber: kyc.maskedAccountNumber(),
      bankName: response.bank.bankName,
      accountType: response.bank.accountType,
      ifscCode: response.bank.ifscCode,
      status: response.bank.status,
      updatedAt: response.updatedAt!,
    };
  }
}
