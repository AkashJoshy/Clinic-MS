import type { IClinicRepository } from "../../../domain/repositories/i-clinic.repository.ts";
import type {
  ClinicDetailsResponseDto,
  SafeClinicResponseDto,
} from "../../dto/clinic.dto.ts";
import type { IClinicDetailsService } from "../../interfaces/services/clinic/i-clinic-details.service.ts";

export class ClinicDetailsService implements IClinicDetailsService {
  constructor(private _clinicRepository: IClinicRepository) {}

  async executeOne(clinicId: string): Promise<SafeClinicResponseDto | null> {
    const clinic = await this._clinicRepository.findById(clinicId);

    return clinic;
  }

  async executeMany(clinicIds: string[]): Promise<ClinicDetailsResponseDto> {
    const clinics = await this._clinicRepository.findByIds("id", clinicIds);

    const clinicMap = new Map(clinics.map((c) => [c.id, c]));

    return {
      clinics,
      clinicMap,
    };
  }
}
