import type { ApprovalStatus, ImageData } from "./shared.types.ts";

export interface LocationType {
  type: "Point";
  coordinates: [longitude: number, latitude: number];
}

export type ClinicStatus = ApprovalStatus;

export interface RegisterClinicProps {
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