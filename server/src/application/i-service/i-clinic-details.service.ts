import type { SafeClinic } from "../dto/clinic.dto.ts";
import type { ClinicDetailsResponseDto } from "../dto/shared.dto.ts";

export interface IClinicDetailsService {
  executeOne(clinicId: string): Promise<SafeClinic | null>;
  executeMany(clinicIds: string[]): Promise<ClinicDetailsResponseDto>;
}

