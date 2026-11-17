import type { GetDoctorSettingsResponseDto } from "../../../../dto/doctor-settings.dto.ts";

export interface IGetDoctorSettingsUseCase {
  execute(userId: string): Promise<GetDoctorSettingsResponseDto>;
}