import type { DoctorStatusUpdateDto } from "../../dto/doctor.dto.ts";

export interface IUpdateDoctorStatusUseCase {
  execute(data: DoctorStatusUpdateDto): Promise<void>;
}