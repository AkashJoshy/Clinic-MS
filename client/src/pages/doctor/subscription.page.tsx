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
import type { BillingCycle } from "@/types/subscription";
import SubscriptionUpgradeModal from "@/components/shared/doctor/subscription/subscription-upgrade.modal";
import type { RouteRoleProps } from "@/types/auth";
import { useMutate } from "@/hooks/use-mutate.hook";
import { buySubscriptionWithWallet } from "@/services/doctor.service";
import { useAuthStore } from "@/store";
import SubscriptionCancelledSwitchModal from "@/components/shared/doctor/subscription/subscription-cancelled-switch.modal";
import toast from "react-hot-toast";

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

  return (
    <div className="min-h-full space-y-7 rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-2xs sm:p-6 lg:p-8">
      <SubscriptionHeader
        subscription={subscription}
        onOpenUpgradeModal={() => handleOpenUpgradeModal()}
        onOpenPaymentMethods={() => setIsPaymentMethodModalOpen(true)}
      />

      <CurrentPlanCard
        subscription={subscription}
        onToggleAutoRenew={handleToggleAutoRenew}
        onOpenCancelModal={() => setIsCancelModalOpen(true)}
        onOpenPaymentMethods={() => setIsPaymentMethodModalOpen(true)}
      />

      <SubscriptionUsageMetrics usage={subscription?.usage ?? null} />

      <SubscriptionPlanFeaturesList
        features={subscription?.features ?? []}
        planName={currentPlanName ?? "------"}
      />

      <SubscriptionPlansGrid
        plans={plans}
        currentSubscription={subscription}
        billingCycle={billingCycle}
        onBillingCycleChange={setBillingCycle}
        onSelectPlan={(plan) => handleOpenUpgradeModal(plan)}
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
      />

      <SubscriptionInvoiceModal
        invoice={selectedInvoice}
        isOpen={isInvoiceModalOpen}
        onClose={handleCloseInvoiceModal}
        onDownload={handleDownloadInvoice}
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
        walletDetails={walletBalance}
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
      />

      <ManagePaymentMethodModal
        subscription={subscription}
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        onUpdatePaymentMethod={handleUpdatePaymentMethod}
      />
    </div>
  );
};

export default DoctorSubscriptionPage;
