import type { SafeDoctorClinic } from "../../dto/doctor-clinic.dto.ts";
import type {
  DoctorConsultationDetailsDto,
  DoctorConsultationMapperDto,
} from "../../dto/doctor.dto.ts";

export class DoctorConsultationMapper {
  static toDoctorConsultationDetails(
    consultationDetails: DoctorConsultationMapperDto,
  ): DoctorConsultationDetailsDto {
    const { doctorClinic, doctorUpdatedAt, userId } = consultationDetails;
    const {
      id,
      clinicId,
      doctorId,
      consultationFee,
      isActive,
      timeZone,
      type,
    } = doctorClinic;

    return {
      id,
      userId,
      clinicId,
      doctorId,
      consultationFee,
      isActive,
      timeZone,
      type,
      updatedAt: doctorUpdatedAt,
    };
  }

  static toDomain(doctorClinic: SafeDoctorClinic) {
    const {
      id,
      doctorId,
      clinicId,
      createdAt,
      exceptions,
      slotRules,
      updatedAt,
      weeklySchedule,
      ...rest
    } = doctorClinic;

    return {
      ...rest,
    };
  }
}
