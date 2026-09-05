import type { IPatientRepository } from "../../../../domain/repositories/i-patient.repository.ts";
import type { PatientBasicInfoDto } from "../../../dto/shared.dto.ts";
import type { IPatientDetailsService } from "../../../IService/i-patient-details.service.ts";
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
      return {
        patient: {
          id: res.patient.id,
          userId: res.patient.userId,
          displayName: res.patient.displayName,
          patientNumber: res.patient.patientNumber,
          medicalInformation: res.patient.medicalInformation,
          gender: res.patient.gender,
          imageUrl: {
            url: res.patient.imageUrl.url,
          },
          createdAt: res.patient.createdAt,
        },
        user: res.user
          ? {
              email: res.user.email,
              phone: res.user.phone,
              isActive: res.user.isActive,
            }
          : null,
      };
    });

    return response;
  }
}
