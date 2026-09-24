import { BaseRepository } from "./base/base.repository.ts";
import type { IDoctorReapplicationRepository } from "../../domain/repositories/i-doctor-reapplication.repository.ts";
import {
  DoctorReapplicationModel,
  type IDoctorReapplication,
} from "../models/doctor-reapplication.model.ts";

import { DoctorReapplication } from "../../domain/entities/doctor-reapplication.entity.ts";
import mongoose, { Types } from "mongoose";

export class DoctorReapplicationRepository
  extends BaseRepository<DoctorReapplication, IDoctorReapplication>
  implements IDoctorReapplicationRepository
{
  constructor() {
    super(DoctorReapplicationModel);
  }

async findByDoctorId(
  doctorId: string,
): Promise<DoctorReapplication | null> {
  const document = await DoctorReapplicationModel.findOne({
    doctorId: new Types.ObjectId(doctorId),
    status: {
      $in: ["PENDING", "SUBMITTED"],
    },
  }).sort({
    createdAt: -1,
  });

  if (!document) {
    return null;
  }

  return this.toDomain(document);
}

  async findByTokenHash(
    tokenHash: string,
  ): Promise<DoctorReapplication | null> {
    const document = await DoctorReapplicationModel.findOne({
      tokenHash,
    });

    if (!document) {
      return null;
    }

    return this.toDomain(document);
  }

  protected toDomain(
    doc: IDoctorReapplication,
  ): DoctorReapplication {
    return DoctorReapplication.create({
      id: doc._id.toString(),
      doctorId: doc.doctorId ? doc.doctorId.toString() : null,
      tokenHash: doc.tokenHash,
      tokenExpiresAt: doc.tokenExpiresAt,
      status: doc.status,
      fieldsToReupload: doc.fieldsToReupload,
      reviewMessage: doc.reviewMessage,
      reviewedReason: doc.reviewedReason,
      submittedAt: doc.submittedAt,
      reviewedAt: doc.reviewedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toPersistence(
    entity: DoctorReapplication,
  ): Partial<IDoctorReapplication> {
    return {
      doctorId: entity.doctorId ? new Types.ObjectId(entity.doctorId) : null,
      tokenHash: entity.tokenHash,
      tokenExpiresAt: entity.tokenExpiresAt,
      status: entity.status,
      fieldsToReupload: entity.fieldsToReupload,
      reviewMessage: entity.reviewMessage,
      reviewedReason: entity.reviewedReason,
      submittedAt: entity.submittedAt,
      reviewedAt: entity.reviewedAt,
    };
  }
}