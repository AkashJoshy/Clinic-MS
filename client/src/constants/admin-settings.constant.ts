import {
  Building2,
  Palette,
  Bell,
  ShieldCheck,
  Wallet,
  Percent,
  CalendarDays,
  UserCheck,
  Users,
  Crown,
  Plug,
  Database,
  ScrollText,
} from "lucide-react";
import type {
  NavGroup,
  SettingsKey,
  BillingCycle,
  GeneralSettings,
  BusinessSettings,
  SystemSettings,
} from "../types/admin-settings";
import type { PlatformData } from "@/types/auth";

export const navigation: NavGroup[] = [
  {
    id: "GENERAL",
    label: "General",
    description: "Platform identity, branding, alerts and account security.",
    items: [
      {
        id: "PLATFORM",
        label: "Platform",
        description: "Basic platform information and regional preferences.",
        icon: Building2,
      },
      {
        id: "APPEARANCE",
        label: "Appearance",
        description: "Customize the visual identity of your platform.",
        icon: Palette,
      },
      {
        id: "NOTIFICATIONS",
        label: "Notifications",
        description: "Choose which alerts the platform sends by default.",
        icon: Bell,
      },
      {
        id: "SECURITY",
        label: "Security",
        description: "Protect admin accounts and control session behavior.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "BUSINESS",
    label: "Business",
    description: "Payouts, fees, bookings, onboarding and subscription plans.",
    items: [
      {
        id: "PAYMENTS",
        label: "Payments & payouts",
        description: "Default payout thresholds and processing times.",
        icon: Wallet,
      },
      {
        id: "COMMISSIONS",
        label: "Commission & fees",
        description: "The platform's default commission policy.",
        icon: Percent,
      },
      {
        id: "APPOINTMENTS",
        label: "Appointments",
        description: "Default booking and cancellation policies.",
        icon: CalendarDays,
      },
      {
        id: "VERIFICATION",
        label: "Doctor verification",
        description: "Onboarding requirements for new doctors.",
        icon: UserCheck,
      },
      {
        id: "PATIENTS",
        label: "Patients",
        description: "Patient-facing features and permissions.",
        icon: Users,
      },
      {
        id: "SUBSCRIPTIONS",
        label: "Subscriptions",
        description: "Plans, pricing, plan colors and billing rules.",
        icon: Crown,
      },
    ],
  },
  {
    id: "SYSTEM",
    label: "System",
    description: "Integrations, backups and platform monitoring.",
    items: [
      {
        id: "INTEGRATIONS",
        label: "Integrations",
        description: "Connected third-party services.",
        icon: Plug,
      },
      {
        id: "BACKUP",
        label: "Backup & data",
        description: "Backup schedule and data management.",
        icon: Database,
      },
      {
        id: "LOGS",
        label: "System logs",
        description: "Platform activity and operational events.",
        icon: ScrollText,
      },
    ],
  },
];

export const sectionFields: Record<SettingsKey, string[]> = {
  PLATFORM: [
    "platformName",
    "supportEmail",
    "supportPhone",
    "timeZone",
    "currency",
  ],
  APPEARANCE: ["primaryColor", "appearanceMode"],
  NOTIFICATIONS: [
    "emailNotifications",
    "appointmentReminders",
    "paymentNotifications",
  ],
  SECURITY: ["twoFactorAuth", "sessionTimeout"],
  PAYMENTS: ["minimumPayout", "payoutProcessingDays"],
  COMMISSIONS: ["commissionPercentage", "platformFee"],
  APPOINTMENTS: [
    "appointmentDuration",
    "cancellationWindow",
    "autoConfirmAppointments",
  ],
  VERIFICATION: ["doctorApprovalRequired", "kycRequired"],
  PATIENTS: ["patientReviewsEnabled", "patientCancellationEnabled"],
  SUBSCRIPTIONS: [
    "plans",
    "trialEnabled",
    "trialDays",
    "gracePeriodDays",
    "autoRenewal",
    "prorateUpgrades",
  ],
  INTEGRATIONS: [
    "emailIntegration",
    "paymentIntegration",
    "cloudStorageIntegration",
  ],
  BACKUP: ["autoBackup", "backupFrequency"],
  LOGS: [],
  MAINTENANCE: [],
};

export const defaultBrandColors = [
  "#1dc465",
  "#38bdf8",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#f59e0b",
  "#ef4444",
  "#64748b",
];

export const colorPresets = defaultBrandColors;

export const billingLabels: Record<BillingCycle, string> = {
  MONTHLY: "month",
  QUARTERLY: "quarter",
  YEARLY: "year",
};

// export const initialGeneralSettings: GeneralSettings = {
//   platformName: "Healthixia Care",
//   supportEmail: "support@healthixia.com",
//   supportPhone: "",
//   timeZone: "Asia/Kolkata",
//   currency: "INR",
//   primaryColor: "#1dc465",
//   emailNotifications: true,
//   appointmentReminders: true,
//   paymentNotifications: true,
//   twoFactorAuth: false,
//   sessionTimeout: 30,
//   appearanceMode: "DARK",
// };

export const initialGeneralSettings: GeneralSettings = {
  platformName: "",
  supportEmail: "",
  supportPhone: "",
  timeZone: "Asia/Kolkata",
  currency: "INR",
  primaryColor: "#1dc465",
  emailNotifications: true,
  appointmentReminders: true,
  paymentNotifications: true,
  twoFactorAuth: false,
  sessionTimeout: 30,
  appearanceMode: "DARK",
};

export const initialBusinessSettings: BusinessSettings = {
  minimumPayout: 1000,
  payoutProcessingDays: 3,
  commissionPercentage: 10,
  platformFee: 0,
  appointmentDuration: 30,
  cancellationWindow: 24,
  autoConfirmAppointments: false,
  doctorApprovalRequired: true,
  kycRequired: true,
  patientReviewsEnabled: true,
  patientCancellationEnabled: true,
  trialEnabled: true,
  trialDays: 14,
  gracePeriodDays: 7,
  autoRenewal: true,
  prorateUpgrades: true,
};

export const initialSystemSettings: SystemSettings = {
  emailIntegration: true,
  paymentIntegration: true,
  cloudStorageIntegration: true,
  autoBackup: true,
  backupFrequency: "DAILY",
};

export const inputClass =
  "w-full min-w-0 h-11 px-3.5 bg-[#091420] border border-white/10 rounded-xl text-white text-sm placeholder:text-[#4f5f75] outline-none transition-colors hover:border-white/20 focus:border-[#1dc465]/60 focus:ring-2 focus:ring-[#1dc465]/15";

export const ghostButton =
  "inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-white/10 text-sm font-medium text-[#9fb0c5] hover:bg-white/5 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dc465]/40";

export const primaryButton =
  "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-primary text-[#05130a] text-sm font-semibold hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1dc465]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1a27]";

export {
  num,
  prefersReducedMotion,
  sameValue,
} from "../helpers/admin-settings.helper";

export const sectionId = (key: SettingsKey) => `settings-${key.toLowerCase()}`;

export const initialPlatformState: PlatformData = {
  platformName: "Healthixia Care",
  primaryColor: "#1DC465",
  isMaintenanceMode: false,
};