import type { IAddressRepository } from "../../../../domain/repositories/IAddressRepository.ts";
import type { IClinicRepository } from "../../../../domain/repositories/IClinicRepository.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/IDepartmentRepository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/IDoctorClinicRepository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/IDoctorRepository.ts";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.ts";
import type { DoctorInfo } from "../../../dto/doctor.dto.ts";
import type { IDoctorDetailsService } from "../../../IService/IDoctorDetailsService.ts";
import type { IGetDoctorUseCase } from "../../../repositories/admin/IGetDoctorUseCase.ts";

export class GetDoctorUseCase implements IGetDoctorUseCase {
  constructor( 
    private _doctorRepository: IDoctorRepository,
    private _userRepository: IUserRepository,
    private _doctorClinicRepository: IDoctorClinicRepository,
    private _clinicRepository: IClinicRepository,
    private _addressRepository: IAddressRepository,
    private _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(doctorId: string): Promise<DoctorInfo | null> {
    const doctor = await this._doctorRepository.findById(doctorId);

    if (!doctor || !doctor.id || !doctor.userId) {
      return null;
    }

    const user = await this._userRepository.findById(doctor.userId);

    const doctorClinic = await this._doctorClinicRepository.findOneBy({
      doctorId: doctor.id,
    });

    const clinic =
      doctorClinic && doctorClinic.clinicId
        ? await this._clinicRepository.findById(doctorClinic.clinicId)
        : null;

    const clinicAddress =
      clinic && clinic.id
        ? await this._addressRepository.findOneBy({
            ownerId: clinic.id,
          })
        : null;

    const doctorAddress = await this._addressRepository.findOneBy({
      ownerId: doctor.id,
    });

    const department = doctor.departmentId
      ? await this._departmentRepository.findById(doctor.departmentId)
      : null;

    return {
      user: user
        ? {
            email: user.email,
            phone: user.phone,
            isActive: user.isActive,
            isBlocked: user.isBlocked
          }
        : null,

      clinic: clinic
        ? {
            id: clinic.id,
            name: clinic.name,
            about: clinic.about,
            location: {
              type: clinic.location.type,
              coordinates: clinic.location.coordinates as [number, number],
            },
            clinicAddress: clinicAddress
              ? {
                  addressLine: clinicAddress.addressLine,
                  country: clinicAddress.country,
                  state: clinicAddress.state,
                  city: clinicAddress.city,
                  pincode: clinicAddress.pincode,
                  ownerId: clinicAddress.ownerId,
                }
              : null,
          }
        : null,

      doctor: {
        id: doctor.id,
        displayName: doctor.displayName,
        doctorCode: doctor.doctorCode,
        bio: doctor.bio,
        languages: doctor.languages,
        gender: doctor.gender,
        departmentId: doctor.departmentId,
        specialization: doctor.specialization,
        qualification: doctor.qualification,
        experienceYears: doctor.experienceYears,
        averageRating: doctor.averageRating,
        totalReviews: doctor.totalReviews,
        registrationDoc: {
          url: doctor.registrationDoc.url,
        },
        medicalLicenceDoc: {
          url: doctor.medicalLicenceDoc.url,
        },
        profilePicture: {
          url: doctor.profilePicture.url,
        },
        status: doctor.status,
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      },

      doctorClinic: doctorClinic
        ? {
            id: doctorClinic.id,
            type: doctorClinic.type,
            consultationFee: doctorClinic.consultationFee,
            schedule: doctorClinic.schedule,
            slotDuration: doctorClinic.slotDuration,
            timeZone: doctorClinic.timeZone,
            isActive: doctorClinic.isActive,
          }
        : null,

      address: doctorAddress
        ? {
            addressLine: doctorAddress.addressLine,
            country: doctorAddress.country,
            state: doctorAddress.state,
            city: doctorAddress.city,
            pincode: doctorAddress.pincode,
            ownerId: doctorAddress.ownerId,
          }
        : null,

      department: department
        ? {
            id: department.id,
            name: department.name,
          }
        : null,
    };
  }
}
