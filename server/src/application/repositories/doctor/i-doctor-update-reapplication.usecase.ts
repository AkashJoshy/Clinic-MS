import type { DoctorUpdateReapplicationDto } from "../../dto/doctor.dto.ts";

export interface IDoctorUpdateReapplicationUseCase {
  execute(doctorData: DoctorUpdateReapplicationDto): Promise<void>;
}