import type { Address } from "../../domain/entities/address.entity.ts";
import type { Clinic } from "../../domain/entities/clinic.entity.ts";
import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { DoctorClinic } from "../../domain/entities/doctor-clinic.entity.ts";
import type Patient from "../../domain/entities/patient.entity.ts";
import type User from "../../domain/entities/user.entity.ts";
import type { ImageData } from "../../domain/types/shared.types.ts";
import type { ClinicDetails } from "./doctor.dto.ts";
import type { PatientProfile, UpdateAddress } from "./patient.dto.ts";
import type { SafeClinic } from "./clinic.dto.ts";
import type { SafeDoctorClinic } from "./doctor-clinic.dto.ts";
import type { SafeDepartment } from "../../domain/types/admin.types.ts";
import type { SafeUser } from "./auth.dto.ts";
import type { SafeWallet } from "../../domain/types/wallet.types.ts";
import type { ownerModel } from "../../domain/enums/user.enums.ts";
import type { SafeWalletTransaction } from "../../domain/types/wallet-transaction.types.ts";
import type { DepartmentDto, SafeDepartmentDto } from "./department.dto.ts";

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

export type SafeAddress = Omit<Address, "update">;

export type AddressDetailsResponseDto = SafeAddress

export type FullAddressResponseDto = Address

type BaseAddress = Omit<
  Address,
  "updatedAt" | "createdAt" | "id" | "ownerType" | "update"
>;

export type UpdateAddressDto = BaseAddress;

export type AddressOption = "PRIMARY" | "NEW";

export type DeleteMethods = "RESTORE" | "DELETE" | "BLOCK";

export type PatientFullDetailsDto = {
  user: Omit<
    SafeUser,
    "password" | "block" | "unblock" | "create" | "updateName" | "updatePhone"
  > | null;
  patient: Patient;
  address: SafeAddress | null;
};

export type PatientFullResponseDto = PatientFullDetailsDto

export type MessageDto = {
  message: string;
};

export interface UpdateAddressEntityDto {
  address: Address;
  updates: Partial<UpdateAddress>;
}


export type AddressLookupResultDto = {
  addresses: SafeAddress[];
  addressMap: Map<string | null, SafeAddress>;
};


export type DepartmentLookupResultDto = {
  departments: SafeDepartmentDto[];
  departmentMap: Map<string | null, SafeDepartmentDto>;
};

export type DoctorClinicDetailsResponseDto = {
  doctorClinics: DoctorClinic[];
  doctorClinicMap: Map<string | null, DoctorClinic[]>;
};

