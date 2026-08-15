import type { Clinic } from "../../domain/entities/Clinic.ts";
import type { Department } from "../../domain/entities/Department.ts";
import type { Doctor } from "../../domain/entities/Doctor.ts";
import type { DoctorClinic } from "../../domain/entities/DoctorClinic.ts";
import type User from "../../domain/entities/User.ts";
import type { DoctorStatus } from "../../domain/types/doctor.types.ts";
import type {
  Session,
  WeeklySchedule,
} from "../../domain/types/doctorClinic.types.ts";
import type {
  ApprovalStatus,
  DayOfWeek,
  EntityStatus,
  Gender,
  ImageData,
  PlainUrl,
  ServiceMode,
} from "../../domain/types/shared.types.ts";
import type { BaseAddress } from "./patient.dto.ts";

export interface ClinicDetails {
  id: string;
  name: string;
}

export interface DoctorStatusUpdateDto {
  id: string,
  reviewMessage: string
}

export type DoctorInfo = {
  user: Pick<User, "email" | "phone" | "isActive" | "isBlocked"> | null;
  doctor: Pick<
    Doctor,
    | "id"
    | "displayName"
    | "doctorCode"
    | "bio"
    | "languages"
    | "gender"
    | "licenceNumber"
    | "departmentId"
    | "specialization"
    | "qualification"
    | "experienceYears"
    | "averageRating"
    | "totalReviews"
    | "status"
    | "createdAt"
    | "updatedAt"
  > & {
    registrationDoc: PlainUrl;
  } & {
    medicalLicenceDoc: PlainUrl;
  } & {
    profilePicture: PlainUrl;
  };
  clinic: Pick<Clinic, "id" | "name" | "about" | "location"> & { clinicAddress: BaseAddress | null } | null;
  doctorClinic: Pick<
    DoctorClinic,
    | "id"
    | "type"
    | "consultationFee"
    | "schedule"
    | "slotDuration"
    | "timeZone"
    | "isActive"
    | "updatedAt" 
  > | null;
} & {
  address: BaseAddress | null;
} & {
  department: Pick<Department, "id" | "name"> | null
}

export type DoctorProfileInfo = Omit<DoctorInfo, "user">

export interface DoctorRegisterDto {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  gender: Gender;
  departmentId: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  licenceNumber: string;
  password: string;
  confirmPassword: string;
  clinicName: string;
  registrationNumber: string;
  about?: string;
  altPhone?: string;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  latitude: number;
  longitude: number;
  mode: ServiceMode;
  consultationFee: number;
  doctorProfilePicture?: Express.Multer.File[];
  clinicRegistrationDoc?: Express.Multer.File[];
  establishmentLicenceDoc?: Express.Multer.File[];
  medicalLicenceDoc?: Express.Multer.File[];
  doctorRegistrationDoc?: Express.Multer.File[];
}

export type DoctorProffesionalDetailsDto = Pick<
  Doctor,
  | "id"
  | "bio"
  | "gender"
  | "experienceYears"
  | "languages"
  | "qualification"
  | "specialization"
  | "licenceNumber"
  | "updatedAt"
> & { userId: string;}

export type DoctorConsultationDetailsDto = Pick<
  DoctorClinic,
  | "consultationFee"
  | "isActive"
  | "clinicId"
  | "id"
  | "doctorId"
  | "type"
  | "slotDuration"
  | "timeZone"
> & { userId: string, updatedAt: Date | null };
