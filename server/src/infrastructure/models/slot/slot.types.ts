import type { Types, Document } from "mongoose";
import type { ServiceMode } from "../../../domain/types/shared.types.ts";
import type { SlotStatus } from "../../../domain/types/doctor-clinic.types.ts";

export interface ISlot extends Document {
  doctorId: Types.ObjectId;
  clinicId: Types.ObjectId;
  doctorClinicId: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  mode: ServiceMode;
  status: SlotStatus;
  createdAt: Date;
  updatedAt: Date;
}