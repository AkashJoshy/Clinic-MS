import type { LucideIcon } from "lucide-react";
import type {
  ApprovalStatus,
  EntityStatus,
  FileUpdateMethods,
  ServiceMode,
  UpdateMethods,
} from "./common";
import type {
  BusinessSettings,
  GeneralSettings,
  GeneralSettingsData,
  SystemSettings,
} from "./admin-settings";

export interface DepartmentData {
  id: string;
  name: string;
  status: EntityStatus;
  mode: ServiceMode;
}

export type DepartmentDto = {
  id: string;
} & Omit<DepartmentData, "mode" | "name">;

export type AllApprovalsProps = {
  icon?: React.ElementType;
  name: string;
  isDark: boolean
};

export type SelectedDept = Omit<DepartmentData, "mode">;

export type SelectedDocument = {
  id: string;
  name: string;
  action: FileUpdateMethods;
  status: ApprovalStatus;
};

export type NotFoundProps = {
  name: string;
  description: string;
  toNavigate: string;
};

export interface DepartmentCardProps {
  department: DepartmentData;
  handleDelete: (data: SelectedDept & { action: UpdateMethods }) => void;
  isDark: boolean
}

export type PatientDetailsTab =
  | "overview"
  | "appointments"
  | "medical-records"
  | "reviews";

export type DoctorManagementTab = "all" | "pending" | "rejected";

export interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isDark: boolean
}

export interface DocumentPreviewModalProps {
  previewImage: string | null;
  onClose: () => void;
  isDark: boolean
}

export type UpdatePlatformSettingsData =
  | {
      selection: "GENERAL";
      data: GeneralSettingsData;
    }
  | {
      selection: "BUSINESS";
      data: BusinessSettings;
    }
  | {
      selection: "SYSTEM";
      data: SystemSettings;
    };

export type GetAllDepartmentsQueryParams = {
  search?: string | undefined;
  sortBy?: string | undefined;
  limit?: number | undefined;
  page?: number | undefined;
};
