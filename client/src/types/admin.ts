import type { EntityStatus, ServiceMode, UpdateMethods } from "./common"

export interface DepartmentData {
    id: string
    name: string
    status: EntityStatus,
    mode: ServiceMode
}

export type DepartmentDto = {
    id: string
} & Omit<DepartmentData, "mode" | "name">

export type AllApprovalsProps = {
    icon?: React.ElementType;
    name:  string
};

export type SelectedDept = Omit<DepartmentData, "mode">;

export type NotFoundProps = {
    name: string;
    description: string;
    toNavigate: string 
}

export interface DepartmentCardProps {
  department: DepartmentData;
  handleDelete: (
    data: SelectedDept & { action: UpdateMethods },
  ) => void;
}