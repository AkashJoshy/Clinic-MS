import type { Address } from "../../domain/entities/address.entity.ts";
import type { Clinic } from "../../domain/entities/clinic.entity.ts";
import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { DoctorClinic } from "../../domain/entities/doctor-clinic.entity.ts";
import type Patient from "../../domain/entities/patient.entity.ts";
import type User from "../../domain/entities/user.entity.ts";
import type { ImageData } from "../../domain/types/shared.types.ts";
import type { DepartmentDto } from "./admin.dto.ts";
import type { ClinicDetails } from "./doctor.dto.ts";
import type { PatientProfile } from "./patient.dto.ts";

type DoctorClinicDetails = Omit<
  DoctorClinic,
  "timeZone" | "duration" | "updatedAt" | "createdAt" | "clinicId" | "doctorId"
>;
export type ClinicDoctorDetails = Omit<
  Doctor,
  "departmentId" | "status" | "createdAt" | "updatedAt" | "certificate"
> & {
  certificate: string;
};

export type AdminDoctorDetails = Omit<
  Doctor,
  | "departmentId"
  | "status"
  | "createdAt"
  | "updatedAt"
  | "gender"
  | "licenceNumber"
  | "certificate"
>;

type UserDetails = Omit<
  User,
  | "role"
  | "provider"
  | "isEmailVerified"
  | "updatedAt"
  | "password"
  | "isBlocked"
  | "isActive"
  | "isTwoFactorenabled"
>;

export interface DoctorProfileResponseDto {
  clinicDetails: ClinicDetails | null;
  doctorClinic: DoctorClinicDetails;
  departmentDetails: DepartmentDto | null;
  user: UserDetails;
  address: Omit<BaseAddress, "ownerId"> | null;
}

export type DoctorProfileServiceResponseDto = DoctorProfileResponseDto & {
  doctor: Omit<ClinicDoctorDetails, "certificate"> & {
    certificate: string;
  };
};

export interface ClinicWithDetailsDto {
  clinic: Clinic;
  user: Omit<User, "password"> | null;
  address: Address | null;
}

type BaseAddress = Omit<
  Address,
  "updatedAt" | "createdAt" | "id" | "ownerType"
>;

export type UpdateAddressDto = BaseAddress;

export type AddressOption = "PRIMARY" | "NEW";

export type DeleteMethods = "RESTORE" | "DELETE" | "BLOCK";

export type PatientInfoDto = PatientProfile & {
  user: Pick<
    User,
    "email" | "phone" | "createdAt" | "isActive" | "isEmailVerified"
  >;
};

export type PatientFullDetailsDto = {
  user: Omit<User, "password" | "block" | "unblock" | "create"> | null;
  patient: Patient;
  address: Address | null;
};

export type PatientBasicInfoDto = {
  patient: Pick<
    Patient,
    | "id"
    | "displayName"
    | "patientNumber"
    | "medicalInformation"
    | "gender"
    | "userId"
    | "createdAt"
  > & {
    imageUrl: Omit<ImageData, "publicId">;
  };
} & {
  user: Pick<User, "email" | "phone" | "isActive" | "isBlocked"> | null;
};

export type MessageDto = {
  message: string;
};
