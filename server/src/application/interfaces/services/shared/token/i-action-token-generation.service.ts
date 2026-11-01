import type { DoctorReapplication } from "../../../../../domain/entities/doctor-reapplication.entity.ts";
import type { TokenResponseDto } from "../../../../dto/auth.dto.ts";

export interface IActionTokenGenerationService {
  generate(doctorReapplication: DoctorReapplication): Promise<TokenResponseDto>;
}
