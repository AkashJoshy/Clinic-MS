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
          startTime: shift.startTime,
          endTime: shift.endTime,
          mode: shift.mode,
        })),
      })),
      exceptions: doc.exceptions
        ? {
            breaks: (doc.exceptions.breaks ?? []).map((br) => ({
              label: br.label.trim(),
              startTime: br.startTime,
              endTime: br.endTime,
            })),
            blackouts: (doc.exceptions.blackouts ?? []).map((blackout) => ({
              reason: blackout.reason.trim(),
              startDate: blackout.startDate,
              endDate: blackout.endDate,
            })),
            holidays: (doc.exceptions.holidays ?? []).map((holiday) => ({
              reason: holiday.reason,
              startDate: holiday.startDate,
              endDate: holiday.endDate,
            })),
            overrides: (doc.exceptions.overrides ?? []).map((override) => ({
              date: override.date,
              startTime: override.startTime,
              endTime: override.endTime,
            })),
          }
        : {
            breaks: [],
            holidays: [],
            blackouts: [],
            overrides: [],
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
          startTime: shift.startTime,
          endTime: shift.endTime,
          mode: shift.mode,
        })),
      })),
      exceptions: entity.exceptions
        ? {
            breaks: (entity.exceptions.breaks ?? []).map((br) => ({
              label: br.label,
              startTime: br.startTime,
              endTime: br.endTime,
            })),
            blackouts: (entity.exceptions.blackouts ?? []).map((blackout) => ({
              reason: blackout.reason,
              startDate: blackout.startDate,
              endDate: blackout.endDate,
            })),
            holidays: (entity.exceptions.holidays ?? []).map((holiday) => ({
              reason: holiday.reason,
              startDate: holiday.startDate,
              endDate: holiday.endDate,
            })),
            overrides: (entity.exceptions.overrides ?? []).map((override) => ({
              date: override.date,
              startTime: override.startTime,
              endTime: override.endTime,
            })),
          }
        : {
            breaks: [],
            holidays: [],
            blackouts: [],
            overrides: [],
          },
      slotRules: entity.slotRules,
      timeZone: entity.timeZone,
      isActive: entity.isActive,
      ...(entity.createdAt && { createdAt: entity.createdAt }),
      ...(entity.updatedAt && { updatedAt: entity.updatedAt }),
    };
  }
}
