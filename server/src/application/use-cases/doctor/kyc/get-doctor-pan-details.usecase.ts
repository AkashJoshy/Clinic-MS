import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IKycRepository } from "../../../../domain/repositories/i-kyc.repository.ts";
import type { IKycEncryptionService } from "../../../interfaces/services/kyc/ikyc-encryption.service.ts";
import type { GetDoctorPanDetailsResponseDto } from "../../../dto/kyc.dto.ts";
import type { IGetDoctorPanDetailsUseCase } from "../../../interfaces/repositories/doctor/kyc/i-get-doctor-pan-details.usecase.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";

export class GetDoctorPanDetailsUseCase implements IGetDoctorPanDetailsUseCase {
  constructor(
    readonly _doctorRepository: IDoctorRepository,
    readonly _kycRepository: IKycRepository,
    readonly _kycEncryptionService: IKycEncryptionService,
  ) {}

  async execute(userId: string): Promise<GetDoctorPanDetailsResponseDto> {
    const kyc = await this._kycRepository.findByUserId(userId);

    if (!kyc) {
      throw new NotFoundError("Doctor KYC");
    }

    const panNumber = this._kycEncryptionService.decrypt(kyc.pan.panNumber);

    return {
      section: "KYC_PAN",
      maskedPanNumber: kyc.pan.panNumber,
      panNumber: panNumber,
      nameOnPan: kyc.pan.nameOnPan,
      dateOfBirth: kyc.pan.dateOfBirth,
      panCardDoc: kyc.pan.panCardDoc.url,
      status: kyc.pan.status,
      rejectionReason: kyc.pan.rejectionReason,
      updatedAt: kyc.updatedAt!,
    };
  }
}
