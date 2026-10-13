import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type { PatientBasicInfoDto } from "../../../dto/shared.dto.ts";
import type { IPatientDetailsService } from "../../../i-service/i-patient-details.service.ts";
import { PatientMapper } from "../../../mappers/admin/patient.mapper.ts";
import type { IGetAllPatientsBasicUseCase } from "../../../repositories/admin/i-get-all-patients-basic.usecase.ts";

export class GetAllPatientsUseCase implements IGetAllPatientsBasicUseCase {
  constructor(
    private _patientRepository: IPatientRepository,
    private _patientDetailsService: IPatientDetailsService,
  ) {}

  async execute(): Promise<PatientBasicInfoDto[]> {
    const patients = await this._patientRepository.find();

    const initialResponse = await this._patientDetailsService.execute(patients);

    const response: PatientBasicInfoDto[] = initialResponse.map((res) => {
      return PatientMapper.toPatientBasicInfo(res);
    });

    return response;
  }
}
