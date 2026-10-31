
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
}

export const SubscriptionStatusModal: React.FC<
  SubscriptionStatusModalProps
> = ({
  plan,
  onConfirm,
  onClose,
  isUpdating = false,
}) => {
  const isActive = plan.status === "ACTIVE";
  const nextStatus = isActive ? "INACTIVE" : "ACTIVE";

  const accentColor = isActive ? "amber" : "emerald";

  const billingLabel = plan.billingCycle
    .toLowerCase()
    .replace(/^./, (char) => char.toUpperCase());

  const handleConfirm = () => {
    if (!isUpdating) {
      onConfirm();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
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
        className="w-full max-w-md overflow-hidden rounded-2xl
          border border-white/10 bg-[#0e1724] shadow-2xl
          animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/8 p-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl border ${
                  isActive
                    ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
                    : "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
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
                className="text-base font-bold text-white"
              >
                {isActive
                  ? "Deactivate Subscription Plan"
                  : "Activate Subscription Plan"}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Confirm your plan status change
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-slate-400 transition-colors
              hover:bg-white/10 hover:text-white
              disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Plan Summary */}
        <div className="space-y-5 p-5">
          <div
            className="rounded-xl border border-white/8
              bg-white/[0.03] p-4"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="mb-1 text-[11px] font-medium uppercase
                  tracking-wider text-slate-500"
                >
                  Subscription plan
                </p>

                <h4 className="truncate text-sm font-bold text-white">
                  {plan.name}
                </h4>

                <p className="mt-1 text-xs text-slate-400">
                  {billingLabel} billing
                </p>
              </div>

              <span
                className={`inline-flex shrink-0 items-center gap-1.5
                  rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                    isActive
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                      : "border-slate-500/20 bg-slate-500/10 text-slate-300"
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

            <div className="grid grid-cols-2 gap-3 border-t border-white/8 pt-3">
              <div>
                <div className="mb-1 flex items-center gap-1.5 text-slate-500">
                  <IndianRupee size={13} />
                  <span className="text-[11px]">Plan price</span>
                </div>

                <p className="text-sm font-bold text-white">
                  ₹{plan.price.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-1.5 text-slate-500">
                  <Users size={13} />
                  <span className="text-[11px]">Subscribers</span>
                </div>

                <p className="text-sm font-bold text-white">
                  {plan.activeSubscribersCount}
                  <span className="ml-1 text-xs font-normal text-slate-400">
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
                : "border-emerald-400/20 bg-emerald-400/[0.06]"
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Power
                size={16}
                className={`mt-0.5 shrink-0 ${
                  isActive ? "text-amber-400" : "text-emerald-400"
                }`}
              />

              <div>
                <p
                  className={`text-xs font-semibold ${
                    isActive ? "text-amber-300" : "text-emerald-300"
                  }`}
                >
                  {isActive
                    ? "What happens when you deactivate?"
                    : "What happens when you activate?"}
                </p>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
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
            className="text-xs leading-relaxed text-slate-400"
          >
            Are you sure you want to change{" "}
            <span className="font-semibold text-white">
              {plan.name}
            </span>{" "}
            from{" "}
            <span className="font-semibold text-white">
              {plan.status}
            </span>{" "}
            to{" "}
            <span
              className={`font-semibold ${
                isActive ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              {nextStatus}
            </span>
            ?
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 border-t border-white/8
          bg-white/[0.02] p-5 sm:flex-row sm:justify-end"
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="rounded-xl border border-white/10 bg-white/[0.04]
              px-4 py-2.5 text-xs font-semibold text-slate-300
              transition-colors hover:bg-white/[0.08] hover:text-white
              disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isUpdating}
            className={`inline-flex items-center justify-center gap-2
              rounded-xl px-4 py-2.5 text-xs font-semibold text-white
              shadow-lg transition-colors disabled:cursor-not-allowed
              disabled:opacity-60 ${
                isActive
                  ? "bg-amber-500 shadow-amber-500/10 hover:bg-amber-400"
                  : "bg-emerald-600 shadow-emerald-600/10 hover:bg-emerald-500"
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
