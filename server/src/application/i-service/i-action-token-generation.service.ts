import type { DoctorReapplication } from "../../domain/entities/doctor-reapplication.entity.ts";

export interface IActionTokenGenerationService {
  generate(doctorReapplication: DoctorReapplication): Promise<string | void>;
}