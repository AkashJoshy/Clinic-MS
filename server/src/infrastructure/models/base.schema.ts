import { Schema } from "mongoose";
import type { ImageData } from "../../domain/types/shared.types.ts";
import type { Subscription, SubscriptionDetails } from "../../domain/types/doctor.types.ts";
import type { Leave, Session, WeeklySchedule } from "../../domain/types/doctorClinic.types.ts";
import { DAYS } from "../../domain/constants/doctor.constants.ts";

export const ImageDataSchema = new Schema<ImageData>(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const ISubscriptionDetailsSchema = new Schema<SubscriptionDetails>({
    subscriptionId: {
        type: String,
        default: null
    },
    startedAt: {
        type: Date,
        required: true,
    },
    expiredAt: {
        type: Date,
        required: true,
    },
    status: {
        type: Boolean,
        required: true
    }
})

export const ISubscriptionSchema = new Schema<Subscription>({
    current: {
        type: ISubscriptionDetailsSchema,
        default: null
    },
    history: {
        type: [ISubscriptionDetailsSchema],
        default: []
    }
})


export const SessionSchema = new Schema<Session>(
  {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ["OFFLINE", "ONLINE", "BOTH"],
      required: true,
    },
  },
  { _id: false },
);


export const LeaveSchema = new Schema<Leave>(
  {
    id: {
      type: String,
      default: null,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    isFullDay: {
      type: Boolean,
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
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

export const WeeklyScheduleSchema = new Schema<WeeklySchedule>(
  {
    dayOfWeek: {
      type: String,
      enum: DAYS,
      required: true,
    },
    sessions: {
      type: [SessionSchema],
      default: [],
    },
  },
  { _id: false },
);