
import React, { useState } from "react";
import { useDoctorSubscription } from "@/hooks/use-doctor-subscription.hook";
import {
  SubscriptionHeader,
  CurrentPlanCard,
  SubscriptionUsageMetrics,
  SubscriptionPlanFeaturesList,
  SubscriptionPlansGrid,
  SubscriptionHistoryTable,
  SubscriptionInvoiceModal,
  SubscriptionCancelModal,
  ManagePaymentMethodModal,
} from "@/components/shared/doctor/subscription";
import SubscriptionWalletPaymentModal from "@/components/shared/doctor/subscription/subscription-wallet-payment-modal.component";
import type { AvailablePlanOption } from "@/types/doctor-subscription";
import SubscriptionUpgradeModal from "@/components/shared/doctor/subscription/subscription-upgrade.modal";
import type { RouteRoleProps } from "@/types/auth";
import { useMutate } from "@/hooks/use-mutate.hook";
import {
  buySubscriptionWithWallet,
  buySubscriptionWithRazorpay,
  verifySubscriptionRazorpay,
} from "@/services/doctor.service";
import { openRazorpayCheckout } from "@/services/shared.service";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store";

const DoctorSubscriptionPage = (roleOverride: {
  roleOverride: RouteRoleProps;
}) => {
  const {
    subscription,
    history,
    totalHistoryCount,
    plans,
    billingCycle,
    setBillingCycle,
    searchQuery,
    setSearchQuery,
    statusFilter,
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
    walletBalance,
    setSubscription,
    selectedUpgradeOption,
    creditAmount,
    payableAmount,
    currentPlanName,
  } = useDoctorSubscription("doctor");

  const user = useAuthStore((state) => state.users.doctor);
  const isDark = user?.theme === "DARK";
  const doctor = useAuthStore((state) => state.doctor);

  const [isWalletPaymentModalOpen, setIsWalletPaymentModalOpen] =
    useState(false);

  const handleCloseWalletPaymentModal = () => {
    setIsWalletPaymentModalOpen(false);
  };

  const { mutate, isPending: isBuyingWithWallet } = useMutate(
    buySubscriptionWithWallet,
    {
      onSuccess(data) {
        const res = data.data;

        if (res) setSubscription(res);

        setIsWalletPaymentModalOpen(false);
        handleCloseUpgradeModal();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    },
  );

  const handleWalletPayment = async (
    plan: AvailablePlanOption,
    payableAmount: number,
  ) => {
    mutate({
      planId: plan.id,
      doctorId: doctor?.doctor?.id!,
      paymentMethod: "WALLET",
      payableAmount,
    });
  };

  const {
    mutate: verifyRazorpayPayment,
    isPending: isVerifyingRazorpay,
  } = useMutate(verifySubscriptionRazorpay, {
    onSuccess(data) {
      const res = data?.data;

      if (res) setSubscription(res);

      handleCloseUpgradeModal();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  });

  const {
    mutate: createRazorpayOrder,
    isPending: isCreatingRazorpayOrder,
  } = useMutate(buySubscriptionWithRazorpay, {
    onSuccess(data) {
      if (data?.data) {
        const order = data.data;
        const { status, ...rest } = order;

        openRazorpayCheckout({
          order: rest,
          description: `Subscription - ${upgradeTargetPlan?.name || "Plan"}`,
          onSuccess: (response) => {
            if (response && upgradeTargetPlan && doctor?.doctor?.id) {
              verifyRazorpayPayment({
                doctorId: doctor.doctor.id,
                planId: upgradeTargetPlan.id,
                status: "SUCCESS",
                orderDetails: response,
              });
            }
          },
          onFailure: (error: any) => {
            console.error("Subscription payment failed:", error);
            toast.error(error?.description || "Payment failed");
          },
          onDismiss: () => {
            // Dismissed by doctor
          },
        });
      }
    },
  });

  const handleRazorpayPayment = () => {
    if (!upgradeTargetPlan) return;
    if (!doctor?.doctor?.id) {
      toast.error("Doctor profile not found");
      return;
    }

    createRazorpayOrder({
      doctorId: doctor.doctor.id,
      planId: upgradeTargetPlan.id,
    });
  };

  return (
    <div
      className={`min-h-full space-y-7 rounded-2xl border p-4 shadow-2xs sm:p-6 lg:p-8 ${
        isDark
          ? "border-white/10 bg-white/[0.02]"
          : "border-slate-200 bg-white"
      }`}
    >
      <SubscriptionHeader
        subscription={subscription}
        onOpenUpgradeModal={() => handleOpenUpgradeModal()}
        onOpenPaymentMethods={() => setIsPaymentMethodModalOpen(true)}
        isDark={isDark}
      />

      <CurrentPlanCard
        subscription={subscription}
        onToggleAutoRenew={handleToggleAutoRenew}
        onOpenCancelModal={() => setIsCancelModalOpen(true)}
        onOpenPaymentMethods={() => setIsPaymentMethodModalOpen(true)}
        isDark={isDark}
      />

      <SubscriptionUsageMetrics
        usage={subscription?.usage ?? null}
        isDark={isDark}
      />

      <SubscriptionPlanFeaturesList
        features={subscription?.features ?? []}
        planName={currentPlanName ?? "------"}
        isDark={isDark}
      />

      <SubscriptionPlansGrid
        plans={plans}
        currentSubscription={subscription}
        billingCycle={billingCycle}
        onBillingCycleChange={setBillingCycle}
        onSelectPlan={(plan) => handleOpenUpgradeModal(plan)}
        isDark={isDark}
      />

      <SubscriptionHistoryTable
        history={history}
        totalCount={totalHistoryCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onResetFilters={handleResetFilters}
        onViewInvoice={handleOpenInvoiceModal}
        onDownloadInvoice={handleDownloadInvoice}
        isDark={isDark}
      />

      <SubscriptionInvoiceModal
        invoice={selectedInvoice}
        isOpen={isInvoiceModalOpen}
        onClose={handleCloseInvoiceModal}
        onDownload={handleDownloadInvoice}
        isDark={isDark}
      />

      <SubscriptionUpgradeModal
        plan={upgradeTargetPlan}
        currentSubscription={subscription}
        isOpen={isUpgradeModalOpen}
        creditAmount={creditAmount}
        payableAmount={payableAmount}
        currentPlanName={currentPlanName}
        onClose={handleCloseUpgradeModal}
        onWalletPay={() => setIsWalletPaymentModalOpen(true)}
        onOnlinePay={handleRazorpayPayment}
        isOnlineProcessing={isCreatingRazorpayOrder || isVerifyingRazorpay}
        walletDetails={walletBalance}
        isDark={isDark}
      />

      <SubscriptionWalletPaymentModal
        plan={upgradeTargetPlan}
        currentSubscription={subscription}
        isOpen={isWalletPaymentModalOpen}
        creditAmount={creditAmount}
        payableAmount={payableAmount}
        onClose={handleCloseWalletPaymentModal}
        onConfirmPayment={handleWalletPayment}
        walletDetails={walletBalance}
        isDark={isDark}
      />

      <SubscriptionCancelModal
        subscription={subscription}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirmCancel={handleCancelSubscription}
        onDisableAutoRenewInstead={() => {
          handleToggleAutoRenew();
          setIsCancelModalOpen(false);
        }}
        isDark={isDark}
      />

      <ManagePaymentMethodModal
        subscription={subscription}
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        onUpdatePaymentMethod={handleUpdatePaymentMethod}
        isDark={isDark}
      />
    </div>
  );
};

export default DoctorSubscriptionPage;
