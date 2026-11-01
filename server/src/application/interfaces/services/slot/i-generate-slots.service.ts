import type {
  DoctorClinicScheduleWithoutIdDto,
  SlotsWithDateResponseDto,
} from "../../../dto/doctor-clinic.dto.ts";

export interface IGenerateSlotsService {
  execute(data: DoctorClinicScheduleWithoutIdDto): SlotsWithDateResponseDto[];
}
