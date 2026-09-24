import type { DoctorReapplicationResponseDto } from "../dto/doctor.dto.ts";

export interface IVerifyDoctorReapplicationTokenService {
  execute(token: string): Promise<DoctorReapplicationResponseDto>;
}
