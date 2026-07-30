import type { Doctor } from "../../domain/entities/Doctor.ts";
import type User from "../../domain/entities/User.ts";
import type {
  ApprovalStatus,
  DayOfWeek,
  EntityStatus,
  Gender,
  ImageData,
  ServiceMode,
} from "../../domain/types/shared.types.ts";
import type { UpdateDto } from "./auth.dto.ts";
import type { AvailabilitySlot, AvailabilitySlotsWithServiceMode, DoctorDto } from "./doctor.dto.ts";
import type {
  AdminDoctorDetails,
  DoctorProfileResponseDto,
} from "./shared.dto.ts";

export interface UpdateClinicStatusDto {
  clinicId: string;
  status: ApprovalStatus;
  reviewedAt: Date;
  isActive: boolean;
  reviewMessage?: string;
}

export interface CreateDepartmentDto {
  name: string;
  status: EntityStatus;
  mode: ServiceMode;
}

export type GetDepartmentDto = Omit<CreateDepartmentDto, "mode" | "name"> & {
  id?: string;
};

export type DepartmentDto = CreateDepartmentDto & {
  id: string | null
}

export interface UpdateDoctorStatusDTO {
  doctorId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  reviewedAt: Date;
  reviewMessage?: string;
}

export type DoctorDetails = Doctor & {
  user: Omit<User, "password"> | null;
};

export interface AdminDoctorProfileResponseDto extends DoctorProfileResponseDto {
  doctor: AdminDoctorDetails;
}

export type RegisterDoctorDTO = DoctorDto

export type UpdateDoctorDto
  = Omit<DoctorDto, "certificate" | "availabilitySlot" | "fullName" | "email" | "phone" | "licenceDocument"> & {
  certificate: ImageData;
  availabilitySlots: AvailabilitySlotsWithServiceMode;
} & UpdateDto