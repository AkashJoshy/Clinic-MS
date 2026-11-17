import type { LucideIcon } from "lucide-react";
import type { ThemeMode } from "./common";

export type DoctorSettingsSection =
  | "PROFILE_VERIFICATION"
  | "PREFERENCES_SECURITY"
  | "PRACTICE_ACCOUNT";

export type DoctorSettingsKey =
  | "PROFILE_INFO"
  | "KYC"
  | "SECURITY"
  | "NOTIFICATIONS"
  | "APPEARANCE"
  | "ACCOUNT_MANAGEMENT";

export interface DoctorNavItem {
  id: DoctorSettingsKey;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface DoctorNavGroup {
  id: DoctorSettingsSection;
  label: string;
  description: string;
  items: DoctorNavItem[];
}

export type KycStatus = "VERIFIED" | "PENDING" | "REJECTED" | "NOT_SUBMITTED";

export interface PanDetails {
  section: "KYC_PAN";
  panNumber: string;
  nameOnPan: string;
  dateOfBirth: string;
  status: KycStatus;
  verifiedAt?: string;
}

export interface BankAccountDetails {
  section: "KYC_BANK";
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber?: string;
  ifscCode: string;
  bankName: string;
  accountType: "SAVINGS" | "CURRENT";
  status: KycStatus;
  verifiedAt?: string;
}

export interface AadhaarDetails {
  section: "KYC_AADHAAR";
  aadhaarNumber: string;
  nameOnAadhaar: string;
  status: KycStatus;
  verifiedAt?: string;
}

export interface KycSettings {
  section: "KYC";
  pan: PanDetails;
  bankAccount: BankAccountDetails;
  aadhaar: AadhaarDetails;
}

export interface ProfileInfoSettings {
  section: "PROFILE_INFO";
  displayName: string;
  acceptNewPatients: boolean;
  publicProfileVisible: boolean;
  emergencyContactPhone: string;
}

export interface SecuritySettings {
  section: "SECURITY";
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  twoFactorAuth: boolean;
  sessionTimeoutMinutes: number;
  loginAlerts: boolean;
}

export interface EditSecuritySettings {
  twoFactorAuthentication: boolean;
  inactivitySessionTimeoutMinutes: number;
  newDeviceLoginAlerts: boolean;
}

export interface DoctorClinicalNotifications {
  appointmentBooked: boolean;
  appointmentCancelled: boolean;
  patientMessages: boolean;
  appointmentReminderHours: 1 | 2 | 6 | 24;
}

export interface DoctorUpdateNotifications {
  payoutUpdates: boolean;
  marketingEmails: boolean;
}

export interface DoctorNotificationChannels {
  emailAlerts: boolean;
  smsAlerts: boolean;
  whatsappAlerts: boolean;
}

export interface NotificationsSettings {
  section: "NOTIFICATIONS";
  clinical: DoctorClinicalNotifications;
  updates: DoctorUpdateNotifications;
  channels: DoctorNotificationChannels;
}

export interface AppearanceSettings {
  section: "APPEARANCE";
  mode: ThemeMode;
  walletCardDesignId: number;
  colorPaletteId: string;
  compactScheduleView: boolean;
  highContrastMode: boolean;
}

export interface AccountManagementSettings {
  section: "ACCOUNT_MANAGEMENT";
  practiceStatus: "ACTIVE" | "ON_LEAVE" | "BUSY";
  leaveStartDate: string;
  leaveEndDate: string;
  autoResponderMessage: string;
}

export interface DoctorSettingsValues {
  profileInfo: ProfileInfoSettings;
  kyc: KycSettings;
  security: SecuritySettings;
  notifications: NotificationsSettings;
  appearance: AppearanceSettings;
  accountManagement: AccountManagementSettings;
}

export type UpdateDoctorSettingsData =
  | {
      section: "PROFILE";
      data: Omit<ProfileInfoSettings, "section">;
    }
  | {
      section: "SECURITY";
      data: EditSecuritySettings
    }
  | {
      section: "NOTIFICATIONS";
      data: Omit<NotificationsSettings, "section">;
    }
  | {
      section: "APPEARANCE";
      data: Omit<AppearanceSettings, "section">;
    };

export interface DoctorSettingsResponse {
  id: string;
  doctorId: string;
  profile: {
    acceptNewPatients: boolean;
    publicDirectoryVisibility: boolean;
  };
  security: {
    twoFactorAuthentication: {
      enabled: boolean;
    };
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
    theme: ThemeMode
    colorPaletteId: string;
    walletCardDesignId: number;
    compactScheduleView: boolean;
    highContrastMode: boolean;
  };
  updatedAt: string;
}
