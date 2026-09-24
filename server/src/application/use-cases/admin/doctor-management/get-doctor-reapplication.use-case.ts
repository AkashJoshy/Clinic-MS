import type { GetReapplicationDetailsResponseDto } from "../../../dto/doctor.dto.ts";
import type { IGetDoctorDetailsContextService } from "../../../i-service/i-get-doctor-details-context.service.ts";
import type { IVerifyDoctorReapplicationTokenService } from "../../../i-service/i-verify-doctor-reapplication.service.ts";
import type { IDoctorReapplicationUseCase } from "../../../repositories/doctor/i-doctor-reapplication.usecase.ts";

export class GetReapplicationDetailsUseCase implements IDoctorReapplicationUseCase {
  constructor(
    private readonly _verifyDoctorReapplicationService: IVerifyDoctorReapplicationTokenService,
    private readonly _getDoctorDetailsContextService: IGetDoctorDetailsContextService,
  ) {}

  async execute(token: string): Promise<GetReapplicationDetailsResponseDto> {
    const { reapplication } =
      await this._verifyDoctorReapplicationService.execute(token);

    const { address: clinicAddress, doctor } =
      await this._getDoctorDetailsContextService.execute(
        reapplication.doctorId!,
    );

    const { createdAt, updatedAt, ownerType, ...updatedAddress } =
      clinicAddress;

    return {
      doctor,
      clinicAddress: updatedAddress,
      fieldsToReupload: reapplication.fieldsToReupload,
      reviewMessage: reapplication.reviewMessage,
      rejectionReason: reapplication.reviewedReason,
    };
  }
}
