import type { EntityStatus, ServiceMode } from "./shared.types.ts";

export interface registerDepartment {
  id: string | null;
  name: string;
  status: EntityStatus;
  mode: ServiceMode;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type RegistrationDocumentField = "registrationDoc"
export type DoctorDocumentField = RegistrationDocumentField | "medicalLicenceDoc"
export type ClinicDocumentField = RegistrationDocumentField | "establishmentLicenceDoc"
export type DocumentField = RegistrationDocumentField | "medicalLicenceDoc" | "establishmentLicenceDoc"
