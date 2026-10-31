import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import type {
  DoctorSubscription,
  SubscriptionHistory,
  AvailablePlanOption,
  HistoryItemStatus,
  WalletBalance,
  SubscriptionChangeOption,
} from "@/types/doctor-subscription";
import {
  INITIAL_DOCTOR_SUBSCRIPTION,
  SUBSCRIPTION_HISTORY,
  AVAILABLE_PLANS,
} from "@/constants/doctor-subscription.constant";
import {
  cancelSubscription,
  fetchSubscriptionOverview,
  getSubscriptionUpgardeOptions,
} from "@/services/doctor.service";
import type { BillingCycle } from "@/types/subscription";
import { getWalletBalance } from "@/services/shared.service";
import type { RouteRoleProps } from "@/types/auth";
import { useAuthStore } from "@/store";
import { useMutate } from "./use-mutate.hook";

export function useDoctorSubscription(roleOverride: RouteRoleProps) {
  const [subscription, setSubscription] = useState<DoctorSubscription | null>(
    null,
  );
  const [history, setHistory] = useState<SubscriptionHistory[]>([]);
  // const [history, setHistory] =
  //   useState<SubscriptionHistoryItem[]>(SUBSCRIPTION_HISTORY);
  const [plans, setPlans] = useState<AvailablePlanOption[]>([]);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(
    null,
  );
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("MONTHLY");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | HistoryItemStatus>(
    "ALL",
  );

  const [selectedInvoice, setSelectedInvoice] =
    useState<SubscriptionHistory | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const [upgradeTargetPlan, setUpgradeTargetPlan] =
    useState<AvailablePlanOption | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] =
    useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<
    "WALLET" | "ONLINE" | null
  >(null);

  const { isPending, mutate } = useMutate(cancelSubscription, {
    onSuccess(data) {
      const res = data.data;
      setSubscription((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          status: "CANCELLED",
          autoRenew: false,
        };
      });
      setIsCancelModalOpen(false);
      toast("Subscription set to cancel at end of current period.", {
        icon: "ℹ️",
        duration: 4000,
      });
    },
  });

  const fetchSubscription = async () => {
    try {
      const res = await fetchSubscriptionOverview();
      const data = res.data;
      if (data) {
        setSubscription(data.current);
        setHistory(SUBSCRIPTION_HISTORY);
        setPlans(data.availablePlans);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const user = useAuthStore((state) => state.users[roleOverride]);
  const doctor = useAuthStore((state) => state.doctor);

  const fetchWalletBalance = async () => {
    try {
      if (!user) return;

      const res = await getWalletBalance({
        id: user.id!,
        ownerRole: roleOverride,
      });

      const data = res.data;
      if (data) {
        setWalletBalance(data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const [upgradeOptions, setUpgradeOptions] = useState<
    SubscriptionChangeOption[]
  >([]);

  const fetchSubscriptionUpgrade = async () => {
    try {
      const data = await getSubscriptionUpgardeOptions(doctor?.doctor?.id!);
      const res = data.data;
      setUpgradeOptions(res.options ?? []);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSubscription();
    fetchWalletBalance();
  }, []);

  useEffect(() => {
    fetchSubscriptionUpgrade();
  }, []);

  const selectedUpgradeOption = useMemo(() => {
    if (!upgradeTargetPlan) return null;

    return (
      upgradeOptions.find((option) => option.planId === upgradeTargetPlan.id) ??
      null
    );
  }, [upgradeOptions, upgradeTargetPlan]);

  const creditAmount = selectedUpgradeOption?.unusedSubscriptionCredit ?? 0;

  const payableAmount = selectedUpgradeOption?.payableAmount ?? 0;

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [history, searchQuery, statusFilter]);

  const handleOpenInvoiceModal = (invoice: SubscriptionHistory) => {
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
  };

  const handleCloseInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleOpenUpgradeModal = (plan?: AvailablePlanOption) => {
    const target =
      plan || plans.find((p) => p.tier === "ENTERPRISE") || plans[0];
    setUpgradeTargetPlan(target);
    setIsUpgradeModalOpen(true);
  };

  const handleCloseUpgradeModal = () => {
    setIsUpgradeModalOpen(false);
    setUpgradeTargetPlan(null);
  };

  const handleToggleAutoRenew = () => {
    const nextState = !subscription?.autoRenew;
    if (subscription)
      setSubscription((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          autoRenew: nextState,
        };
      });
    if (nextState) {
      toast.success(
        "Auto-renewal enabled. Your subscription will renew seamlessly.",
      );
    } else {
      toast(
        "Auto-renewal disabled. Your access remains active until the billing period ends.",
        {
          icon: "⚠️",
        },
      );
    }
  };

  const currentPlanName = useMemo(() => {
    return (
      plans.find((p) => p.id === subscription?.planId)?.name ??
      "Current subscription"
    );
  }, [subscription]);

  const handleConfirmUpgrade = (
    targetPlan: AvailablePlanOption,
    chosenCycle: BillingCycle,
  ) => {
    setIsPaymentModalOpen(true);
    const newPrice =
      chosenCycle === "YEARLY"
        ? targetPlan.yearlyPrice
        : targetPlan.monthlyPrice;

    setSubscription((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        planId: targetPlan.id,
        planName: targetPlan.name,
        tier: targetPlan.tier,
        price: newPrice,
        billingCycle: chosenCycle,
        status: "ACTIVE",
        daysRemaining: chosenCycle === "YEARLY" ? 365 : 30,
        usage: {
          ...prev.usage,
          consultations: {
            ...prev.usage.consultations,
            total: targetPlan.tier === "ENTERPRISE" ? 1000 : 250,
          },
          staffAccounts: {
            ...prev.usage.staffAccounts,
            total: targetPlan.tier === "ENTERPRISE" ? 50 : 5,
          },
        },
      };
    });

    const newInvoice: SubscriptionHistory = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      planName: `${targetPlan.name} - ${chosenCycle === "YEARLY" ? "Annual" : "Monthly"}`,
      billingCycle: chosenCycle,
      amount: newPrice,
      taxAmount: Math.round(newPrice * 0.18 * 100) / 100,
      totalAmount: Math.round(newPrice * 1.18 * 100) / 100,
      currency: "₹",
      paidAt: new Date().toISOString(),
      periodStart: new Date().toISOString(),
      periodEnd: new Date(
        Date.now() + (chosenCycle === "YEARLY" ? 365 : 30) * 86400000,
      ).toISOString(),
      paymentMethod: `Visa ending in ${subscription?.paymentMethod.last4}`,
      transactionId: `txn_rzp_${Math.random().toString(36).substring(2, 10)}`,
      status: "PAID",
      customerName: "Dr. Alexander Wright, MD",
      customerEmail: "alexander.wright@medicare.com",
      clinicName: "Apex Specialty Clinic",
      clinicGstin: "29AABCU9603R1ZM",
    };

    setHistory((prev) => [newInvoice, ...prev]);

    setIsUpgradeModalOpen(false);
    toast.success(`Successfully switched to ${targetPlan.name}!`);
  };

  const handleCancelSubscription = (reason?: string) => {
    mutate({
      doctorId: doctor?.doctor.id!,
      planId: subscription?.planId!,
      cancellationMessage: "sfsdfsdsdds",
      cancellationReason: reason!,
    });
  };

  const handleUpdatePaymentMethod = (
    brand: string,
    last4: string,
    expiry: string,
  ) => {
    setSubscription((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        paymentMethod: { brand, last4, expiry },
      };
    });
    setIsPaymentMethodModalOpen(false);
    toast.success("Payment method updated successfully!");
  };

  const handleDownloadInvoice = (invoice: SubscriptionHistory) => {
    toast.success(`Downloading invoice ${invoice.invoiceNumber}...`, {
      icon: "📄",
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
  };

  return {
    subscription,
    history: filteredHistory,
    totalHistoryCount: history.length,
    plans,
    billingCycle,
    setBillingCycle,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setSubscription,
    setStatusFilter,
    selectedInvoice,
    isInvoiceModalOpen,
    upgradeTargetPlan,
    isUpgradeModalOpen,
    isCancelModalOpen,
    isPaymentMethodModalOpen,
    setIsCancelModalOpen,
    setIsPaymentMethodModalOpen,
    handleOpenInvoiceModal,
    handleCloseInvoiceModal,
    handleOpenUpgradeModal,
    handleCloseUpgradeModal,
    handleToggleAutoRenew,
    handleConfirmUpgrade,
    handleCancelSubscription,
    handleUpdatePaymentMethod,
    handleDownloadInvoice,
    handleResetFilters,
    isPaymentModalOpen,
    isProcessing,
    setIsProcessing,
    isWalletModalOpen,
    setIsWalletModalOpen,
    paymentMethod,
    setPaymentMethod,
    walletBalance,
    currentPlanName,
    selectedUpgradeOption,
    creditAmount,
    payableAmount,
  };
}
