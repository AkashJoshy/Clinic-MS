import type { DoctorClinic } from "../../domain/entities/doctor-clinic.entity.ts";

export type SafeDoctorClinic = Omit<
  DoctorClinic,
  | "activate"
  | "addLeave"
  | "deactivate"
  | "activeStatus"
  | "removeLeave"
  | "updateLeave"
  | "updateSchedule"
  | "updateConsultationDetails"
>;