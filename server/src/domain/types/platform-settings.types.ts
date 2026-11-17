export type ThemeMode = "DARK" | "LIGHT";

export type PlatformSettingsType = "PLATFORM";

export interface PlatformDetailsProps {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  defaultTimezone: string;
  defaultCurrency: string;
}

export interface AppearanceSettingsProps {
  primaryBrandColor: string;
  mode: ThemeMode;
}

export interface NotificationSettingsProps {
  emailNotifications: boolean;
  appointmentReminders: boolean;
  paymentNotifications: boolean;
}

export interface SecuritySettingsProps {
  twoFactorAuthRequired: boolean;
  adminSessionTimeoutMinutes: number;
  absoluteSessionLifetimeHours: number;
  maintenanceMode: boolean;
}

export interface GeneralSettingsProps {
  platform: PlatformDetailsProps;
  appearance: AppearanceSettingsProps;
  notifications: NotificationSettingsProps;
  security: SecuritySettingsProps;
}

export type PayoutProcessingTime = 1 | 2 | 3 | 5 | 7

export type AppointmentDuration = 15 | 20 | 30 | 45 | 60;

export type CancellationWindow = 0 | 2 | 6 | 12 | 24 | 48;

export type TrialLength = 7 | 14 | 21 | 30;

export type GracePeriod = 0 | 3 | 7 | 14;

export interface PaymentsSettingsProps {
  minimumPayout: number;
  payoutProcessingTime:PayoutProcessingTime
}

export interface CommissionSettingsProps {
  defaultCommission: number;
  platformFee: number;
}

export interface AppointmentSettingsProps {
  defaultAppointmentDuration: AppointmentDuration
  cancellationWindow: CancellationWindow
  autoConfirmAppointments: boolean;
}

export interface DoctorVerificationSettingsProps {
  adminApprovalRequired: boolean;
  kycVerificationRequired: boolean;
}

export interface PatientSettingsProps {
  patientReviewsEnabled: boolean;
  patientCancellationEnabled: boolean;
}

export interface SubscriptionSettingsProps {
  freeTrialEnabled: boolean;
  autoRenewal: boolean;
  proratePlanChanges: boolean;
  trialLength: TrialLength
  gracePeriodAfterFailedPayment: GracePeriod
}

export interface BusinessSettingsProps {
  payments: PaymentsSettingsProps;
  commission: CommissionSettingsProps;
  appointments: AppointmentSettingsProps;
  doctorVerification: DoctorVerificationSettingsProps;
  patients: PatientSettingsProps;
  subscriptions: SubscriptionSettingsProps;
}

export type BackupFrequency = "DAILY" | "WEEKLY" | "MONTHLY";

export interface IntegrationSettingsProps {
  emailServiceEnabled: boolean;
  paymentGatewayEnabled: boolean;
  cloudStorageEnabled: boolean;
}

export interface BackupSettingsProps {
  automaticBackupsEnabled: boolean;
  backupFrequency: BackupFrequency;
}

export interface SystemLogSettingsProps {
  auditLogsEnabled: boolean;
}

export interface SystemSettingsProps {
  integrations: IntegrationSettingsProps;
  backup: BackupSettingsProps;
  logs: SystemLogSettingsProps;
}

export interface PlatformSettingsProps {
  id: string | null;
  type: PlatformSettingsType;
  general: GeneralSettingsProps;
  business: BusinessSettingsProps;
  system: SystemSettingsProps;
  settingsVersion: number;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type BasePlatformSettingsProps = Partial<
  Omit<
    PlatformSettingsProps,
    "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "type"
  >
>;
