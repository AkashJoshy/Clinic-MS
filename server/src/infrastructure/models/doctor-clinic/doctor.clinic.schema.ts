import { Schema } from "mongoose";
import type {
  IDoctorClinic,
  IPersistenceBreak,
  IPersistenceExceptions,
  IPersistenceOneTimeAvailability,
  IPersistenceSchedule,
  IPersistenceShift,
  IPersistenceWeeklySchedule,
} from "./doctor.clinic.types.ts";
import { SERVICE_MODE } from "../../../domain/constants/shared.constants.ts";
import { SlotRulesSchema } from "../shared/shared.schema.ts";
import { DAYS } from "../../../domain/constants/doctor.constants.ts";

export const ShiftSchema = new Schema<IPersistenceShift>({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: SERVICE_MODE,
    required: true,
  },
});

export const BreakSchema = new Schema<IPersistenceBreak>(
  {
    label: {
      type: String,
      default: null,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
  },
);

export const ScheduleExceptionSchema = new Schema<IPersistenceSchedule>(
  {
    reason: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
  },
);

export const OneTimeAvailabilitySchema =
  new Schema<IPersistenceOneTimeAvailability>(
    {
      date: {
        type: String,
        required: true,
      },

      startTime: {
        type: String,
        required: true,
      },

      endTime: {
        type: String,
        required: true,
      },
    },
    {
      _id: true,
    },
  );

export const ExceptionsSchema = new Schema<IPersistenceExceptions>(
  {
    breaks: [BreakSchema],
    vacations: [ScheduleExceptionSchema],
    blackouts: [ScheduleExceptionSchema],
    holidays: [ScheduleExceptionSchema],
    overrides: [OneTimeAvailabilitySchema],
  },
  {
    _id: false,
  },
);

export const WeeklyScheduleSchema = new Schema<IPersistenceWeeklySchedule>(
  {
    dayOfWeek: {
      type: String,
      enum: DAYS,
      required: true,
    },
    shifts: {
      type: [ShiftSchema],
      default: [],
    },
  },
  { _id: false },
);

export const DoctorClinicSchema = new Schema<IDoctorClinic>(
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
      enum: SERVICE_MODE,
      required: true,
    },
    weeklySchedule: {
      type: [WeeklyScheduleSchema],
      default: [],
    },
    exceptions: {
      type: ExceptionsSchema,
    },
    slotRules: {
      type: SlotRulesSchema,
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
