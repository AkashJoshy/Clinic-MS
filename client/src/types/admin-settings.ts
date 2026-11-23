import type { LucideIcon } from "lucide-react";
import type { ThemeMode } from "./common";

export type SettingsSection = "GENERAL" | "BUSINESS" | "SYSTEM";

export type AppearanceMode = "DARK" | "LIGHT";

export type SettingsKey =
  | "PLATFORM"
  | "APPEARANCE"
  | "NOTIFICATIONS"
  | "SECURITY"
  | "PAYMENTS"
  | "COMMISSIONS"
  | "APPOINTMENTS"
  | "VERIFICATION"
  | "PATIENTS"
  | "SUBSCRIPTIONS"
  | "INTEGRATIONS"
  | "BACKUP"
  | "MAINTENANCE"
  | "LOGS";

export interface NavItem {
  id: SettingsKey;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface NavGroup {
  id: SettingsSection;
  label: string;
  description: string;
  items: NavItem[];
}

export type BillingCycle = "MONTHLY" | "QUARTERLY" | "YEARLY";

export interface GeneralSettings {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  timeZone: string;
  currency: string;
  primaryColor: string;
  emailNotifications: boolean;
  appointmentReminders: boolean;
  paymentNotifications: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  appearanceMode: AppearanceMode;
}

export interface BusinessSettings {
  minimumPayout: number;
  payoutProcessingDays: number;
  commissionPercentage: number;
  platformFee: number;
  appointmentDuration: number;
  cancellationWindow: number;
  autoConfirmAppointments: boolean;
  doctorApprovalRequired: boolean;
  kycRequired: boolean;
  patientReviewsEnabled: boolean;
  patientCancellationEnabled: boolean;
  trialEnabled: boolean;
  trialDays: number;
  gracePeriodDays: number;
  autoRenewal: boolean;
  prorateUpgrades: boolean;
}

export interface SystemSettings {
  emailIntegration: boolean;
  paymentIntegration: boolean;
  cloudStorageIntegration: boolean;
  autoBackup: boolean;
  backupFrequency: string;
}

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

export interface GeneralSettingsData {
  platform: PlatformDetailsProps;
  appearance: AppearanceSettingsProps;
  notifications: NotificationSettingsProps;
  security: SecuritySettingsProps;
}

export interface GeneralSettingsSectionProps {
  sectionKey: SettingsKey;
  isDark: boolean;
}

export interface BusinessSettingsSectionProps {
  sectionKey: SettingsKey;
  business: BusinessSettings;
  currency: string;
  isDark: boolean;
  updateBusiness: <K extends keyof BusinessSettings>(
    key: K,
    value: BusinessSettings[K],
  ) => void;
}

export interface SubscriptionSettingsProps {
  trialEnabled: boolean;
  autoRenewal: boolean;
  prorateUpgrades: boolean;
  trialDays: number;
  gracePeriodDays: number;
  isDark: boolean;
  onUpdateBusiness: <K extends keyof BusinessSettings>(
    key: K,
    value: BusinessSettings[K],
  ) => void;
}

export interface SystemSettingsSectionProps {
  sectionKey: SettingsKey;
  system: SystemSettings;
  isDark: boolean;
  updateSystem: <K extends keyof SystemSettings>(
    key: K,
    value: SystemSettings[K],
  ) => void;
}