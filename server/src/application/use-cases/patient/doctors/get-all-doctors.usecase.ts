import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { PatientDoctorDetailsCardDto } from "../../../dto/doctor.dto.ts";
import type { IDoctorDetailsService } from "../../../i-service/i-doctor-details.service.ts";
import type { IGetAllDoctorsUseCase } from "../../../repositories/patient/i-get-all-doctors.usecase.ts";

export class GetAllDoctorsUsecase implements IGetAllDoctorsUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(): Promise<PatientDoctorDetailsCardDto[]> {
    const doctors = await this._doctorRepository.find();
    // const doctors = await this._doctorRepository.findBy({
    //   status: "APPROVED"
    // });

    const response = await this._doctorDetailsService.executeMany(doctors);

    const updatedResponse: PatientDoctorDetailsCardDto[] = response
      .filter(
        (res) => res.user && res.doctorClinicDetails.some((dc) => dc.clinic),
      )
      .map((res) => {
        const { user, address, department, doctor, doctorClinicDetails } = res;

        const updatedDoctorClinicDetails = doctorClinicDetails
          .filter((dc) => dc.clinic)
          .map((dc) => {
            return {
              id: dc.id,
              consultationFee: dc.consultationFee,
              isActive: dc.isActive,
              timeZone: dc.timeZone,
              type: dc.type,
              schedule: dc.schedule,
              clinic: dc.clinic
                ? {
                    id: dc.clinic.id,
                    name: dc.clinic.name,
                    status: dc.clinic.status,
                  }
                : null,
            };
          });

        return {
          doctor: {
            id: doctor.id,
            gender: doctor.gender,
            averageRating: doctor.averageRating,
            totalReviews: doctor.totalReviews,
            experienceYears: doctor.experienceYears,
            displayName: doctor.displayName,
            profilePicture: doctor.profilePicture,
            status: doctor.status,
          },
          doctorClinicDetails: updatedDoctorClinicDetails,
          department: department ? department : null,
          address: address ? address : null,
        };
      });

    return updatedResponse;
  }
}
