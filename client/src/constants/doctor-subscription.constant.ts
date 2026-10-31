import type {
  DoctorSubscription,
  SubscriptionHistory,
  AvailablePlanOption,
} from "@/types/doctor-subscription";
import type { BillingCycle } from "@/types/subscription";

export const INITIAL_DOCTOR_SUBSCRIPTION: DoctorSubscription = {
  id: "sub_doc_9812401",
  doctorId: "doctor_9812401",
  planId: "plan_professional",
  status: "ACTIVE",
  billingCycle: "MONTHLY",
  price: 4999,
  currency: "INR",
  startedAt: "2026-09-10T00:00:00.000Z",
  currentPeriodStart: "2026-10-10T00:00:00.000Z",
  currentPeriodEnd: "2026-11-10T00:00:00.000Z",
  autoRenew: true,
  paymentMethod: "RAZORPAY",
  cancelledAt: null,
  cancellationReason: null,
  cancellationMessage: null,
  createdAt: "2026-09-10T00:00:00.000Z",
  updatedAt: "2026-10-10T11:42:00.000Z",
  features: [
    {
      id: "feat_1",
      name: "Up to 250 Patient Consultations / month",
      isIncluded: true,
    },
    {
      id: "feat_2",
      name: "AI-Powered Medical Scribe & Auto-Rx",
      isIncluded: true,
    },
    {
      id: "feat_3",
      name: "Digital Prescription with QR Verification",
      isIncluded: true,
    },
    {
      id: "feat_4",
      name: "Automated WhatsApp & SMS Appointment Reminders",
      isIncluded: true,
    },
    {
      id: "feat_5",
      name: "Custom Clinic Letterhead & Stamp Branding",
      isIncluded: true,
    },
    {
      id: "feat_6",
      name: "Multi-Staff & Receptionist Portal Access",
      isIncluded: true,
    },
    {
      id: "feat_7",
      name: "Encrypted Cloud Records Storage (100 GB)",
      isIncluded: true,
    },
    {
      id: "feat_8",
      name: "Priority Support & Dedicated Onboarding",
      isIncluded: true,
    },
  ],
};

export const AVAILABLE_PLANS: AvailablePlanOption[] = [
  {
    id: "plan_starter",
    name: "Starter Clinic",
    tagline: "Ideal for solo practitioners & startup clinics",
    description:
      "Core features for managing appointment bookings, digital prescriptions, and patient records.",
    price: 1999,
    currency: "INR",
    billingCycle: "MONTHLY",
    features: [
      { id: "f1", name: "Up to 75 Consultations / month", isIncluded: true },
      { id: "f2", name: "Standard e-Prescriptions", isIncluded: true },
      { id: "f3", name: "1 Staff / Receptionist Account", isIncluded: true },
      { id: "f4", name: "20 GB Cloud Storage", isIncluded: true },
      { id: "f5", name: "Email Reminders", isIncluded: true },
      { id: "f6", name: "AI Rx Assistant", isIncluded: false },
      { id: "f7", name: "WhatsApp Notifications", isIncluded: false },
      { id: "f8", name: "Custom Clinic Branding", isIncluded: false },
    ],
  },
  {
    id: "plan_professional",
    name: "Professional Practice",
    tagline: "Our most popular plan for active clinical practices",
    description:
      "Everything a busy doctor needs to automate workflows, consult via HD telehealth, and scale operations.",
    price: 4999,
    currency: "INR",
    billingCycle: "MONTHLY",
    isPopular: true,
    features: [
      { id: "f1", name: "Up to 250 Consultations / month", isIncluded: true },
      { id: "f2", name: "AI Medical Scribe & Auto-Rx", isIncluded: true },
      { id: "f3", name: "Up to 5 Staff & Nurse Accounts", isIncluded: true },
      { id: "f4", name: "100 GB Encrypted Cloud Storage", isIncluded: true },
      { id: "f5", name: "WhatsApp & SMS Reminders", isIncluded: true },
      { id: "f6", name: "1,000 mins HD Telehealth Video", isIncluded: true },
      { id: "f7", name: "Custom Clinic Letterhead & Logo", isIncluded: true },
      { id: "f8", name: "Priority 24/7 Support", isIncluded: true },
    ],
  },
  {
    id: "plan_enterprise",
    name: "Enterprise Multi-Clinic",
    tagline: "For hospitals, multi-specialty centers & clinic chains",
    description:
      "Unlimited scale with dedicated clinic management, multi-branch support, and personalized integration.",
    price: 9999,
    currency: "INR",
    billingCycle: "MONTHLY",
    features: [
      { id: "f1", name: "Unlimited Consultations", isIncluded: true },
      { id: "f2", name: "Advanced AI Diagnostic Insights", isIncluded: true },
      { id: "f3", name: "Unlimited Staff & Doctor Accounts", isIncluded: true },
      {
        id: "f4",
        name: "1 TB Dedicated Secure Cloud Storage",
        isIncluded: true,
      },
      {
        id: "f5",
        name: "Unlimited WhatsApp & SMS Reminders",
        isIncluded: true,
      },
      { id: "f6", name: "Unlimited HD Telehealth Video", isIncluded: true },
      { id: "f7", name: "Multi-branch Central Dashboard", isIncluded: true },
      { id: "f8", name: "Dedicated Account Manager & SLA", isIncluded: true },
    ],
  },
];

export const SUBSCRIPTION_HISTORY: SubscriptionHistory[] = [
  {
    id: "inv_10928",
    invoiceNumber: "INV-2026-0912",
    planName: "Professional Practice - Monthly",
    billingCycle: "MONTHLY",
    amount: 4999,
    taxAmount: 899.82,
    totalAmount: 5898.82,
    currency: "INR",
    paidAt: "2026-10-10T11:42:00.000Z",
    periodStart: "2026-10-10T00:00:00.000Z",
    periodEnd: "2026-11-10T00:00:00.000Z",
    paymentMethod: "Visa ending in 4829",
    transactionId: "txn_razorpay_98218731",
    status: "PAID",
    customerName: "Dr. Alexander Wright, MD",
    customerEmail: "alexander.wright@medicare.com",
    clinicName: "Apex Specialty Clinic",
    clinicGstin: "29AABCU9603R1ZM",
  },
  {
    id: "inv_10842",
    invoiceNumber: "INV-2026-0842",
    planName: "Professional Practice - Monthly",
    billingCycle: "MONTHLY",
    amount: 4999,
    taxAmount: 899.82,
    totalAmount: 5898.82,
    currency: "INR",
    paidAt: "2026-09-10T09:15:00.000Z",
    periodStart: "2026-09-10T00:00:00.000Z",
    periodEnd: "2026-10-10T00:00:00.000Z",
    paymentMethod: "Visa ending in 4829",
    transactionId: "txn_razorpay_87192831",
    status: "PAID",
    customerName: "Dr. Alexander Wright, MD",
    customerEmail: "alexander.wright@medicare.com",
    clinicName: "Apex Specialty Clinic",
    clinicGstin: "29AABCU9603R1ZM",
  },
  {
    id: "inv_10761",
    invoiceNumber: "INV-2026-0761",
    planName: "Professional Practice - Monthly",
    billingCycle: "MONTHLY",
    amount: 4999,
    taxAmount: 899.82,
    totalAmount: 5898.82,
    currency: "INR",
    paidAt: "2026-08-10T14:30:00.000Z",
    periodStart: "2026-08-10T00:00:00.000Z",
    periodEnd: "2026-09-10T00:00:00.000Z",
    paymentMethod: "UPI / dr.alex@okaxis",
    transactionId: "txn_upi_76129841",
    status: "PAID",
    customerName: "Dr. Alexander Wright, MD",
    customerEmail: "alexander.wright@medicare.com",
    clinicName: "Apex Specialty Clinic",
    clinicGstin: "29AABCU9603R1ZM",
  },
  {
    id: "inv_10620",
    invoiceNumber: "INV-2026-0620",
    planName: "Professional Practice - Monthly",
    billingCycle: "MONTHLY",
    amount: 4999,
    taxAmount: 899.82,
    totalAmount: 5898.82,
    currency: "INR",
    paidAt: "2026-07-10T10:04:00.000Z",
    periodStart: "2026-07-10T00:00:00.000Z",
    periodEnd: "2026-08-10T00:00:00.000Z",
    paymentMethod: "Visa ending in 4829",
    transactionId: "txn_razorpay_65123901",
    status: "PAID",
    customerName: "Dr. Alexander Wright, MD",
    customerEmail: "alexander.wright@medicare.com",
    clinicName: "Apex Specialty Clinic",
    clinicGstin: "29AABCU9603R1ZM",
  },
  {
    id: "inv_10511",
    invoiceNumber: "INV-2026-0511",
    planName: "Starter Clinic - Monthly",
    billingCycle: "MONTHLY",
    amount: 1999,
    taxAmount: 359.82,
    totalAmount: 2358.82,
    currency: "INR",
    paidAt: "2026-06-10T16:21:00.000Z",
    periodStart: "2026-06-10T00:00:00.000Z",
    periodEnd: "2026-07-10T00:00:00.000Z",
    paymentMethod: "Mastercard ending in 1102",
    transactionId: "txn_card_54198273",
    status: "PAID",
    customerName: "Dr. Alexander Wright, MD",
    customerEmail: "alexander.wright@medicare.com",
    clinicName: "Apex Specialty Clinic",
    clinicGstin: "29AABCU9603R1ZM",
  },
  {
    id: "inv_10419",
    invoiceNumber: "INV-2026-0419",
    planName: "Starter Clinic - Trial to Paid Upgrade",
    billingCycle: "MONTHLY",
    amount: 1999,
    taxAmount: 359.82,
    totalAmount: 2358.82,
    currency: "INR",
    paidAt: "2026-05-10T18:02:00.000Z",
    periodStart: "2026-05-10T00:00:00.000Z",
    periodEnd: "2026-06-10T00:00:00.000Z",
    paymentMethod: "Mastercard ending in 1102",
    transactionId: "txn_card_43187219",
    status: "PAID",
    customerName: "Dr. Alexander Wright, MD",
    customerEmail: "alexander.wright@medicare.com",
    clinicName: "Apex Specialty Clinic",
    clinicGstin: "29AABCU9603R1ZM",
  },
];

export const modalContentClass = `
  min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain
  p-6 text-xs text-gray-300
  [scrollbar-width:thin]
  [scrollbar-color:rgba(139,154,176,0.4)_transparent]
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#536174]
  [&::-webkit-scrollbar-thumb:hover]:bg-[#8b9ab0]
`;

export const BILLING_LABELS: Record<BillingCycle, string> = {
  MONTHLY: "/ month",
  QUARTERLY: "/ quarter",
  YEARLY: "/ year",
  LIFETIME: "one-time",
};

export const BILLING_DESCRIPTIONS: Record<BillingCycle, string> = {
  MONTHLY: "Billed monthly",
  QUARTERLY: "Billed every 3 months",
  YEARLY: "Billed annually",
  LIFETIME: "One-time payment",
};

export const BILLING_CYCLE_LABELS: Record<BillingCycle, string> = {
  MONTHLY: "Monthly",
  QUARTERLY: "Quarterly",
  YEARLY: "Yearly",
  LIFETIME: "Lifetime",
};

export const BILLING_SUFFIXES: Record<BillingCycle, string> = {
  MONTHLY: "/ month",
  QUARTERLY: "/ 3 months",
  YEARLY: "/ year",
  LIFETIME: "one-time payment",
};

export const BILLING_CYCLES = ["MONTHLY", "QUARTERLY", "YEARLY", "LIFETIME"] as const;

