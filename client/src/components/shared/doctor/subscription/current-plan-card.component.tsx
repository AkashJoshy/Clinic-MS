import React from "react";
import {
  Calendar,
  CreditCard,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
  CheckCircle2,
  Layers,
} from "lucide-react";

import type {
  CurrentPlanCardProps,
  DoctorSubscription,
} from "@/types/doctor-subscription";

const formatDate = (date: string | null): string => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getDaysRemaining = (expiryDate: string | null): number | null => {
  if (!expiryDate) return null;

  const expiry = new Date(expiryDate);

  if (Number.isNaN(expiry.getTime())) return null;

  return Math.max(
    0,
    Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );
};

const getPaymentMethodLabel = (
  paymentMethod: DoctorSubscription["paymentMethod"],
): string => {
  switch (paymentMethod) {
    case "WALLET":
      return "Wallet";
    case "RAZORPAY":
      return "Razorpay";
    case "BANK_TRANSFER":
      return "Bank Transfer";
    case "SYSTEM":
      return "System";
    default:
      return "Not available";
  }
};

export const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({
  subscription,
  onToggleAutoRenew,
  onOpenCancelModal,
  onOpenPaymentMethods,
}) => {
  if (!subscription) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1f20] via-[#09151f] to-[#070e17] p-6 shadow-xl lg:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1dc465]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-400">
              <AlertTriangle size={12} />
              No Active Subscription
            </span>

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Choose Your Plan
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#8b9ab0]">
                Subscribe to a plan to unlock your practice management features,
                appointment scheduling, and other available benefits.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#8b9ab0]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#1dc465]" />
                Flexible plans
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#1dc465]" />
                Choose what suits your practice
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              document.getElementById("all-available-plans")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1dc465] px-5 py-3 text-sm font-bold text-[#080d14] shadow-md transition-all hover:bg-[#18af59] active:scale-[0.98]"
          >
            <Layers size={16} />
            <span>Explore Plans</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  const isCancelled = subscription.status === "CANCELLED";

  const expiryDate = subscription.currentPeriodEnd;
  const expiryDateFormatted = formatDate(expiryDate);
  const daysRemaining = getDaysRemaining(expiryDate);

  const billingCycleLabel = subscription.billingCycle
    .toLowerCase()
    .replace(/_/g, " ");

  const paymentMethod = subscription.paymentMethod;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1dc465]/30 bg-gradient-to-br from-[#0c1f20] via-[#09151f] to-[#070e17] p-5 shadow-xl shadow-[#1dc465]/5 lg:p-7">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1dc465]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                isCancelled
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                  : "border-[#1dc465]/30 bg-[#1dc465]/15 text-[#1dc465]"
              }`}
            >
              {isCancelled ? "Subscription Cancelled" : "Current Plan"}
            </span>

            {!isCancelled &&
              (subscription.autoRenew ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                  <RefreshCw size={11} />
                  Auto-Renew ON
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-400">
                  <AlertTriangle size={11} />
                  Auto-Renew OFF
                </span>
              ))}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Subscription Plan
            </h2>

            <p className="mt-1 text-xs text-[#8b9ab0] sm:text-sm">
              Manage your subscription, billing, and practice plan benefits.
            </p>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 pt-1">
            <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {subscription.currency}{" "}
              {subscription.price.toLocaleString("en-IN")}
            </span>

            <span className="text-xs font-semibold text-[#8b9ab0]">
              / {billingCycleLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 lg:min-w-[320px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs text-[#8b9ab0]">
              <Calendar size={15} className="text-[#1dc465]" />
              <span>Subscription Expiry Date</span>
            </div>

            <span className="text-xs font-bold text-white">
              {expiryDateFormatted}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs text-[#8b9ab0]">
              <CreditCard size={15} className="text-[#1dc465]" />
              <span>Payment Method</span>
            </div>

            {paymentMethod === "WALLET" ? (
              <button
                type="button"
                onClick={onOpenPaymentMethods}
                className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-white transition-colors hover:text-[#1dc465]"
              >
                <span>{getPaymentMethodLabel(paymentMethod)}</span>
                <ArrowUpRight size={12} />
              </button>
            ) : (
              <span className="text-xs text-[#8b9ab0]">
                {getPaymentMethodLabel(paymentMethod)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs text-[#8b9ab0]">
              <Calendar size={15} className="text-[#1dc465]" />
              <span>Period Started</span>
            </div>

            <span className="text-xs font-bold text-white">
              {formatDate(subscription.currentPeriodStart)}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-xs text-[#8b9ab0]">
              <span>Period Validity</span>
            </div>

            <span className="rounded-md bg-[#1dc465]/10 px-2 py-0.5 text-xs font-bold text-[#1dc465]">
              {daysRemaining === null
                ? "Not available"
                : daysRemaining === 0
                  ? "Expires today"
                  : `${daysRemaining} Days Left`}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              document.getElementById("all-available-plans")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#1dc465] px-4 py-2 text-xs font-bold text-[#080d14] shadow-md transition-all hover:bg-[#18af59] active:scale-[0.98]"
          >
            <Sparkles size={14} />
            <span>Change or Upgrade Plan</span>
          </button>

          {!isCancelled && (
            <button
              type="button"
              onClick={onToggleAutoRenew}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              <RefreshCw
                size={13}
                className={
                  subscription.autoRenew ? "text-[#1dc465]" : "text-gray-400"
                }
              />

              <span>
                {subscription.autoRenew
                  ? "Disable Auto-Renew"
                  : "Enable Auto-Renew"}
              </span>
            </button>
          )}
        </div>

        {!isCancelled && (
          <button
            type="button"
            onClick={onOpenCancelModal}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-red-400/80 transition-colors hover:text-red-300 hover:underline"
          >
            <ShieldAlert size={13} />
            <span>Cancel Subscription</span>
          </button>
        )}
      </div>

      {isCancelled && subscription.cancelledAt && (
        <div className="relative z-10 mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
          <p className="text-xs font-semibold text-amber-400">
            Cancelled on: {formatDate(subscription.cancelledAt)}
          </p>

          {subscription.cancellationReason && (
            <p className="mt-1 text-xs text-[#8b9ab0]">
              Reason:{" "}
              {subscription.cancellationReason.toLowerCase().replace(/_/g, " ")}
            </p>
          )}

          {subscription.cancellationMessage && (
            <p className="mt-1 text-xs leading-5 text-[#8b9ab0]">
              {subscription.cancellationMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
