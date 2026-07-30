import mongoose, { Document, Model, Schema } from "mongoose";
import type {
  Leave,
  WeeklySchedule,
} from "../../domain/types/doctorClinic.types.ts";
import type { ServiceMode } from "../../domain/types/shared.types.ts";
import { LeaveSchema, SessionSchema, WeeklyScheduleSchema } from "./base.schema.ts";
import { DAYS } from "../../domain/constants/doctor.constants.ts";

export interface IDoctorClinic extends Document {
  clinicId: mongoose.Types.ObjectId | null;
  doctorId: mongoose.Types.ObjectId | null;
  consultationFee: number;
  type: ServiceMode;
  schedule: WeeklySchedule[];
  leaves: Leave[];
  slotDuration: number;
  timeZone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}


const DoctorClinicSchema = new Schema<IDoctorClinic>(
  {
    clinicId: {
      type: Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["OFFLINE", "ONLINE", "BOTH"],
      required: true,
    },
    schedule: {
      type: [WeeklyScheduleSchema],
      default: [],
    },
    leaves: {
      type: [LeaveSchema],
      default: [],
    },
    slotDuration: {
      type: Number,
      required: true,
      default: 30,
      min: 5,
    },
    timeZone: {
      type: String,
      required: true,
      default: "UTC",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);


DoctorClinicSchema.index({ doctorId: 1 });

DoctorClinicSchema.index({ clinicId: 1 });

DoctorClinicSchema.index({ clinicId: 1, isActive: 1 });

const DoctorClinicModel: Model<IDoctorClinic> = mongoose.model<IDoctorClinic>(
  "DoctorClinic",
  DoctorClinicSchema,
);

export default DoctorClinicModel;
