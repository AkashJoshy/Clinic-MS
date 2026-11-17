import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { PlatformSettings } from "../../domain/entities/platform-settings.entity.ts";
import type User from "../../domain/entities/user.entity.ts";
import type { DocumentField } from "../../domain/types/admin.types.ts";
import type {
  BusinessSettingsProps,
  GeneralSettingsProps,
  SystemSettingsProps,
} from "../../domain/types/platform-settings.types.ts";
import type {
  ApprovalStatus,
  EntityStatus,
} from "../../domain/types/shared.types.ts";
import type {
  AdminDoctorDetails,
  DoctorProfileResponseDto,
  MessageDto,
} from "./shared.dto.ts";

export interface UpdateClinicStatusDto {
  clinicId: string;
  status: ApprovalStatus;
  reviewedAt: Date;
  isActive: boolean;
  reviewMessage?: string;
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

export type UserStatusResponseDto = {
  userId: string;
  isActive: boolean;
  isBlocked: boolean;
} & MessageDto;

export type DepartmentStatusResponseDto = {
  departmentId: string;
  status: EntityStatus;
} & MessageDto;

export interface VerifyDocumentDto {
  id: string;
  action: "VERIFY" | "REJECT";
  documentField: DocumentField;
  url: string;
}

export type BasePlatformSettingsDto = Omit<PlatformSettings, "updateGeneral" | "updateBusiness" | "updateSystem">;

export type SafePlatformSettingsDto = Omit<
  BasePlatformSettingsDto,
  "createdBy" | "createdAt" | "updatedBy" | "updatedAt"
>;

export type PlatformSettingsResponseDto = SafePlatformSettingsDto;

export type UpdatePlatformSettingsDto =
  | {
      selection: "GENERAL";
      data: GeneralSettingsProps;
    }
  | {
      selection: "BUSINESS";
      data: BusinessSettingsProps;
    }
  | {
      selection: "SYSTEM";
      data: SystemSettingsProps;
    };

export type UpdatePlatformSettingsResponseDto = UpdatePlatformSettingsDto;
