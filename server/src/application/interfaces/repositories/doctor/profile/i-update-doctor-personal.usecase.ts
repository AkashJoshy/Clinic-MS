import type { DoctorPersonalResponseDto, UpdateDoctorPersonalDto } from "../../../../dto/doctor.dto.ts";

export interface IUpdateDoctorPersonalUseCase {
  execute(userId: string, data: UpdateDoctorPersonalDto): Promise<DoctorPersonalResponseDto>;
}
