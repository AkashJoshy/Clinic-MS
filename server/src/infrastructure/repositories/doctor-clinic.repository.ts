import mongoose from "mongoose";
import { DoctorClinic } from "../../domain/entities/doctor-clinic.entity.ts";
import DoctorClinicModel, {
  type IDoctorClinic,
} from "../models/doctor-clinic.model.ts";
import { BaseRepository } from "./base/base.repository.ts";
import type { IDoctorClinicRepository } from "../../domain/repositories/i-doctor-clinic.repository.ts";

export class DoctorClinicRepository
  extends BaseRepository<DoctorClinic, IDoctorClinic>
  implements IDoctorClinicRepository
{
  constructor() {
    super(DoctorClinicModel);
  }

  async findByClinicIds(ids: string[]): Promise<DoctorClinic[] | []> {
    if (!ids.length) return [];

    const docs = await DoctorClinicModel.find({
      clinicId: {
        $in: ids.map((id) => new mongoose.Types.ObjectId(id)),
      },
    });

    return docs.map((doc) => this.toDomain(doc));
  }

  protected toDomain(doc: IDoctorClinic): DoctorClinic {
    return DoctorClinic.create({
      id: doc._id.toString() ?? null,
      clinicId: doc.clinicId?.toString() ?? null,
      doctorId: doc.doctorId?.toString() ?? null,
      consultationFee: doc.consultationFee,
      type: doc.type,
      schedule: doc.schedule,
      leaves: doc.leaves.map((leave) => ({
        id: leave.id,
        startDate: leave.startDate,
        endDate: leave.endDate,
        reason: leave.reason,
        isFullDay: leave.isFullDay,
        startTime: leave.startTime,
        endTime: leave.endTime,
        status: leave.status,
        createdAt: leave.createdAt,
      })),
      slotDuration: doc.slotDuration,
      timeZone: doc.timeZone,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toPersistence(entity: DoctorClinic): Partial<IDoctorClinic> {
    return {
      clinicId: entity.clinicId
        ? new mongoose.Types.ObjectId(entity.clinicId)
        : null,

      doctorId: entity.doctorId
        ? new mongoose.Types.ObjectId(entity.doctorId)
        : null,

      consultationFee: entity.consultationFee,
      type: entity.type,
      schedule: entity.schedule,

      leaves: entity.leaves.map((leave) => ({
        id: leave.id,
        startDate: leave.startDate,
        endDate: leave.endDate,
        reason: leave.reason,
        isFullDay: leave.isFullDay,
        startTime: leave.startTime,
        endTime: leave.endTime,
        status: leave.status,
        createdAt: leave.createdAt,
      })),

      slotDuration: entity.slotDuration,
      timeZone: entity.timeZone,
      isActive: entity.isActive,

      ...(entity.createdAt && { createdAt: entity.createdAt }),
      ...(entity.updatedAt && { updatedAt: entity.updatedAt }),
    };
  }
}
