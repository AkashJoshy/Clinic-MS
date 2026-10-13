import { type Document } from "mongoose";
import type { ApprovalStatus, VerifyImageData } from "../../../domain/types/shared.types.ts";


export interface IClinic extends Document {
  name: string;
  registrationNumber: string;
  about: string;
  altPhone: string | null;
  registrationDoc: VerifyImageData;
  establishmentLicenceDoc: VerifyImageData;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  status: ApprovalStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
}
