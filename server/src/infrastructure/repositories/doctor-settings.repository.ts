import { Types } from "mongoose";

import { DoctorSettings } from "../../domain/entities/doctor-settings.entity.ts";
import { DoctorSettingsModel } from "../models/doctor-settings/doctor-settings.model.ts";

import type { IDoctorSettingsRepository } from "../../domain/repositories/i-doctor-settings.repository.ts";
import type { IDoctorSettings } from "../models/doctor-settings/doctor-settings.types.ts";

import { BaseRepository } from "./base/base.repository.ts";

export class DoctorSettingsRepository
  extends BaseRepository<DoctorSettings, IDoctorSettings>
  implements IDoctorSettingsRepository
{
  constructor() {
    super(DoctorSettingsModel);
  }

  protected toDomain(doc: IDoctorSettings): DoctorSettings {
    return DoctorSettings.create({
      id: doc._id.toString(),
      doctorId: doc.doctorId.toString(),
      profile: doc.profile,
      appearance: doc.appearance,
      notifications: doc.notifications,
      security: doc.security,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    })
  }

  protected toPersistence(entity: DoctorSettings): Partial<IDoctorSettings> {
    return {
      doctorId: new Types.ObjectId(entity.doctorId!),
      profile: entity.profile,
      appearance: entity.appearance,
      notifications: entity.notifications,
      security: entity.security,
    };
  }

  async findByDoctorId(doctorId: string): Promise<DoctorSettings | null> {
    const doc = await DoctorSettingsModel.findOne({
      doctorId: new Types.ObjectId(doctorId),
    }).lean()

    if (!doc) return null;

    return this.toDomain(doc);
  }

}
