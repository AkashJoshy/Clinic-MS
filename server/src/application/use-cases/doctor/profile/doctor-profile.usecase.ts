import { NotFoundError } from "../../../../domain/errors/not-found.error.ts";
import type { IAddressRepository } from "../../../../domain/repositories/i-address.repository.ts";
import type { IClinicRepository } from "../../../../domain/repositories/i-clinic.repository.ts";
import type { IDepartmentRepository } from "../../../../domain/repositories/i-department.repository.ts";
import type { IDoctorClinicRepository } from "../../../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorRepository } from "../../../../domain/repositories/i-doctor.repository.ts";
import type { IUserRepository } from "../../../../domain/repositories/i-user.repository.ts";
import type { DoctorProfileInfo } from "../../../dto/doctor.dto.ts";
import type { IDoctorProfileUseCase } from "../../../repositories/doctor/i-doctor-profile.usecase.ts";

export class DoctorProfileUseCase implements IDoctorProfileUseCase {
  constructor(
    readonly _userRepository: IUserRepository,
    readonly _doctorRepository: IDoctorRepository,
    readonly _doctorClinicRepository: IDoctorClinicRepository,
    readonly _clinicRepository: IClinicRepository,
    readonly _addressRepository: IAddressRepository,
    readonly _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(userId: string): Promise<DoctorProfileInfo> {
    const user = await this._userRepository.findById(userId);

    if (!user || !user.id) {
      throw new NotFoundError("Doctor");
    }

    const doctor = await this._doctorRepository.findOneBy({ userId });

    if (!doctor || !doctor.id) {
      throw new NotFoundError("Doctor");
    }

    const doctorClinic = await this._doctorClinicRepository.findOneBy({
      doctorId: doctor.id,
    });

    if (!doctorClinic || !doctorClinic.id || !doctorClinic.clinicId) {
      throw new NotFoundError("Doctor");
    }

    const clinic = await this._clinicRepository.findById(doctorClinic.clinicId);

    if (!clinic || !clinic.id) {
      throw new NotFoundError("Doctor");
    }

    const doctorDepartment = await this._departmentRepository.findOneBy({
      _id: doctor.departmentId,
    });

    const address = await this._addressRepository.findOneBy({
      ownerId: doctor.id,
    });

    const clinicAddress = await this._addressRepository.findOneBy({
      ownerId: clinic.id,
    });

    const response = {
      clinic: {
        id: clinic.id,
        name: clinic.name,
        about: clinic.about,
        location: {
          type: clinic.location.type,
          coordinates: clinic.location.coordinates as [number, number],
        },
        clinicAddress: clinicAddress ?? null,
      },
      doctor: {
        id: doctor.id,
        displayName: doctor.displayName,
        doctorCode: doctor.doctorCode,
        bio: doctor.bio,
        languages: doctor.languages,
        gender: doctor.gender,
        licenceNumber: doctor.licenceNumber,
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
        createdAt: doctor.createdAt ?? null,
        updatedAt: doctor.updatedAt ?? null,
      },
      doctorClinic: {
        id: doctorClinic.id,
        type: doctorClinic.type,
        consultationFee: doctorClinic.consultationFee,
        schedule: doctorClinic.schedule,
        slotDuration: doctorClinic.slotDuration,
        timeZone: doctorClinic.timeZone,
        isActive: doctorClinic.isActive,
        updatedAt: doctorClinic.updatedAt,
      },
      address: address
        ? {
            id: address.id,
            addressLine: address.addressLine,
            country: address.country,
            state: address.state,
            city: address.city,
            pincode: address.pincode,
            ownerId: address.ownerId,
          }
        : null,
      department: doctorDepartment
        ? {
            id: doctorDepartment.id,
            name: doctorDepartment.name,
          }
        : null,
    };

    return response;
  }
}
