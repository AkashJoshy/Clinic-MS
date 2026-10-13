import type { DoctorClinicScheduleWithoutIdDto, SlotsWithDateDto } from "../dto/doctor-clinic.dto.ts";

export interface IGenerateSlotsService {
  execute(data: DoctorClinicScheduleWithoutIdDto): SlotsWithDateDto[]
}

