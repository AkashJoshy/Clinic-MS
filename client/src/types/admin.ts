import type { EntityStatus, ServiceMode } from "./common"

export interface DepartmentData {
    id?: string
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

export type NotFoundProps = {
    name: string;
    description: string;
    toNavigate: string 
}
