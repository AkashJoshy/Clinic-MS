import type { RouteRoleProps } from "../auth";

export type DepartmentDoctorFilterDetails = {
  id: string;
  name: string;
};

export interface DoctorFilterState {
  gender: "ALL" | "MALE" | "FEMALE" | "OTHERS" | "PREFER NOT TO SAY";
  department: DepartmentDoctorFilterDetails[];
  sortBy: "NEWEST" | "OLDEST" | "NAME_ASC" | "NAME_DESC";
}


export interface DoctorFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: DoctorFilterState;
  onApplyFilters: (filters: DoctorFilterState) => void;
  departments: DepartmentDoctorFilterDetails[];
  role: RouteRoleProps;
  isDark: boolean;
}