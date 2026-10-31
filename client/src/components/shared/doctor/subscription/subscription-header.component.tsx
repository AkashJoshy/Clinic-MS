import React from "react";
import { Sparkles, CreditCard } from "lucide-react";
import type { SubscriptionHeaderProps } from "@/types/doctor-subscription";

export const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({
  subscription,
  onOpenUpgradeModal,
  onOpenPaymentMethods,
}) => {
  const hasSubscription = subscription !== null;
  const isCancelled = subscription?.status === "CANCELLED";
  const isActive = hasSubscription && !isCancelled;

  const statusLabel = !hasSubscription
    ? "No Active Plan"
    : isCancelled
      ? "Cancellation Pending"
      : "Active Member";

  const statusClass = !hasSubscription
    ? "border border-gray-500/30 bg-gray-500/10 text-gray-400"
    : isCancelled
      ? "border border-amber-500/30 bg-amber-500/10 text-amber-400"
      : "border border-emerald-500/30 bg-emerald-500/10 text-[#1dc465]";

  const statusDotClass = !hasSubscription
    ? "bg-gray-400"
    : isCancelled
      ? "bg-amber-400"
      : "animate-pulse bg-[#1dc465]";

  return (
    <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Subscription & Billing
          </h1>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold ${statusClass}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusDotClass}`} />
            {statusLabel}
          </span>
        </div>

        <p className="text-xs text-[#8b9ab0] sm:text-sm">
          {isActive
            ? "Manage your clinical practice plan, track resource usage quotas, and download GST tax invoices."
            : isCancelled
              ? "Your subscription is pending cancellation. Review your plan details or explore other available plans."
              : "Choose a subscription plan for your clinical practice and manage your billing details."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:pt-0">
        <button
          type="button"
          onClick={onOpenPaymentMethods}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"
        >
          <CreditCard size={14} className="text-[#8b9ab0]" />
          <span>Payment Methods</span>
        </button>

        <button
          type="button"
          onClick={onOpenUpgradeModal}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#1dc465] to-[#17a050] px-4 py-2 text-xs font-bold text-[#080d14] shadow-md shadow-[#1dc465]/20 transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <Sparkles size={14} />
          <span>{hasSubscription ? "Change Plan" : "Choose a Plan"}</span>
        </button>
      </div>
    </div>
  );
};
