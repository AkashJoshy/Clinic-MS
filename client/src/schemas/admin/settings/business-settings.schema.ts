import {
  createNonNegativeInteger,
  createPositiveInteger,
} from "@/schemas/base.schema";
import { z } from "zod";

const payoutsSchema = z.object({
  minimumPayoutPaise: createNonNegativeInteger("Minimum payout"),

  processingTimeDays: createPositiveInteger("Processing time", 1, 30),
});

const commissionSchema = z.object({
  defaultCommissionBps: z
    .number()
    .int()
    .min(0, "Commission cannot be negative")
    .max(10000, "Commission cannot exceed 100%"),

  platformFeePaise: createNonNegativeInteger("Platform fee"),
});

const appointmentsSchema = z.object({
  defaultDurationMinutes: createPositiveInteger("Appointment duration", 5, 480),

  cancellationWindowHours: createNonNegativeInteger(
    "Cancellation window",
    8760,
  ),

  autoConfirmAppointments: z.boolean(),
});

const doctorVerificationSchema = z.object({
  adminApprovalRequired: z.boolean(),
  kycRequired: z.boolean(),
});

const patientsSchema = z.object({
  patientReviewsEnabled: z.boolean(),
  patientCancellationEnabled: z.boolean(),
});

const subscriptionsSchema = z.object({
  freeTrialEnabled: z.boolean(),
  autoRenewalEnabled: z.boolean(),
  proratePlanChanges: z.boolean(),
  trialLengthDays: createPositiveInteger("Trial length", 1, 365),
  gracePeriodDays: createNonNegativeInteger("Grace period", 90),
});

export const businessSettingsSchema = z.object({
  payouts: payoutsSchema,
  commission: commissionSchema,
  appointments: appointmentsSchema,
  doctorVerification: doctorVerificationSchema,
  patients: patientsSchema,
  subscriptions: subscriptionsSchema,
});

