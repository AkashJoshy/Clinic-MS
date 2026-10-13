import type { DoctorClinicSlotsWithDateDto } from "../../dto/doctor-clinic.dto.ts";
import type { GenerateSlotsDto } from "../../dto/doctor.dto.ts";

export interface IGenerateSlotsUseCase {
  excute(data: GenerateSlotsDto): Promise<DoctorClinicSlotsWithDateDto>;
}