import type { Clinic } from "../../domain/entities/clinic.entity.ts";
import type { Department } from "../../domain/entities/department.entity.ts";
import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { DoctorClinic } from "../../domain/entities/doctor-clinic.entity.ts";
import type User from "../../domain/entities/user.entity.ts";
import type { DoctorReapplicationFiles } from "../../domain/types/doctor.types.ts";
import type {
  ApprovalPlainUrl,
  Gender,
  ImageData,
  PlainUrl,
  ServiceMode,
} from "../../domain/types/shared.types.ts";
import type { BaseAddress } from "./patient.dto.ts";
import type { DoctorReapplication } from "../../domain/entities/doctor-reapplication.entity.ts";
import type { SafeUser } from "./auth.dto.ts";
import { omit } from "zod/mini";
import type { SafeDoctorClinic } from "./doctor-clinic.dto.ts";
import type { SafeClinic } from "./clinic.dto.ts";
import type { Address } from "../../domain/entities/address.entity.ts";
import type { SafeAddress } from "./shared.dto.ts";

export interface ClinicDetails {
  id: string;
  name: string;
}

export interface DoctorStatusUpdateDto {
  id: string;
  rejectedReason: string;
  rejectedMessage: string;
  fields: string[];
}

export type SafeDoctor = Omit<
  Doctor,
  | "create"
  | "isPending"
  | "approve"
  | "register"
  | "reject"
  | "addLanguages"
  | "updateProfessionalDetails"
  | "updateProfilePicture"
  | "isDocumentMatch"
  | "verifyDocument"
  | "rejectDocument"
  | "update"
  | "submit"
>;

export type DoctorInfo = {
  user: Pick<User, "email" | "phone" | "isActive" | "isBlocked"> | null;
  doctor: Omit<
    SafeDoctor,
    | "userId"
    | "profilePicture"
    | "registrationDoc"
    | "medicalLicenceDoc"
    | "fieldsToReupload"
    | "subscription"
  > & {
    registrationDoc: ApprovalPlainUrl;
  } & {
    medicalLicenceDoc: ApprovalPlainUrl;
  } & {
    profilePicture: PlainUrl;
  };
  clinic:
    | (Pick<Clinic, "id" | "name" | "about" | "location" | "status"> & {
        clinicAddress: BaseAddress | null;
        registrationDoc: ApprovalPlainUrl;
        establishmentLicenceDoc: ApprovalPlainUrl;
      })
    | null;
  doctorClinic: Pick<
    SafeDoctorClinic,
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
  department: Pick<Department, "id" | "name"> | null;
};

export type DoctorDetailsDto = {
  user: User;
  doctor: Doctor;
  doctorClinic: SafeDoctorClinic;
  clinic: Clinic;
  address: Address;
};

export type DoctorReapplicationResponseDto = {
  reapplication: DoctorReapplication
};

export type DoctorProfileInfo = Omit<DoctorInfo, "user">;

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
  SafeDoctor,
  | "id"
  | "bio"
  | "gender"
  | "experienceYears"
  | "languages"
  | "qualification"
  | "specialization"
  | "licenceNumber"
  | "updatedAt"
> & { userId: string };

export type UpdateDoctorDto = Partial<
  Pick<
    SafeDoctor,
    | "bio"
    | "displayName"
    | "experienceYears"
    | "gender"
    | "licenceNumber"
    | "qualification"
    | "specialization"
  >
> & {
  id?: string | undefined;
  phone?: string;
  profilePicture?: Express.Multer.File[] | undefined;
  doctorRegistrationDoc?: Express.Multer.File[] | undefined;
  medicalLicenceDoc?: Express.Multer.File[] | undefined;
};

export type UpdateDoctorResponseDto = {
  doctor: Doctor;
  user: User;
};

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
> & { userId: string; updatedAt: Date | null };

export interface GetReapplicationDetailsResponseDto {
  doctor: SafeDoctor;
  clinicAddress: BaseAddress;
  fieldsToReupload: DoctorReapplication["fieldsToReupload"];
  reviewMessage: string | null;
  rejectionReason: string | null;
}

type ReapplicationData = Partial<DoctorRegisterDto>;

export interface DoctorUpdateReapplicationDto {
  data: ReapplicationData;
  files: DoctorReapplicationFiles;
  token: string;
}

export interface UpdateDoctorEntityDto {
  doctor: Doctor;
  user: User;
  updates: UpdateDoctorDto;
}
