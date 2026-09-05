import type { DepartmentData } from "./admin";
import type { ModeRoleRef, User } from "./user";
import type { Doctor } from "./doctor";
import type {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
  Control,
} from "react-hook-form";
import type { Role } from "./auth";
import type { DoctorClinic } from "./doctor-clinic";

export type UnderConstructionProps = {
  title: string;
  backTo: string;
  backLabel: string;
};

export type Type =
  | "text"
  | "email"
  | "number"
  | "password"
  | "select"
  | "textarea"
  | "file"
  | "tel"
  | "hidden"
  | "date"
  | "multi-select-days"
  | "multi-select-slots"
  | "multiselect"
  | "status-toggle";

export type Name =
  | "fullName"
  | "email"
  | "phone"
  | "password"
  | "confirmPassword"
  | "role"
  | "clinicName"
  | "tagline"
  | "clinicType"
  | "speciality"
  | "registrationNumber"
  | "yearEstablished"
  | "about"
  | "clinicPhoto"
  | "alternativePhone"
  | "specialty"
  | "experience"
  | "qualification"
  | "status";

export type Title = string;
export type PlaceHolder = string;
export type IsRequired = boolean;
export type Hidden = boolean;

export interface ClinicDetails {
  id: string;
  name: string;
  about: string;
}

type DoctorDetails = Omit<
  Doctor,
  | "departmentId"
  | "status"
  | "reviewedAt"
  | "reviewMessage"
  | "createdAt"
  | "updatedAt"
>;
type UserDetails = Omit<
  User,
  "email" | "role" | "provider" | "isEmailVerified" | "updatedAt"
>;
type DoctorClinicDetails = Omit<
  DoctorClinic,
  "timeZone" | "duration" | "updatedAt" | "createdAt"
>;

export interface DoctorProfile {
  clinicDetails: ClinicDetails;
  doctorClinic: DoctorClinicDetails;
  doctor: DoctorDetails;
  departmentDetails: DepartmentData;
  user: UserDetails;
  handleDelete: any;
}

export interface FormInputs<T extends FieldValues = FieldValues> {
  title: Title;
  type: Type;
  placeHolder: PlaceHolder;
  name: Path<T>;
  isRequired: IsRequired;
  hidden?: Hidden;
  isValue?: Role;
  options?: string[] | OptionItem[];
  isDisabled?: boolean;
}

export interface FormFieldsProps<T extends FieldValues> {
  fields: FormInputs<T>[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue?: UseFormSetValue<T>;
  control: Control<T>;
  containerClass?: string;
}

export interface OptionItem {
  label: string;
  value: string;
}

export type EntityStatus = "ACTIVE" | "INACTIVE";

export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AccountStatus = "APPROVED" | "SUSPENDED";

export type SessionStatus =
  | "AVAILABLE"
  | "PENDING"
  | "BOOKED"
  | "CANCELLED"
  | "COMPLETED"
  | "EXPIRED"
  | "UPCOMING"
  | "UNAVAILABLE"
  | "DAY_OFF"
  | "CONFIRMED"
  | "LIVE"
  | "MISSED"
  | "PENDING";

export type ServiceMode = "ONLINE" | "OFFLINE" | "BOTH";

export type UpdateMethods = "RESTORE" | "DELETE" | "BLOCK";

export type StateWithCode = {
  name: string;
  state_code: string;
};

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type ImageData = {
  url: string;
  publicId: string;
};

export type PlainUrl = {
  url: string;
};
