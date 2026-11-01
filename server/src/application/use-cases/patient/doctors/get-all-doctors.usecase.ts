import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type {
  DoctorClinicDetailsBasicResponseDto,
  PatientDoctorDetailsResponseDto,
} from "../../../dto/doctor.dto.ts";
import type { IDoctorDetailsService } from "../../../interfaces/services/doctor/i-doctor-details.service.ts";
import { DoctorMapper } from "../../../mappers/patient/doctor.mapper.ts";
import type { IGetAllDoctorsUseCase } from "../../../interfaces/repositories/patient/doctor/i-get-all-doctors.usecase.ts";

export class GetAllDoctorsUsecase implements IGetAllDoctorsUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(): Promise<PatientDoctorDetailsResponseDto[]> {
    const doctors = await this._doctorRepository.findBy({
      status: "APPROVED",
    });

    const response = await this._doctorDetailsService.executeMany(doctors);

    const updatedResponse: PatientDoctorDetailsResponseDto[] = response
      .filter(
        (res) => res.user && res.doctorClinicDetails.some((dc) => dc.clinic),
      )
      .map((res) => {
        const { user, address, department, doctor, doctorClinicDetails } = res;

        const updatedDoctorClinicDetails: DoctorClinicDetailsBasicResponseDto[] =
          doctorClinicDetails
            .filter((dc) => dc.clinic)
            .map((dc) => {
              return DoctorMapper.toDoctorClinicDetailsBasic(dc);
            });

        return DoctorMapper.toPatientDoctorDetailsCard({
          user,
          doctor,
          doctorClinicDetails: updatedDoctorClinicDetails,
          address,
          department,
        });
      });

    return updatedResponse;
  }
}
