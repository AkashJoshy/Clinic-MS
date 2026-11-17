
import type {
  DoctorAppearanceSettings,
  DoctorClinicalNotifications,
  DoctorNotificationChannels,
  DoctorProfileSettings,
  DoctorSecuritySettings,
  DoctorTwoFactorAuthentication,
  DoctorUpdateNotifications,
} from "../types/doctor-settings.types.ts";

export const INITIAL_DOCTOR_PROFILE: DoctorProfileSettings = {
  acceptNewPatients: true,
  publicDirectoryVisibility: true,
};

export const INITIAL_TWO_FACTOR_AUTHENTICATION: DoctorTwoFactorAuthentication = {
  enabled: false,
};

export const INITIAL_DOCTOR_SECURITY: DoctorSecuritySettings = {
  twoFactorAuthentication: {
    ...INITIAL_TWO_FACTOR_AUTHENTICATION,
  },
  newDeviceLoginAlerts: true,
  inactivitySessionTimeoutMinutes: 30,
};

export const INITIAL_DOCTOR_CLINICAL_NOTIFICATIONS: DoctorClinicalNotifications = {
  newAppointmentBookings: true,
  cancellationsAndReschedules: true,
  patientInquiriesAndMessages: true,
  appointmentReminderLeadTimeHours: 2,
};

export const INITIAL_DOCTOR_UPDATE_NOTIFICATIONS: DoctorUpdateNotifications = {
  walletAndPayoutSettlements: true,
  platformFeaturesAndClinicalGuides: true,
};

export const INITIAL_DOCTOR_NOTIFICATION_CHANNELS: DoctorNotificationChannels = {
  email: true,
  sms: false,
  whatsappBusiness: false,
};

export const INITIAL_DOCTOR_APPEARANCE: DoctorAppearanceSettings = {
  theme: "DARK",
  colorPaletteId: "emerald",
  walletCardDesignId: 200,
  compactScheduleView: false,
  highContrastMode: false,
};
