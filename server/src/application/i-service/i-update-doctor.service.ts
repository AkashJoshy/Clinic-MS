import type { UpdateDoctorEntityDto, UpdateDoctorResponseDto } from "../dto/doctor.dto.ts";

export interface IUpdateDoctorService {
  execute(data: UpdateDoctorEntityDto): Promise<UpdateDoctorResponseDto>;
}
