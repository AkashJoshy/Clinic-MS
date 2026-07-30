import type { Clinic } from "../../domain/entities/Clinic.ts";
import type { Doctor } from "../../domain/entities/Doctor.ts";
import type { DoctorClinic } from "../../domain/entities/DoctorClinic.ts";
import type User from "../../domain/entities/User.ts";
import type { DoctorStatus } from "../../domain/types/doctor.types.ts";
import type {
  Session,
  WeeklySchedule,
} from "../../domain/types/doctorClinic.types.ts";
import type {
  DayOfWeek,
  EntityStatus,
  Gender,
  ImageData,
  PlainUrl,
  ServiceMode,
} from "../../domain/types/shared.types.ts";
import type { BaseAddress } from "./patient.dto.ts";

export interface UpdateDoctorStatusDTO {
  doctorId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  reviewedAt: Date;
  reviewMessage?: string;
}

export interface ClinicDetails {
  id: string;
  name: string;
}


export type DoctorInfo = {
  doctor: Pick<
  Doctor,
  | "id"
  | "displayName"
  | "doctorCode"
  | "bio"
  | "languages"
  | "gender"
  | "departmentId"
  | "specialization"
  | "qualification"
  | "experienceYears"
  | "averageRating"
  | "totalReviews"
  | "status"
  | "createdAt"
  | "updatedAt"
>& {
    registrationDoc: PlainUrl;
  } & {
    medicalLicenceDoc: PlainUrl;
  } & {
    profilePicture: PlainUrl;
  };
  clinic: Pick<Clinic, "id" | "name" | "about" | "location">;
  doctorClinic: Pick<
    DoctorClinic,
    | "id"
    | "type"
    | "consultationFee"
    | "schedule"
    | "slotDuration"
    | "timeZone"
    | "isActive"
  >;
} & {
  address: BaseAddress | null;
}
