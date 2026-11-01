import type { IGetDoctorDetailsContextService } from "../../../interfaces/services/doctor/i-get-doctor-details-context.service.ts";
import type { IVerifyDoctorReapplicationTokenService } from "../../../interfaces/services/doctor/i-verify-doctor-reapplication.service.ts";
import type { IDoctorReapplicationUseCase } from "../../../interfaces/repositories/doctor/reapplication/i-doctor-reapplication.usecase.ts";
import type { ReapplicationResponseDto } from "../../../dto/doctor.dto.ts";

export class GetReapplicationDetailsUseCase implements IDoctorReapplicationUseCase {
  constructor(
    private readonly _verifyDoctorReapplicationService: IVerifyDoctorReapplicationTokenService,
    private readonly _getDoctorDetailsContextService: IGetDoctorDetailsContextService,
  ) {}
  async execute(token: string): Promise<ReapplicationResponseDto> {
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
