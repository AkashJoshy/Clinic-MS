import type { ApprovalStatus, ImageData, VerifyImageData } from "./shared.types.ts";

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
  registrationDoc: VerifyImageData;
  establishmentLicenceDoc: VerifyImageData;
  location: LocationType;
  status: ClinicStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type UpdateClinicProps = Partial<
  Omit<
    RegisterClinicProps,
    "registrationDoc" | "establishmentLicenceDoc"
  > & {
    registrationDoc?: ImageData;
    establishmentLicenceDoc?: ImageData;
  }
>