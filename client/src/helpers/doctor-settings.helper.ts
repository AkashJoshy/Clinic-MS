import type {
  DoctorSettingsResponse,
  DoctorSettingsValues,
} from "@/types/doctor-settings";
import { initialDoctorSettings } from "@/constants/doctor-settings.constant";

export const mapDoctorSettingsResponse = (
  data: DoctorSettingsResponse,
): DoctorSettingsValues => {
  return {
    ...initialDoctorSettings,

    profileInfo: {
      ...initialDoctorSettings.profileInfo,
      displayName: data.displayName,
      emergencyContactPhone: data.phone,
      acceptNewPatients: data.profile.acceptNewPatients,
      publicProfileVisible: data.profile.publicDirectoryVisibility,
    },

    security: {
      ...initialDoctorSettings.security,
      twoFactorAuth: data.security.twoFactorAuthentication.enabled,
      loginAlerts: data.security.newDeviceLoginAlerts,
      sessionTimeoutMinutes: data.security.inactivitySessionTimeoutMinutes,
    },

    notifications: {
      section: "NOTIFICATIONS",

      clinical: {
        appointmentBooked: data.notifications.clinical.newAppointmentBookings,
        appointmentCancelled:
          data.notifications.clinical.cancellationsAndReschedules,
        patientMessages:
          data.notifications.clinical.patientInquiriesAndMessages,
        appointmentReminderHours:
          data.notifications.clinical.appointmentReminderLeadTimeHours,
      },

      updates: {
        payoutUpdates: data.notifications.updates.walletAndPayoutSettlements,
        marketingEmails:
          data.notifications.updates.platformFeaturesAndClinicalGuides,
      },

      channels: {
        emailAlerts: data.notifications.channels.email,
        smsAlerts: data.notifications.channels.sms,
        whatsappAlerts: data.notifications.channels.whatsappBusiness,
      },
    },

    appearance: {
      ...initialDoctorSettings.appearance,
      mode: data.appearance.theme,
      colorPaletteId: data.appearance.colorPaletteId,
      walletCardDesignId: data.appearance.walletCardDesignId,
      compactScheduleView: data.appearance.compactScheduleView,
      highContrastMode: data.appearance.highContrastMode,
    },
  };
};
