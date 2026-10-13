import mongoose, { Types } from "mongoose";
import { DoctorClinic } from "../../domain/entities/doctor-clinic.entity.ts";
import { BaseRepository } from "./base/base.repository.ts";
import type { IDoctorClinicRepository } from "../../domain/repositories/i-doctor-clinic.repository.ts";
import type { IDoctorClinic } from "../models/doctor-clinic/doctor.clinic.types.ts";
import { DoctorClinicModel } from "../models/doctor-clinic/doctor-clinic.model.ts";

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
      weeklySchedule: Object.values(doc.weeklySchedule).map((schedule) => ({
        dayOfWeek: schedule.dayOfWeek,
        shifts: schedule.shifts.map((shift) => ({
          id: shift._id.toString(),
          startTime: shift.startTime,
          endTime: shift.endTime,
          mode: shift.mode,
        })),
      })),
      exceptions: doc.exceptions ? {
        breaks: (doc.exceptions.breaks ?? []).map((br) => ({
          id: br._id.toString(),
          label: br.label.trim(),
          startTime: br.startTime,
          endTime: br.endTime,
        })),
        vacations: (doc.exceptions.vacations ?? []).map((vacation) => ({
          id: vacation._id.toString(),
          reason: vacation.reason.trim(),
          startDate: vacation.startDate,
          endDate: vacation.endDate,
        })),
        blackouts: (doc.exceptions.blackouts ?? []).map((blackout) => ({
          id: blackout._id.toString(),
          reason: blackout.reason.trim(),
          startDate: blackout.startDate,
          endDate: blackout.endDate,
        })),
        holidays: (doc.exceptions.holidays ?? []).map((holiday) => ({
          id: holiday._id.toString(),
          reason: holiday.reason,
          startDate: holiday.startDate,
          endDate: holiday.endDate,
        })),
        overrides: (doc.exceptions.overrides ?? []).map((override) => ({
          id: override._id.toString(),
          date: override.date,
          startTime: override.startTime,
          endTime: override.endTime,
        })),
      }: {
        breaks: [],
        holidays: [],
        vacations: [],
        blackouts: [],
        overrides: []
      },
      slotRules: doc.slotRules,
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
      weeklySchedule: Object.values(entity.weeklySchedule).map((schedule) => ({
        dayOfWeek: schedule.dayOfWeek,
        shifts: schedule.shifts.map((shift) => ({
          _id: new mongoose.Types.ObjectId(shift.id) ?? null,
          startTime: shift.startTime,
          endTime: shift.endTime,
          mode: shift.mode,
        })),
      })),
      exceptions: entity.exceptions ? {
        breaks: (entity.exceptions.breaks ?? []).map((br) => ({
          _id: br.id
            ? new mongoose.Types.ObjectId(br.id)
            : new mongoose.Types.ObjectId(),
          label: br.label,
          startTime: br.startTime,
          endTime: br.endTime,
        })),
        vacations: (entity.exceptions.vacations ?? []).map((vacation) => ({
          _id: vacation.id
            ? new mongoose.Types.ObjectId(vacation.id)
            : new mongoose.Types.ObjectId(),
          reason: vacation.reason,
          startDate: vacation.startDate,
          endDate: vacation.endDate,
        })),
        blackouts: (entity.exceptions.blackouts ?? []).map((blackout) => ({
          _id: blackout.id
            ? new mongoose.Types.ObjectId(blackout.id)
            : new mongoose.Types.ObjectId(),
          reason: blackout.reason,
          startDate: blackout.startDate,
          endDate: blackout.endDate,
        })),
        holidays: (entity.exceptions.holidays ?? []).map((holiday) => ({
          _id: holiday.id
            ? new mongoose.Types.ObjectId(holiday.id)
            : new mongoose.Types.ObjectId(),
          reason: holiday.reason,
          startDate: holiday.startDate,
          endDate: holiday.endDate,
        })),
        overrides: (entity.exceptions.overrides ?? []).map((override) => ({
          _id: override.id
            ? new mongoose.Types.ObjectId(override.id)
            : new mongoose.Types.ObjectId(),
          date: override.date,
          startTime: override.startTime,
          endTime: override.endTime,
        })),
      } : {
        breaks: [],
        holidays: [],
        vacations: [],
        blackouts: [],
        overrides: []
      },
      slotRules: entity.slotRules,
      timeZone: entity.timeZone,
      isActive: entity.isActive,
      ...(entity.createdAt && { createdAt: entity.createdAt }),
      ...(entity.updatedAt && { updatedAt: entity.updatedAt }),
    };
  }
}
