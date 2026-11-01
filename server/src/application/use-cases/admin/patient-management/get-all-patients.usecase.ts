import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type { IPatientDetailsService } from "../../../interfaces/services/patient/i-patient-details.service.ts";
import { PatientMapper } from "../../../mappers/admin/patient.mapper.ts";
import type { IGetAllPatientsBasicUseCase } from "../../../interfaces/repositories/admin/patient/i-get-all-patients-basic.usecase.ts";
import type { PatientBasicInfoResponseDto } from "../../../dto/patient.dto.ts";

export class GetAllPatientsUseCase implements IGetAllPatientsBasicUseCase {
  constructor(
    private _patientRepository: IPatientRepository,
    private _patientDetailsService: IPatientDetailsService,
  ) {}

  async execute(): Promise<PatientBasicInfoResponseDto[]> {
    console.log(`Reaching...`);
    const patients = await this._patientRepository.find();

    const initialResponse = await this._patientDetailsService.execute(patients);

    const response: PatientBasicInfoResponseDto[] = initialResponse.map(
      (res) => {
        return PatientMapper.toPatientBasicInfo(res);
      },
    );

    return response;
  }
}
