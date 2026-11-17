import type mongoose from "mongoose";
import type { Document } from "mongoose";
import type { ModeRoleRef } from "../../../domain/types/user.types.ts";
import type {
  BankAccountType,
  KycStatus,
} from "../../../domain/types/kyc.types.ts";
import type { ImageData } from "../../../domain/types/shared.types.ts";

export interface IKycPan {
  panNumber: string;
  nameOnPan: string;
  dateOfBirth: string;
  panCardDoc: ImageData;
  status: KycStatus;
  rejectionReason: string | null;
}

export interface IKycBank {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: BankAccountType;
  status: KycStatus;
  rejectionReason: string | null;
}

export interface IKycAadhaar {
  aadhaarNumber: string;
  nameOnAadhaar: string;
  aadhaarCardDoc: ImageData;
  status: KycStatus;
  rejectionReason: string | null;
}

export interface IKyc extends Document {
  ownerId: mongoose.Types.ObjectId;
  ownerType: ModeRoleRef;
  pan: IKycPan;
  bank: IKycBank;
  aadhaar: IKycAadhaar;
  createdAt: Date | null;
  updatedAt: Date | null;
}
