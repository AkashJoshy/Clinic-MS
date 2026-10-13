import type { Doctor } from "../../../domain/entities/doctor.entity.ts";
import type { SafeDepartment } from "../../../domain/types/admin.types.ts";
import type { SafeUser } from "../../dto/auth.dto.ts";
import type { AdminDoctorFullInfoDto } from "../../dto/doctor.dto.ts";
import type { DoctorClinicContextDto, SafeAddress } from "../../dto/shared.dto.ts";

export class DoctorDetailsMapper {
  static toAdminDoctorFullInfo(
    doctor: Doctor,
    user: SafeUser | null,
    doctorClinicDetails: DoctorClinicContextDto[],
    doctorAddress: SafeAddress | null,
    department: SafeDepartment | null,
  ): AdminDoctorFullInfoDto {
    return {
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
      doctorClinicDetails: doctorClinicDetails.map((doctorClinic) => {
        const clinic = doctorClinic?.clinic
        const clinicAddress = doctorClinic?.clinicAddress
        return {
          id: doctorClinic.id,
          type: doctorClinic.type,
          consultationFee: doctorClinic.consultationFee,
          weeklySchedule: doctorClinic.weeklySchedule,
          exceptions: doctorClinic.exceptions,
          slotRules: doctorClinic.slotRules,
          timeZone: doctorClinic.timeZone,
          isActive: doctorClinic.isActive,
          updatedAt: doctorClinic.updatedAt,
          clinic: clinic
            ? {
                id: clinic.id,
                name: clinic.name,
                about: clinic.about,
                location: {
                  type: clinic.location.type,
                  coordinates: clinic.location.coordinates as [
                    number,
                    number,
                  ],
                },
                status: clinic.status,

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
                addressLine: clinicAddress.addressLine,
                country: clinicAddress.country,
                state: clinicAddress.state,
                city: clinicAddress.city,
                pincode: clinicAddress.pincode,
                ownerId: clinicAddress.ownerId,
              }
            : null,
        };
      }),
      address: doctorAddress
        ? {
            id: doctorAddress.id,
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