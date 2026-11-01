import type { ReapplicationUpdateDto } from "../../../../dto/doctor.dto.ts";

export interface IDoctorUpdateReapplicationUseCase {
  execute(doctorData: ReapplicationUpdateDto): Promise<void>;
}
