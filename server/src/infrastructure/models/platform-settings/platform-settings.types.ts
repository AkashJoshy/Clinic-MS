import type { HydratedDocument, Model, Types } from "mongoose";
import type {
  AppointmentDuration,
  BackupFrequency,
  CancellationWindow,
  GracePeriod,
  PayoutProcessingTime,
  ThemeMode,
  TrialLength,
} from "../../../domain/types/platform-settings.types.ts";

export interface IPersistencePlatformDetails {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  defaultTimezone: string;
  defaultCurrency: string;
}

export interface IPersistenceAppearanceSettings {
  primaryBrandColor: string;
  mode: ThemeMode;
}

export interface IPersistenceNotificationSettings {
  emailNotifications: boolean;
  appointmentReminders: boolean;
  paymentNotifications: boolean;
}

export interface IPersistenceSecuritySettings {
  twoFactorAuthRequired: boolean;
  adminSessionTimeoutMinutes: number;
  absoluteSessionLifetimeHours: number;
  maintenanceMode: boolean;
}

export interface IPersistenceGeneralSettings {
  platform: IPersistencePlatformDetails;
  appearance: IPersistenceAppearanceSettings;
  notifications: IPersistenceNotificationSettings;
  security: IPersistenceSecuritySettings;
}

export interface IPersistencePaymentsSettings {
  minimumPayout: number;
  payoutProcessingTime: PayoutProcessingTime;
}

export interface IPersistenceCommissionSettings {
  defaultCommission: number;
  platformFee: number;
}

export interface IPersistenceAppointmentSettings {
  defaultAppointmentDuration: AppointmentDuration;
  cancellationWindow: CancellationWindow;
  autoConfirmAppointments: boolean;
}

export interface IPersistenceDoctorVerificationSettings {
  adminApprovalRequired: boolean;
  kycVerificationRequired: boolean;
}

export interface IPersistencePatientSettings {
  patientReviewsEnabled: boolean;
  patientCancellationEnabled: boolean;
}

export interface IPersistenceSubscriptionSettings {
  freeTrialEnabled: boolean;
  autoRenewal: boolean;
  proratePlanChanges: boolean;
  trialLength: TrialLength;
  gracePeriodAfterFailedPayment: GracePeriod;
}

export interface IPersistenceBusinessSettings {
  payments: IPersistencePaymentsSettings;
  commission: IPersistenceCommissionSettings;
  appointments: IPersistenceAppointmentSettings;
  doctorVerification: IPersistenceDoctorVerificationSettings;
  patients: IPersistencePatientSettings;
  subscriptions: IPersistenceSubscriptionSettings;
}

export interface IPersistenceIntegrationSettings {
  emailServiceEnabled: boolean;
  paymentGatewayEnabled: boolean;
  cloudStorageEnabled: boolean;
}

export interface IPersistenceBackupSettings {
  automaticBackupsEnabled: boolean;
  backupFrequency: BackupFrequency;
}

export interface IPersistenceSystemLogSettings {
  auditLogsEnabled: boolean;
}

export interface IPersistenceSystemSettings {
  integrations: IPersistenceIntegrationSettings;
  backup: IPersistenceBackupSettings;
  logs: IPersistenceSystemLogSettings;
}

export interface IPersistencePlatformSettings {
  _id: Types.ObjectId;
  type: "PLATFORM";

  general: IPersistenceGeneralSettings;
  business: IPersistenceBusinessSettings;
  system: IPersistenceSystemSettings;

  settingsVersion: number;

  createdBy: Types.ObjectId | null;
  updatedBy: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

export type IPlatformSettings =
  HydratedDocument<IPersistencePlatformSettings>;
