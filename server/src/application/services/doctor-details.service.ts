import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { IAddressRepository } from "../../domain/repositories/i-address.repository.ts";
import type { IClinicRepository } from "../../domain/repositories/i-clinic.repository.ts";
import type { IDepartmentRepository } from "../../domain/repositories/i-department.repository.ts";
import type { IDoctorClinicRepository } from "../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IUserRepository } from "../../domain/repositories/i-user.repository.ts";
import type { AdminDoctorInfo } from "../dto/doctor.dto.ts";
import type { IAddressDetailsService } from "../i-service/i-address-details.service.ts";
import type { IDepartmentDetailsService } from "../i-service/i-department-details.service.ts";
import type { IDoctorClinicContextService } from "../i-service/i-doctor-clinic-context.service.ts";
import type { IDoctorDetailsService } from "../i-service/i-doctor-details.service.ts";

export class DoctorDetailsService implements IDoctorDetailsService {
  constructor(
    private _userRepository: IUserRepository,
    private _doctorClinicRepository: IDoctorClinicRepository,
    private _clinicRepository: IClinicRepository,
    private _addressRepository: IAddressRepository,
    private _departmentRepository: IDepartmentRepository,
    private _addressDetailsService: IAddressDetailsService,
    private _departmentDetailsService: IDepartmentDetailsService,
    private _doctorClinicContextService: IDoctorClinicContextService,
  ) {}

  async executeOne(doctor: Doctor): Promise<AdminDoctorInfo> {
    const user = await this._userRepository.findById(doctor.userId!);

    const doctorClinicDetails =
      await this._doctorClinicContextService.executeOne(doctor.id!);

    const address = await this._addressDetailsService.executeOne(
      "Doctor",
      doctor.id!,
    );

    const department = doctor.departmentId
      ? await this._departmentRepository.findById(doctor.departmentId)
      : null;

    const updatedDoctorClinicDetails = doctorClinicDetails.map((dc) => {
      const {
        clinic,
        clinicAddress,
        clinicId,
        createdAt,
        doctorId,
        leaves,
        ...rest
      } = dc;

      return {
        ...rest,
        clinic: clinic
          ? {
              id: clinic.id,
              status: clinic.status,
              name: clinic.name,
              about: clinic.about,
              location: clinic.location,
              registrationDoc: {
                url: clinic.registrationDoc.url,
                status: clinic.registrationDoc.status,
              },
              establishmentLicenceDoc: {
                url: clinic.establishmentLicenceDoc.url,
                status: clinic.establishmentLicenceDoc.status,
              },
            }
          : null,
        clinicAddress: clinicAddress
          ? {
              id: clinicAddress.id,
              ownerId: clinicAddress.ownerId,
              addressLine: clinicAddress.addressLine,
              country: clinicAddress.country,
              state: clinicAddress.state,
              city: clinicAddress.city,
              pincode: clinicAddress.pincode,
            }
          : null,
      };
    });

    const response: AdminDoctorInfo = {
      user: user
        ? {
            email: user.email,
            phone: user.phone,
            isActive: user.isActive,
            isBlocked: user.isBlocked,
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
        licenceNumber: doctor.licenceNumber,
        registrationDoc: {
          url: doctor.registrationDoc.url,
          status: doctor.registrationDoc.status,
        },
        medicalLicenceDoc: {
          url: doctor.medicalLicenceDoc.url,
          status: doctor.medicalLicenceDoc.status,
        },
        profilePicture: {
          url: doctor.profilePicture.url,
        },
        status: doctor.status,
        reviewedAt: doctor.reviewedAt,
        reviewedMessage: doctor.reviewedMessage,
        reviewedReason: doctor.reviewedReason,
        createdAt: doctor.createdAt,
        updatedAt: doctor.updatedAt,
      },
      address,
      doctorClinicDetails: updatedDoctorClinicDetails,
      department: department
        ? {
            id: department.id,
            name: department.name,
          }
        : null,
    };

    return response;
  }

  async executeMany(doctors: Doctor[]): Promise<AdminDoctorInfo[]> {
    const doctorIds = doctors.map((d) => d.id).filter((d) => d !== null);

    const doctorClinicDetails =
      await this._doctorClinicContextService.executeMany(doctorIds);

    const doctorClinicDetailsMap = new Map(
      doctorClinicDetails.map((dc) => [dc[0]?.doctorId, dc]),
    );

    const departmentIds = doctors
      .map((d) => d.departmentId)
      .filter((d) => d !== null);

    const { departmentMap } =
      await this._departmentDetailsService.executeMany(departmentIds);

    const userIds = doctors.map((d) => d.userId).filter((d) => d !== null);
    const users = await this._userRepository.findByIds("id", userIds);
    const userMap = new Map(users.map((u) => [u.id, u]));

    const { addressMap } = await this._addressDetailsService.executeMany(
      "Clinic",
      doctorIds,
    );

    const response: AdminDoctorInfo[] = doctors.map((doctor) => {
      const doctorClinicDetails = doctorClinicDetailsMap.get(doctor.id) ?? [];

      const userDetails = userMap.get(doctor?.userId) ?? null;

      const doctorAddressDetails = addressMap.get(doctor?.id ?? null) ?? null;

      const department = departmentMap.get(doctor.departmentId) ?? null;

      return {
        user: userDetails
          ? {
              email: userDetails.email,
              phone: userDetails.phone,
              isActive: userDetails.isActive,
              isBlocked: userDetails.isBlocked,
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
          licenceNumber: doctor.licenceNumber,
          specialization: doctor.specialization,
          qualification: doctor.qualification,
          experienceYears: doctor.experienceYears,
          averageRating: doctor.averageRating,
          totalReviews: doctor.totalReviews,
          registrationDoc: {
            url: doctor.registrationDoc.url,
            status: doctor.registrationDoc.status,
          },
          medicalLicenceDoc: {
            url: doctor.medicalLicenceDoc.url,
            status: doctor.medicalLicenceDoc.status,
          },
          profilePicture: {
            url: doctor.profilePicture.url,
          },
          status: doctor.status,
          reviewedAt: doctor.reviewedAt,
          reviewedMessage: doctor.reviewedMessage,
          reviewedReason: doctor.reviewedReason,
          createdAt: doctor.createdAt ?? null,
          updatedAt: doctor.updatedAt ?? null,
        },
        doctorClinicDetails,
        address: doctorAddressDetails
          ? {
              id: doctorAddressDetails.id,
              addressLine: doctorAddressDetails.addressLine,
              country: doctorAddressDetails.country,
              state: doctorAddressDetails.state,
              city: doctorAddressDetails.city,
              pincode: doctorAddressDetails.pincode,
              ownerId: doctorAddressDetails.ownerId,
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
