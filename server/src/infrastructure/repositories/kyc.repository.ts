import mongoose from "mongoose";
import { Kyc } from "../../domain/entities/kyc.entity.ts";
import { BaseRepository } from "./base/base.repository.ts";
import type { IKycRepository } from "../../domain/repositories/i-kyc.repository.ts";
import type { IKyc } from "../models/kyc/kyc.types.ts";
import { KycModel } from "../models/kyc/kyc.model.ts";
import type { KycUserRole } from "../../domain/types/kyc.types.ts";
import type { ModeRoleRef } from "../../domain/types/user.types.ts";

const ROLE_TO_OWNER_TYPE: Record<KycUserRole, ModeRoleRef> = {
  PATIENT: "Patient",
  DOCTOR: "Doctor",
  ADMIN: "Admin",
} as Record<KycUserRole, ModeRoleRef>;

const OWNER_TYPE_TO_ROLE: Partial<Record<string, KycUserRole>> = {
  Patient: "PATIENT",
  Doctor: "DOCTOR",
  Admin: "ADMIN",
};

export class KycRepository
  extends BaseRepository<Kyc, IKyc>
  implements IKycRepository
{
  constructor() {
    super(KycModel);
  }

  async findByUserId(userId: string): Promise<Kyc | null> {
    const doc = await KycModel.findOne({
      ownerId: new mongoose.Types.ObjectId(userId),
    });

    return doc ? this.toDomain(doc) : null;
  }

  protected toDomain(doc: IKyc): Kyc {
    return Kyc.create({
      id: doc._id.toString(),
      userId: doc.ownerId?.toString() ?? undefined,
      role: OWNER_TYPE_TO_ROLE[doc.ownerType]!,
      pan: {
        section: "KYC_PAN",
        panNumber: doc.pan?.panNumber ?? "",
        nameOnPan: doc.pan?.nameOnPan ?? "",
        dateOfBirth: doc.pan?.dateOfBirth ?? "",
        panCardDoc: doc.pan?.panCardDoc ?? { publicId: "", url: "" },
        status: doc.pan?.status ?? "NOT_SUBMITTED",
        rejectionReason: doc.pan?.rejectionReason ?? null,
      },
      bank: {
        section: "KYC_BANK",
        accountHolderName: doc.bank?.accountHolderName ?? "",
        accountNumber: doc.bank?.accountNumber ?? "",
        ifscCode: doc.bank?.ifscCode ?? "",
        bankName: doc.bank?.bankName ?? "",
        accountType: doc.bank?.accountType ?? "SAVINGS",
        status: doc.bank?.status ?? "NOT_SUBMITTED",
        rejectionReason: doc.bank?.rejectionReason ?? null,
      },
      aadhaar: {
        section: "KYC_AADHAAR",
        aadhaarNumber: doc.aadhaar?.aadhaarNumber ?? "",
        nameOnAadhaar: doc.aadhaar?.nameOnAadhaar ?? "",
        aadhaarCardDoc: doc.aadhaar?.aadhaarCardDoc ?? {
          publicId: "",
          url: "",
        },
        status: doc.aadhaar?.status ?? "NOT_SUBMITTED",
        rejectionReason: doc.aadhaar?.rejectionReason ?? null,
      },
      createdAt: doc.createdAt ?? null,
      updatedAt: doc.updatedAt ?? null,
    });
  }

  protected toPersistence(entity: Kyc): Partial<IKyc> {
    return {
      ownerId: new mongoose.Types.ObjectId(entity.userId!),
      ownerType: ROLE_TO_OWNER_TYPE[entity.role!],
      pan: {
        panNumber: entity.pan.panNumber,
        nameOnPan: entity.pan.nameOnPan,
        dateOfBirth: entity.pan.dateOfBirth,
        panCardDoc: entity.pan.panCardDoc,
        status: entity.pan.status,
        rejectionReason: entity.pan.rejectionReason,
      },
      bank: {
        accountHolderName: entity.bank.accountHolderName,
        accountNumber: entity.bank.accountNumber,
        ifscCode: entity.bank.ifscCode,
        bankName: entity.bank.bankName,
        accountType: entity.bank.accountType,
        status: entity.bank.status,
        rejectionReason: entity.bank.rejectionReason,
      },
      aadhaar: {
        aadhaarNumber: entity.aadhaar.aadhaarNumber,
        nameOnAadhaar: entity.aadhaar.nameOnAadhaar,
        aadhaarCardDoc: entity.aadhaar.aadhaarCardDoc,
        status: entity.aadhaar.status,
        rejectionReason: entity.aadhaar.rejectionReason,
      },
      ...(entity.createdAt && { createdAt: entity.createdAt }),
      ...(entity.updatedAt && { updatedAt: entity.updatedAt }),
    };
  }
}
