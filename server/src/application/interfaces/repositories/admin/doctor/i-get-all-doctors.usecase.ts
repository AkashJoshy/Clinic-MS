import type { DoctorManagementResponseDto, GetAllDoctorsQueryDto } from "../../../../dto/doctor.dto.ts";

export interface IGetAllDoctorsUseCase {
  execute(query: GetAllDoctorsQueryDto): Promise<DoctorManagementResponseDto>;
}
