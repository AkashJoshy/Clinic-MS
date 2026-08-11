import type { RelationToPatient } from "../../domain/constants/patient.constants.ts";
import type { Address } from "../../domain/entities/Address.ts";
import type Patient from "../../domain/entities/Patient.ts";
import type User from "../../domain/entities/User.ts";
import type { BasePatient } from "../../domain/types/patient.types.ts";
import type {
  AppointmentStatus,
  DayOfWeek,
  Gender,
  ImageData,
} from "../../domain/types/shared.types.ts";
import type {
  AddressOption,
  AdminDoctorDetails,
  DeleteMethods,
  DoctorProfileResponseDto,
} from "./shared.dto.ts";

export interface PatientDoctorProfileResponseDto extends DoctorProfileResponseDto {
  doctor: AdminDoctorDetails;
}

export interface LocationProps {
  latitude: number;
  longitude: number;
}

export interface LocationDto extends LocationProps {
  radius: number;
}

export type AddressDetails = Omit<
  Address,
  "createdAt" | "updatedAt" | "userId"
>;
type PatientDetails = Pick<Patient, "id" | "relation" | "displayName">;

export type BaseAddress = Omit<
  Address,
  "createdAt" | "updatedAt" | "ownerType" | "id"
>;

export type CreatePatientProfileDto = {
  userId: string;
  phone: string;
  displayName: string;
  relation: RelationToPatient;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
} & Omit<Address, "createdAt" | "updatedAt" | "ownerType" | "ownerId" | "id">;

export type UpdatePatientDto = Pick<
  Patient,
  "displayName" | "id" | "dateOfBirth" | "gender" | "medicalInformation"
> &
  Pick<User, "email" | "phone">;

export type PatientProfile = {
  patient: Omit<BasePatient, "imageUrl"> & {
    imageUrl: Omit<ImageData, "publicId">;
  };
} & {
  address: BaseAddress | null;
};

export interface PatientUpdateFields {
  fullName: string;
}

export interface DeletePatientDto {
  id: string,
  method: DeleteMethods
}

export interface UpdateProfilePictureDto {
  userId: string,
  ownerId: string,
  picture: Express.Multer.File
}
export interface UpdateProfilePictureResponseDto {
  ownerId: string,
  pictureUrl: string
}