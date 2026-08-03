import type { Doctor } from "../../domain/entities/Doctor.ts";
import type { IAddressRepository } from "../../domain/repositories/IAddressRepository.ts";
import type { IClinicRepository } from "../../domain/repositories/IClinicRepository.ts";
import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository.ts";
import type { IDoctorClinicRepository } from "../../domain/repositories/IDoctorClinicRepository.ts";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.ts";
import type { DoctorInfo } from "../dto/doctor.dto.ts";
import type { IDoctorDetailsService } from "../IService/IDoctorDetailsService.ts";

export class DoctorDetailsService implements IDoctorDetailsService {
  constructor(
    private _userRepository: IUserRepository,
    private _doctorClinicRepository: IDoctorClinicRepository,
    private _clinicRepository: IClinicRepository,
    private _addressRepository: IAddressRepository,
    private _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(doctors: Doctor[]): Promise<DoctorInfo[]> {
    const doctorIds = doctors.map((d) => d.id).filter((d) => d !== null);

    const departmentIds = doctors
      .map((d) => d.departmentId)
      .filter((d) => d !== null);

    const userIds = doctors.map((d) => d.userId).filter((d) => d !== null);
    const users = await this._userRepository.findByIds("id", userIds);
    const userMap = new Map(users.map((u) => [u.id, u]));

    const clinicDoctors = await this._doctorClinicRepository.findByIds(
      "doctorId",
      doctorIds,
    );

    const clinicDoctorMap = new Map(clinicDoctors.map((c) => [c.doctorId, c]));

    const clinicIds = clinicDoctors
      .map((c) => c.clinicId)
      .filter((c) => c !== null);

    const clinics = await this._clinicRepository.findByIds("id", clinicIds);
    const clinicMap = new Map(clinics.map((c) => [c.id, c]));

    const clinicAddresses = await this._addressRepository.findByIds(
      "ownerId",
      clinicIds,
    );
    console.log(`Address of Clinic`)
    console.log(clinicAddresses)
    const clinicAddressMap = new Map(
      clinicAddresses.map((a) => [a.ownerId, a]),
    );

    const departments = await this._departmentRepository.findByIds(
      "id",
      departmentIds,
    );
    const departmentMap = new Map(departments.map((d) => [d.id, d]));

    const response = doctors.map((doctor) => {
      const doctorClinicDetails = clinicDoctorMap.get(doctor.id) ?? null;
      const userDetails = userMap.get(doctor?.userId) ?? null;
      const clinicDetails = doctorClinicDetails
        ? (clinicMap.get(doctorClinicDetails.clinicId) ?? null)
        : null;
      const clinicAddressDetails =
        clinicDetails && clinicDetails.id
          ? clinicAddressMap.get(clinicDetails?.id ?? null)
          : null;
      const department = departmentMap.get(doctor.departmentId) ?? null;

      return {
        user: userDetails
          ? {
              email: userDetails.email,
              phone: userDetails.phone,
            }
          : null,
        clinic: clinicDetails
          ? {
              id: clinicDetails.id,
              name: clinicDetails.name,
              about: clinicDetails.about,
              location: {
                type: clinicDetails.location.type,
                coordinates: clinicDetails.location.coordinates as [
                  number,
                  number,
                ],
              },
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
          createdAt: doctor.createdAt ?? null,
          updatedAt: doctor.updatedAt ?? null,
        },
        doctorClinic: doctorClinicDetails
          ? {
              id: doctorClinicDetails.id,
              type: doctorClinicDetails.type,
              consultationFee: doctorClinicDetails.consultationFee,
              schedule: doctorClinicDetails.schedule,
              slotDuration: doctorClinicDetails.slotDuration,
              timeZone: doctorClinicDetails.timeZone,
              isActive: doctorClinicDetails.isActive,
            }
          : null,
        address: clinicAddressDetails
          ? {
              id: clinicAddressDetails.id,
              addressLine: clinicAddressDetails.addressLine,
              country: clinicAddressDetails.country,
              state: clinicAddressDetails.state,
              city: clinicAddressDetails.city,
              pincode: clinicAddressDetails.pincode,
            }
          : null,
        department: department
          ? {
              id: department.id,
              name: department.name,
            }
          : null,
      };
    });

    return response;
  }
}
