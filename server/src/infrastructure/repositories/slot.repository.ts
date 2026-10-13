import { Types } from "mongoose";
import { BaseRepository } from "./base/base.repository.ts";
import type { ISlotRepository } from "../../domain/repositories/i-slot.repository.ts";
import { SlotModel } from "../models/slot/slot.model.ts";

import { Slot } from "../../domain/entities/slot.entity.ts";
import type { ISlot } from "../models/slot/slot.types.ts";

export class SlotRepository
  extends BaseRepository<Slot, ISlot>
  implements ISlotRepository
{
  constructor() {
    super(SlotModel);
  }

  protected toDomain(doc: ISlot): Slot {
    return Slot.create({
      id: doc._id.toString() ?? null,
      doctorId: doc.doctorId.toString(),
      clinicId: doc.clinicId.toString(),
      doctorClinicId: doc.doctorClinicId.toString(),
      date: doc.date,
      startTime: doc.startTime,
      endTime: doc.endTime,
      mode: doc.mode,
      status: doc.status,
      createdAt: doc.createdAt ?? null,
      updatedAt: doc.updatedAt ?? null,
    });
  }

  protected toPersistence(entity: Slot): Partial<ISlot> {
    return {
      doctorId: new Types.ObjectId(entity.doctorId),
      clinicId: new Types.ObjectId(entity.clinicId),
      doctorClinicId: new Types.ObjectId(entity.doctorClinicId),
      date: entity.date,
      startTime: entity.startTime,
      endTime: entity.endTime,
      mode: entity.mode,
      status: entity.status,
    };
  }
}
