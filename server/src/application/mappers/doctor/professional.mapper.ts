import type { SafeUser } from "../../dto/auth.dto.ts";
import type {
  DoctorProfessionalResponseDto,
  SafeDoctor,
} from "../../dto/doctor.dto.ts";

export class DoctorProfessionalMapper {
  static toDoctorProffesionalDetails(
    professionalDetails: SafeDoctor,
    userId: NonNullable<SafeUser["id"]>,
  ): DoctorProfessionalResponseDto {
    const {
      id,
      bio,
      experienceYears,
      gender,
      languages,
      licenceNumber,
      qualification,
      specialization,
      updatedAt,
    } = professionalDetails;

    return {
      id,
      bio,
      experienceYears,
      gender,
      languages,
      licenceNumber,
      qualification,
      specialization,
      userId,
      updatedAt,
    }
  }
}
