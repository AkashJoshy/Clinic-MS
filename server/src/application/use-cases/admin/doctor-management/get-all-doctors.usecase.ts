import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type {
  AdminDoctorInfo,
  DoctorDetailsCardDto,
} from "../../../dto/doctor.dto.ts";
import type { IDoctorDetailsService } from "../../../i-service/i-doctor-details.service.ts";
import type { IGetAllDoctorsUseCase } from "../../../repositories/admin/i-get-all-doctors.usecase.ts";

export class GetAllDoctorsUseCase implements IGetAllDoctorsUseCase {
  constructor(
    private _doctorRepository: IDoctorRepository,
    private _doctorDetailsService: IDoctorDetailsService,
  ) {}

  async execute(): Promise<DoctorDetailsCardDto[]> {
    const doctors = await this._doctorRepository.find();

    const response = await this._doctorDetailsService.executeMany(doctors);

    const updatedResponse: DoctorDetailsCardDto[] = response.map((res) => {
      const { user, address, department, doctor, doctorClinicDetails } = res;

      const updatedDoctorClinicDetails = doctorClinicDetails.map((dc) => {
        return {
          clinic: dc.clinic,
          clinicAddress: dc.clinicAddress,
          consultationFee: dc.consultationFee,
          id: dc.id,
          isActive: dc.isActive,
          timeZone: dc.timeZone,
          type: dc.type,
        };
      });

      return {
        user: user ? user : null,
        doctor: {
          id: doctor.id,
          doctorCode: doctor.doctorCode,
          profilePicture: doctor.profilePicture,
          medicalLicenceDoc: doctor.medicalLicenceDoc,
          registrationDoc: doctor.registrationDoc,
          displayName: doctor.displayName,
          gender: doctor.gender,
          status: doctor.status,
          departmentId: doctor.departmentId,
          reviewedAt: doctor.reviewedAt,
          reviewedMessage: doctor.reviewedMessage,
          createdAt: doctor.createdAt,
        },
        department: department ? department : null,
        doctorClinicDetails: updatedDoctorClinicDetails,
        address: address ? address : null,
      };
    });

    return updatedResponse;
  }
}
