import {
  UserRound,
  FileCheck2,
  ShieldCheck,
  Bell,
  Palette,
  Briefcase,
} from "lucide-react";
import type {
  DoctorNavGroup,
  DoctorSettingsKey,
  DoctorSettingsValues,
} from "../types/doctor-settings";

export const doctorNavigation: DoctorNavGroup[] = [
  {
    id: "PROFILE_VERIFICATION",
    label: "Profile & Identity",
    description:
      "Manage your public doctor persona, credentials, and official verification.",
    items: [
      {
        id: "PROFILE_INFO",
        label: "Profile info",
        description:
          "Overview of your doctor profile and quick consultation settings.",
        icon: UserRound,
      },
      {
        id: "KYC",
        label: "Verification & KYC",
        description: "PAN Card, Bank Account, and Aadhaar verification status.",
        icon: FileCheck2,
      },
    ],
  },
  {
    id: "PREFERENCES_SECURITY",
    label: "Preferences & Security",
    description:
      "Control your login credentials, alert channels, and UI appearance.",
    items: [
      {
        id: "SECURITY",
        label: "Security",
        description:
          "Password management, 2-factor authentication, and active sessions.",
        icon: ShieldCheck,
      },
      {
        id: "NOTIFICATIONS",
        label: "Notifications",
        description:
          "Choose booking alerts, patient messages, and payout updates.",
        icon: Bell,
      },
      {
        id: "APPEARANCE",
        label: "Appearances",
        description:
          "Customize theme mode, accent brand colors, and layout density.",
        icon: Palette,
      },
    ],
  },
  {
    id: "PRACTICE_ACCOUNT",
    label: "Practice & Account",
    description:
      "Manage practice availability, vacation mode, and account controls.",
    items: [
      {
        id: "ACCOUNT_MANAGEMENT",
        label: "Account management",
        description:
          "Practice status, out-of-office autoreponder, and danger zone.",
        icon: Briefcase,
      },
    ],
  },
];

export const initialDoctorSettings: DoctorSettingsValues = {
  profileInfo: {
    section: "PROFILE_INFO",
    displayName: "Dr. Alexander Wright, MD",
    acceptNewPatients: true,
    publicProfileVisible: true,
    emergencyContactPhone: "9876543210",
  },
  kyc: {
    section: "KYC",
    pan: {
      section: "KYC_PAN",
      panNumber: "ABCDE1234F",
      nameOnPan: "ALEXANDER WRIGHT",
      dateOfBirth: "1984-06-15",
      status: "VERIFIED",
      verifiedAt: "2024-03-12",
    },
    bankAccount: {
      section: "KYC_BANK",
      accountHolderName: "DR ALEXANDER WRIGHT",
      accountNumber: "50100492817281",
      confirmAccountNumber: "50100492817281",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank Ltd",
      accountType: "SAVINGS",
      status: "VERIFIED",
      verifiedAt: "2024-03-14",
    },
    aadhaar: {
      section: "KYC_AADHAAR",
      aadhaarNumber: "8472 9182 3749",
      nameOnAadhaar: "Alexander Wright",
      status: "PENDING",
      verifiedAt: undefined,
    },
  },
  security: {
    section: "SECURITY",
    twoFactorAuth: false,
    sessionTimeoutMinutes: 15,
    loginAlerts: true,
  },
  notifications: {
    section: "NOTIFICATIONS",
    clinical: {
      appointmentBooked: true,
      appointmentCancelled: true,
      patientMessages: true,
      appointmentReminderHours: 2,
    },
    updates: {
      payoutUpdates: true,
      marketingEmails: false,
    },
    channels: {
      emailAlerts: true,
      smsAlerts: true,
      whatsappAlerts: false,
    },
  },
  appearance: {
    section: "APPEARANCE",
    mode: "DARK",
    colorPaletteId: "emerald",
    walletCardDesignId: 200,
    compactScheduleView: false,
    highContrastMode: false,
  },
  accountManagement: {
    section: "ACCOUNT_MANAGEMENT",
    practiceStatus: "ACTIVE",
    leaveStartDate: "",
    leaveEndDate: "",
    autoResponderMessage:
      "I am currently on clinical leave. For emergency consultations, please reach out to the clinic emergency desk.",
  },
};

export const colorPresets = [
  "#1dc465",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#0891b2",
];

export const doctorSectionId = (key: DoctorSettingsKey) =>
  `doctor-settings-${key.toLowerCase()}`;
