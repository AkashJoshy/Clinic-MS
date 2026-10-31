import { BILLING_CYCLES } from "@/constants/doctor-subscription.constant";
import type { Doctor } from "./doctor";
import type { BillingCycle, SubscriptionPlan } from "./subscription";
import type { PaymentMethod, Wallet } from "./wallet";

export type DoctorSubscriptionStatus =
  | "ACTIVE"
  | "EXPIRING_SOON"
  | "PAST_DUE"
  | "CANCELLED";

export interface QuotaMetric {
  used: number;
  total: number;
  unit: string;
}

export interface DoctorSubscriptionUsage {
  consultations: QuotaMetric;
  staffAccounts: QuotaMetric;
  cloudStorageGb: QuotaMetric;
  telehealthMinutes: QuotaMetric;
}

export interface SubscriptionFeature {
  id: string;
  name: string;
  isIncluded: boolean;
  note?: string;
}

export interface DoctorSubscription {
  id: string;
  doctorId: string;
  planId: string;
  status: DoctorSubscriptionStatus;
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  features: SubscriptionFeature[];
  startedAt: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  autoRenew: boolean;
  paymentMethod: PaymentMethod;
  cancelledAt: string | null;
  cancellationReason: CancellationReason | null;
  cancellationMessage: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export type CancellationReason =
  | "TOO_EXPENSIVE"
  | "TEMPORARILY_CLOSING_CLINIC"
  | "MISSING_FEATURES"
  | "SWITCHING_PLATFORM"
  | "OTHER";

export type BillingCycles = (typeof BILLING_CYCLES)[number];

export type HistoryItemStatus = "PAID" | "PENDING" | "FAILED" | "REFUNDED";

export interface SubscriptionHistory {
  id: string;
  invoiceNumber: string;
  planName: string;
  billingCycle: BillingCycle;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  paidAt: string;
  periodStart: string;
  periodEnd: string;
  paymentMethod: string;
  transactionId: string;
  status: HistoryItemStatus;
  customerName?: string;
  customerEmail?: string;
  clinicName?: string;
  clinicGstin?: string;
}

export interface AvailablePlanOption {
  id: string;
  name: string;
  tagline: string;
  description?: string;
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  features: SubscriptionFeature[];
  colorTheme?: string;
  badgeText?: string;
  isPopular?: boolean;
}

export interface SubscriptionChangeOption {
  planId: string;
  planName: string;
  billingCycle: BillingCycle;
  changeType: "UPGRADE" | "DOWNGRADE";
  currency: string;
  price: number;
  payableAmount: number;
  unusedSubscriptionCredit: number;
  features: SubscriptionFeature[];
}

export interface WalletBalance {
  balance: Wallet["balance"];
  currency: Wallet["currency"];
  status: Wallet["status"];
}

export interface BuySubscriptionWithWalletData {
  planId: SubscriptionPlan["id"];
  doctorId: Doctor["id"];
  paymentMethod: PaymentMethod;
  payableAmount: number
}

export interface CancelSubscriptionData {
  doctorId: string;
  planId: SubscriptionPlan["id"];
  cancellationReason: string;
  cancellationMessage: String;
}

export interface CurrentPlanCardProps {
  subscription: DoctorSubscription | null;
  onToggleAutoRenew: () => void;
  onOpenCancelModal: () => void;
  onOpenPaymentMethods: () => void;
}

export interface SubscriptionAdjustmentSummaryProps {
  selectedPrice: number;
  currentPrice: number;
  hasExistingSubscription: boolean;
  amountToPay: number;
  creditEstimate: number;
  projectedBalance: number;
  isDowngrade: boolean;
  isUpgrade: boolean;
  formatINR: (amount: number) => string;
}

export interface SubscriptionHeaderProps {
  subscription: DoctorSubscription | null;
  onOpenUpgradeModal: () => void;
  onOpenPaymentMethods: () => void;
}

export interface SubscriptionHistoryRowProps {
  item: SubscriptionHistory;
  onViewInvoice: (item: SubscriptionHistory) => void;
  onDownloadInvoice: (item: SubscriptionHistory) => void;
}

export interface SubscriptionHistoryTableProps {
  history: SubscriptionHistory[];
  totalCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: "ALL" | HistoryItemStatus;
  onStatusFilterChange: (status: "ALL" | HistoryItemStatus) => void;
  onResetFilters: () => void;
  onViewInvoice: (item: SubscriptionHistory) => void;
  onDownloadInvoice: (item: SubscriptionHistory) => void;
}

export interface SubscriptionInvoiceModalProps {
  invoice: SubscriptionHistory | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (invoice: SubscriptionHistory) => void;
}

export interface SubscriptionPlanFeaturesListProps {
  features: SubscriptionFeature[];
  planName: string;
}

export interface SubscriptionPlanCardProps {
  plan: AvailablePlanOption;
  billingCycle: BillingCycle;
  isCurrent: boolean;
  onSelectPlan: (plan: AvailablePlanOption) => void;
}

export interface SubscriptionPaymentOptionsProps {
  plan: AvailablePlanOption;
  balance: number;
  total: number;
  shortfall: number;
  hasSufficientBalance: boolean;
  isProcessing: boolean;
  onPayWithWallet: () => void;
  onAddMoneyWithRazorpay: () => void;
}
export interface ManagePaymentMethodModalProps {
  subscription: DoctorSubscription | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePaymentMethod: (brand: string, last4: string, expiry: string) => void;
}

export interface SubscriptionPaymentModalProps {
  plan: AvailablePlanOption | null;
  currentSubscription: DoctorSubscription | null;
  walletBalance: number;
  isOpen: boolean;
  onClose: () => void;
  onPayWithWallet: (
    plan: AvailablePlanOption,
    cycle: BillingCycle,
    amount: number,
  ) => void;
  onAddMoneyWithRazorpay: (
    plan: AvailablePlanOption,
    cycle: BillingCycle,
    amount: number,
  ) => void;
}

export interface SubscriptionPlansGridProps {
  plans: AvailablePlanOption[] | null;
  currentSubscription: DoctorSubscription | null;
  billingCycle: BillingCycles;
  onBillingCycleChange: (cycle: BillingCycles) => void;
  onSelectPlan: (plan: AvailablePlanOption) => void;
}

export interface SubscriptionUpgradeModalProps {
  plan: AvailablePlanOption | null;
  currentSubscription?: DoctorSubscription | null;
  isOpen: boolean;
  creditAmount: number;
  payableAmount: number;
  currentPlanName: string;
  onClose: () => void;
  onWalletPay: () => void;
  // onConfirmUpgrade: (
  //   plan: AvailablePlanOption,
  //   cycle: BillingCycle,
  //   paymentMethod: PaymentMethod,
  // ) => Promise<void> | void;
  walletDetails: WalletBalance | null;
}
