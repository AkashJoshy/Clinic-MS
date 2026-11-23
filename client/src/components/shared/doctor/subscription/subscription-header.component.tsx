
import React from "react";
import { Sparkles, CreditCard } from "lucide-react";
import type { SubscriptionHeaderProps } from "@/types/doctor-subscription";

export const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({
  subscription,
  onOpenUpgradeModal,
  onOpenPaymentMethods,
  isDark,
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
      : "border border-primary/30 bg-primary/10 text-primary";

  const statusDotClass = !hasSubscription
    ? "bg-gray-400"
    : isCancelled
      ? "bg-amber-400"
      : "animate-pulse bg-primary";

  const titleClass = isDark ? "text-white" : "text-slate-900";
  const descriptionClass = isDark ? "text-[#8b9ab0]" : "text-slate-600";

  const paymentButtonClass = isDark
    ? "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";

  const paymentIconClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";

  return (
    <div
      className={`flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between ${
        isDark ? "border-white/10" : "border-slate-200"
      }`}
    >
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1
            className={`text-2xl font-bold tracking-tight sm:text-3xl ${titleClass}`}
          >
            Subscription & Billing
          </h1>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold ${statusClass}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusDotClass}`} />
            {statusLabel}
          </span>
        </div>

        <p className={`text-xs sm:text-sm ${descriptionClass}`}>
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
          className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all active:scale-[0.98] ${paymentButtonClass}`}
        >
          <CreditCard size={14} className={paymentIconClass} />
          <span>Payment Methods</span>
        </button>

        <button
          type="button"
          onClick={onOpenUpgradeModal}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          <Sparkles size={14} />
          <span>{hasSubscription ? "Change Plan" : "Choose a Plan"}</span>
        </button>
      </div>
    </div>
  );
};
