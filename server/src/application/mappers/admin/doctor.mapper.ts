import type {
  AdminDoctorFullInfoDto,
  AdminDoctorInfoDto,
  DoctorDetailsCardResponseDto,
} from "../../dto/doctor.dto.ts";

export class DoctorMapper {
  static toDoctorDetailsCard(doctorDetails: AdminDoctorFullInfoDto) {
    const response: DoctorDetailsCardResponseDto = (() => {
      const { user, address, department, doctor, doctorClinicDetails } =
        doctorDetails;

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
    })();
    return response;
  }

  static toAdminDoctorInfo(
    doctorDetails: AdminDoctorFullInfoDto,
  ): AdminDoctorInfoDto {
    const { user, doctor, doctorClinicDetails, department, address } =
      doctorDetails;

    return {
      user,
      doctor: {
        id: doctor.id,
        doctorCode: doctor.doctorCode,
        profilePicture: doctor.profilePicture,
        registrationDoc: doctor.registrationDoc,
        medicalLicenceDoc: doctor.medicalLicenceDoc,
        displayName: doctor.displayName,
        gender: doctor.gender,
        status: doctor.status,
        departmentId: doctor.departmentId,
        reviewedAt: doctor.reviewedAt,
        reviewedMessage: doctor.reviewedMessage,
        createdAt: doctor.createdAt,
        averageRating: doctor.averageRating,
        bio: doctor.bio,
        experienceYears: doctor.experienceYears,
        languages: doctor.languages,
        licenceNumber: doctor.licenceNumber,
        qualification: doctor.qualification,
        reviewedReason: doctor.reviewedReason,
        specialization: doctor.specialization,
        totalReviews: doctor.totalReviews,
        updatedAt: doctor.updatedAt,
      },
      department,
      doctorClinicDetails: doctorClinicDetails.map((doctorClinic) => ({
        id: doctorClinic.id,
        type: doctorClinic.type,
        consultationFee: doctorClinic.consultationFee,
        isActive: doctorClinic.isActive,
        timeZone: doctorClinic.timeZone,
        clinic: doctorClinic.clinic
          ? {
              id: doctorClinic.clinic.id,
              name: doctorClinic.clinic.name,
              about: doctorClinic.clinic.about,
              location: doctorClinic.clinic.location,
              status: doctorClinic.clinic.status,
              registrationDoc: doctorClinic.clinic.registrationDoc,
              establishmentLicenceDoc:
                doctorClinic.clinic.establishmentLicenceDoc,
            }
          : null,
        clinicAddress: doctorClinic.clinicAddress
          ? doctorClinic.clinicAddress
          : null,
        updatedAt: doctorClinic.updatedAt,
      })),
      address: address ? address : null,
    };
  }
}
