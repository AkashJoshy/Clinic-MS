import type {
  DoctorClinicDetailsBasicDto,
  DoctorClinicDetailsBasicResponseDto,
  PatientDoctorDetailsDto,
  PatientDoctorDetailsResponseDto,
} from "../../dto/doctor.dto.ts";

export class DoctorMapper {
    
  static toPatientDoctorDetailsCard(
    doctorDetails: PatientDoctorDetailsDto,
  ): PatientDoctorDetailsResponseDto {
    const {
      id,
      gender,
      averageRating,
      totalReviews,
      displayName,
      profilePicture,
      experienceYears,
      status,
    } = doctorDetails.doctor;

    const doctorClinicDetails = doctorDetails.doctorClinicDetails;
    const department = doctorDetails.department;
    const address = doctorDetails.address;

    return {
      doctor: {
        id: id,
        gender: gender,
        averageRating: averageRating,
        totalReviews: totalReviews,
        experienceYears: experienceYears,
        displayName: displayName,
        profilePicture: profilePicture,
        status: status,
      },
      doctorClinicDetails: doctorClinicDetails,
      department: department ? department : null,
      address: address ? address : null,
    };
  }

  static toDoctorClinicDetailsBasic(
    doctorClinicDetails: DoctorClinicDetailsBasicDto,
  ): DoctorClinicDetailsBasicResponseDto {
    const { id, consultationFee, isActive, timeZone, type } =
      doctorClinicDetails;
    const clinic = doctorClinicDetails.clinic;

    return {
      id,
      consultationFee,
      isActive,
      timeZone,
      type,
      clinic: clinic
        ? {
            id: clinic.id,
            name: clinic.name,
            status: clinic.status,
          }
        : null,
    };
  }
}
