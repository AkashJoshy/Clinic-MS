import type { UpdateDoctorSettingsDto, UpdateDoctorSettingsResponseDto } from "../../../../dto/doctor-settings.dto.ts";

export interface IUpdateDoctorSettingsUseCase {
  execute(userId: string, data: UpdateDoctorSettingsDto): Promise<UpdateDoctorSettingsResponseDto>;
}
