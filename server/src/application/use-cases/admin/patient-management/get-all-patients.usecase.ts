import type { IPatientRepository } from "../../../../domain/repositories/IPatientRepository.ts";
import type { PatientBasicInfoDto, PatientInfoDto } from "../../../dto/shared.dto.ts";
import type { IPatientDetailsService } from "../../../IService/IPatientDetailsService.ts";
import type { IGetAllPatientsBasicUseCase } from "../../../repositories/admin/IGetAllPatientsBasicUseCase.ts";

export class GetAllPatientsUseCase implements IGetAllPatientsBasicUseCase {
  constructor(
    private _patientRepository: IPatientRepository,
    private _patientDetailsService: IPatientDetailsService
  ) {}

  async execute(): Promise<PatientBasicInfoDto[]> {
    const patients = await this._patientRepository.find();

    const initialResponse = await this._patientDetailsService.execute(patients);

    console.log(`initialResponse`);
    console.log(initialResponse);
    
    const response: PatientBasicInfoDto[] = initialResponse.map(res => {
      
      return {
        patient: {
          id: res.patient.id,
          userId: res.patient.userId,
          displayName: res.patient.displayName,
          patientNumber: res.patient.patientNumber,
          medicalInformation: res.patient.medicalInformation,
          gender: res.patient.gender,
          imageUrl: {
            url: res.patient.imageUrl.url
          },
        },
        address: res.address ? {
          addressLine: res.address.addressLine,
          country: res.address.country,
          city: res.address.city,
          state: res.address.state,
          pincode: res.address.pincode,
          ownerId: res.address.ownerId
        } : null,
        user: {
          email: res.user?.email,
          phone: res.user?.phone,
          isActive: res.user?.isActive
        }
      }
    })

    return response;
  }
}
