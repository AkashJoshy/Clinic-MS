import type { ApprovalStatus, ImageData } from "./common";

export interface LocationType {
  type: "Point";
  coordinates: [longitude: number, latitude: number];
}

export type ClinicStatus = ApprovalStatus

export interface Clinic {
  id: string | null;
  name: string;
  registrationNumber: string;
  about: string;
  altPhone: string | null,
  yearOfEstablished: number;
  registrationDoc: ImageData;
  establishmentLicenceDoc: ImageData;
  location: LocationType;
  status: ClinicStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
}

