
import React from "react";
import { CalendarClock, X, RefreshCw } from "lucide-react";
import type { DoctorSubscription } from "@/types/doctor-subscription";

interface SubscriptionCancelledSwitchModalProps {
  subscription: DoctorSubscription;
  isOpen: boolean;
  onClose: () => void;
  onReactivate: () => void;
}

const SubscriptionCancelledSwitchModal: React.FC<
  SubscriptionCancelledSwitchModalProps
> = ({ subscription, isOpen, onClose, onReactivate }) => {
  if (!isOpen) return null;

  const endDate = subscription.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd)
    : null;

  const hasValidDate = endDate && !Number.isNaN(endDate.getTime());

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancelled-subscription-title"
        className="w-full max-w-md rounded-2xl border border-amber-500/20 bg-[#0d1520] p-6 text-white shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <CalendarClock size={21} />
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <h2
          id="cancelled-subscription-title"
          className="text-lg font-semibold"
        >
          Subscription Cancellation Scheduled
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          Your current subscription is scheduled to end
          {hasValidDate
            ? ` on ${endDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}`
            : " at the end of your current billing period"}.
          You can continue using your current plan until then,
          according to your subscription terms.
        </p>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm font-medium text-white">
            Want to switch plans?
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            Reactivate your subscription first. You can then
            choose another plan without conflicting with your
            pending cancellation.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onReactivate}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1dc465] px-4 py-3 text-sm font-semibold text-[#07130b] transition hover:bg-[#19b85b]"
          >
            <RefreshCw size={16} />
            Reactivate Subscription
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5"
          >
            Keep Current Plan
          </button>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionCancelledSwitchModal;
