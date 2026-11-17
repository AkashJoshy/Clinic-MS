import type { DoctorSettings } from "../entities/doctor-settings.entity.ts";
import type { ThemeMode } from "./platform-settings.types.ts";

export interface DoctorProfileSettings {
  acceptNewPatients: boolean;
  publicDirectoryVisibility: boolean;
}

export interface DoctorSecuritySettings {
  twoFactorAuthentication: boolean;
  newDeviceLoginAlerts: boolean;
  inactivitySessionTimeoutMinutes: number;
}

export interface DoctorClinicalNotifications {
  newAppointmentBookings: boolean;
  cancellationsAndReschedules: boolean;
  patientInquiriesAndMessages: boolean;
  appointmentReminderLeadTimeHours: 1 | 2 | 6 | 24;
}

export interface DoctorUpdateNotifications {
  walletAndPayoutSettlements: boolean;
  platformFeaturesAndClinicalGuides: boolean;
}

export interface DoctorNotificationChannels {
  email: boolean;
  sms: boolean;
  whatsappBusiness: boolean;
}

export interface DoctorNotificationSettings {
  clinical: DoctorClinicalNotifications;
  updates: DoctorUpdateNotifications;
  channels: DoctorNotificationChannels;
}

export interface DoctorAppearanceSettings {
  theme: ThemeMode;
  colorPaletteId: string;
  walletCardDesignId: number;
  compactScheduleView: boolean;
  highContrastMode: boolean;
}

export interface AddDoctorSettingsProps {
  id?: string | null;
  doctorId: string;

  profile?: Partial<DoctorProfileSettings>;

  security?: {
    twoFactorAuthentication?: boolean
    newDeviceLoginAlerts?: boolean;
    inactivitySessionTimeoutMinutes?: number;
  };

  notifications?: {
    clinical?: Partial<DoctorClinicalNotifications>;
    updates?: Partial<DoctorUpdateNotifications>;
    channels?: Partial<DoctorNotificationChannels>;
  };

  appearance?: Partial<DoctorAppearanceSettings>;

  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export type UpdateDoctorProfileInput = Partial<DoctorProfileSettings>;

export type UpdateDoctorSecurityInput = {
  twoFactorAuthentication?: boolean;
  newDeviceLoginAlerts?: boolean;
  inactivitySessionTimeoutMinutes?: number;
};

export type UpdateDoctorNotificationsInput = {
  clinical?: Partial<DoctorClinicalNotifications>;
  updates?: Partial<DoctorUpdateNotifications>;
  channels?: Partial<DoctorNotificationChannels>;
};

export type UpdateDoctorAppearanceInput = Partial<DoctorAppearanceSettings>;

export type BaseDoctorSettings = Omit<
  DoctorSettings,
  | "updateAppearance"
  | "updateNotifications"
  | "updateProfile"
  | "updateSecurity"
>;

export type SafeDoctorSettings = Omit<BaseDoctorSettings, "createdAt">