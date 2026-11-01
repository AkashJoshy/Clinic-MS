import type {
  ClinicDetailsResponseDto,
  SafeClinicResponseDto,
} from "../../../dto/clinic.dto.ts";

export interface IClinicDetailsService {
  executeOne(clinicId: string): Promise<SafeClinicResponseDto | null>;
  executeMany(clinicIds: string[]): Promise<ClinicDetailsResponseDto>;
}
