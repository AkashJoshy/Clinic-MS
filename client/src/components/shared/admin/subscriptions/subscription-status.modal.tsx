
import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Power,
  X,
  Users,
  IndianRupee,
  LoaderCircle,
} from "lucide-react";

import type { SubscriptionPlan } from "@/types/subscription";

interface SubscriptionStatusModalProps {
  plan: SubscriptionPlan;
  onConfirm: () => void;
  onClose: () => void;
  isUpdating?: boolean;
  isDark: boolean;
}

export const SubscriptionStatusModal: React.FC<
  SubscriptionStatusModalProps
> = ({
  plan,
  onConfirm,
  onClose,
  isUpdating = false,
  isDark,
}) => {
  const isActive = plan.status === "ACTIVE";
  const nextStatus = isActive ? "INACTIVE" : "ACTIVE";

  const billingLabel = plan.billingCycle
    .toLowerCase()
    .replace(/^./, (char) => char.toUpperCase());

  const theme = {
    modal: isDark
      ? "border-white/10 bg-[#0e1724]"
      : "border-gray-200 bg-white",

    headerBorder: isDark ? "border-white/8" : "border-gray-200",

    title: isDark ? "text-white" : "text-gray-900",
    description: isDark ? "text-slate-400" : "text-gray-500",

    closeButton: isDark
      ? "text-slate-400 hover:bg-white/10 hover:text-white"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",

    summary: isDark
      ? "border-white/8 bg-white/[0.03]"
      : "border-gray-200 bg-gray-50",

    label: isDark ? "text-slate-500" : "text-gray-500",
    planName: isDark ? "text-white" : "text-gray-900",
    price: isDark ? "text-white" : "text-gray-900",
    secondaryText: isDark ? "text-slate-400" : "text-gray-500",

    summaryBorder: isDark ? "border-white/8" : "border-gray-200",

    explanationText: isDark ? "text-slate-300" : "text-gray-600",

    confirmationText: isDark ? "text-slate-400" : "text-gray-500",

    confirmationName: isDark ? "text-white" : "text-gray-900",

    footer: isDark
      ? "border-white/8 bg-white/[0.02]"
      : "border-gray-200 bg-gray-50",

    cancelButton: isDark
      ? "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  const handleConfirm = () => {
    if (!isUpdating) {
      onConfirm();
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center
        bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isUpdating) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscription-status-title"
        aria-describedby="subscription-status-description"
        className={`w-full max-w-md overflow-hidden rounded-2xl
          border shadow-2xl animate-in zoom-in-95 duration-200 ${theme.modal}`}
      >
        {/* Header */}
        <div
          className={`flex items-start justify-between border-b p-5 ${theme.headerBorder}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl border ${
                  isActive
                    ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
                    : "border-primary/20 bg-primary/10 text-primary"
                }`}
            >
              {isActive ? (
                <AlertTriangle size={21} />
              ) : (
                <CheckCircle2 size={21} />
              )}
            </div>

            <div>
              <h3
                id="subscription-status-title"
                className={`text-base font-bold ${theme.title}`}
              >
                {isActive
                  ? "Deactivate Subscription Plan"
                  : "Activate Subscription Plan"}
              </h3>

              <p className={`mt-1 text-xs ${theme.description}`}>
                Confirm your plan status change
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            aria-label="Close modal"
            className={`rounded-lg p-1.5 transition-colors
              disabled:cursor-not-allowed disabled:opacity-50 ${theme.closeButton}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Plan Summary */}
        <div className="space-y-5 p-5">
          <div
            className={`rounded-xl border p-4 ${theme.summary}`}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p
                  className={`mb-1 text-[11px] font-medium uppercase
                    tracking-wider ${theme.label}`}
                >
                  Subscription plan
                </p>

                <h4 className={`truncate text-sm font-bold ${theme.planName}`}>
                  {plan.name}
                </h4>

                <p className={`mt-1 text-xs ${theme.secondaryText}`}>
                  {billingLabel} billing
                </p>
              </div>

              <span
                className={`inline-flex shrink-0 items-center gap-1.5
                  rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                    isActive
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                      : "border-slate-500/20 bg-slate-500/10 text-slate-400"
                  }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-emerald-400" : "bg-slate-400"
                  }`}
                />
                {plan.status}
              </span>
            </div>

            <div
              className={`grid grid-cols-2 gap-3 border-t pt-3 ${theme.summaryBorder}`}
            >
              <div>
                <div className={`mb-1 flex items-center gap-1.5 ${theme.label}`}>
                  <IndianRupee size={13} />
                  <span className="text-[11px]">Plan price</span>
                </div>

                <p className={`text-sm font-bold ${theme.price}`}>
                  ₹{plan.price.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <div className={`mb-1 flex items-center gap-1.5 ${theme.label}`}>
                  <Users size={13} />
                  <span className="text-[11px]">Subscribers</span>
                </div>

                <p className={`text-sm font-bold ${theme.price}`}>
                  {plan.activeSubscribersCount}
                  <span className={`ml-1 text-xs font-normal ${theme.secondaryText}`}>
                    doctors
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Status Change Explanation */}
          <div
            className={`rounded-xl border p-3.5 ${
              isActive
                ? "border-amber-400/20 bg-amber-400/[0.06]"
                : "border-primary/20 bg-primary/[0.06]"
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Power
                size={16}
                className={`mt-0.5 shrink-0 ${
                  isActive ? "text-amber-400" : "text-primary"
                }`}
              />

              <div>
                <p
                  className={`text-xs font-semibold ${
                    isActive ? "text-amber-400" : "text-primary"
                  }`}
                >
                  {isActive
                    ? "What happens when you deactivate?"
                    : "What happens when you activate?"}
                </p>

                <p className={`mt-1.5 text-xs leading-relaxed ${theme.explanationText}`}>
                  {isActive
                    ? "This plan will no longer be available for new purchases. Existing subscribers will retain their current subscription benefits according to your subscription and billing policies."
                    : "This plan will become available for new purchases again. Eligible doctors will be able to subscribe under the configured plan price and features."}
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Text */}
          <p
            id="subscription-status-description"
            className={`text-xs leading-relaxed ${theme.confirmationText}`}
          >
            Are you sure you want to change{" "}
            <span className={`font-semibold ${theme.confirmationName}`}>
              {plan.name}
            </span>{" "}
            from{" "}
            <span className={`font-semibold ${theme.confirmationName}`}>
              {plan.status}
            </span>{" "}
            to{" "}
            <span
              className={`font-semibold ${
                isActive ? "text-amber-400" : "text-primary"
              }`}
            >
              {nextStatus}
            </span>
            ?
          </p>
        </div>

        {/* Actions */}
        <div
          className={`flex flex-col-reverse gap-2 border-t p-5
            sm:flex-row sm:justify-end ${theme.footer}`}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className={`rounded-xl border px-4 py-2.5 text-xs font-semibold
              transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${theme.cancelButton}`}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isUpdating}
            className={`inline-flex items-center justify-center gap-2
              rounded-xl px-4 py-2.5 text-xs font-semibold shadow-lg
              transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                isActive
                  ? "bg-amber-500 text-white shadow-amber-500/10 hover:bg-amber-400"
                  : "bg-primary text-primary-foreground shadow-primary/10 hover:bg-primary/90"
              }`}
          >
            {isUpdating ? (
              <>
                <LoaderCircle size={15} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Power size={15} />
                {isActive ? "Deactivate Plan" : "Activate Plan"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStatusModal;
