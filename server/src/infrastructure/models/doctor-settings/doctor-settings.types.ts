
import type { HydratedDocument, Types } from "mongoose";
import type { ThemeMode } from "../../../domain/types/platform-settings.types.ts";

export interface IPersistenceDoctorSettings {
  _id: Types.ObjectId;
  doctorId: Types.ObjectId;
  profile: {
    acceptNewPatients: boolean;
    publicDirectoryVisibility: boolean;
  };
  security: {
    twoFactorAuthentication: boolean
    newDeviceLoginAlerts: boolean;
    inactivitySessionTimeoutMinutes: number;
  };
  notifications: {
    clinical: {
      newAppointmentBookings: boolean;
      cancellationsAndReschedules: boolean;
      patientInquiriesAndMessages: boolean;
      appointmentReminderLeadTimeHours: 1 | 2 | 6 | 24;
    };
    updates: {
      walletAndPayoutSettlements: boolean;
      platformFeaturesAndClinicalGuides: boolean;
    };
    channels: {
      email: boolean;
      sms: boolean;
      whatsappBusiness: boolean;
    };
  };
  appearance: {
    theme: ThemeMode;
    colorPaletteId: string;
    walletCardDesignId: number;
    compactScheduleView: boolean;
    highContrastMode: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type IDoctorSettings =
  HydratedDocument<IPersistenceDoctorSettings>;
