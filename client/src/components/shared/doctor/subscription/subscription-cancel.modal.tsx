import React, { useEffect, useState } from "react";
import { AlertTriangle, X, ShieldAlert, Calendar } from "lucide-react";
import type { DoctorSubscription } from "@/types/doctor-subscription";

export type CancellationReason =
  | "TOO_EXPENSIVE"
  | "TEMPORARILY_CLOSING_CLINIC"
  | "MISSING_FEATURES"
  | "SWITCHING_PLATFORM"
  | "OTHER";

interface SubscriptionCancelModalProps {
  subscription: DoctorSubscription | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: (reason: CancellationReason, message?: string) => void;
  onDisableAutoRenewInstead: () => void;
}

const CANCELLATION_REASONS: {
  value: CancellationReason;
  label: string;
}[] = [
  {
    value: "TOO_EXPENSIVE",
    label: "Cost concerns / looking for cheaper alternative",
  },
  {
    value: "TEMPORARILY_CLOSING_CLINIC",
    label: "Temporarily closing clinic or taking leave",
  },
  {
    value: "MISSING_FEATURES",
    label: "Missing specific EHR or lab features",
  },
  {
    value: "SWITCHING_PLATFORM",
    label: "Switching to another clinic management software",
  },
  { value: "OTHER", label: "Other reasons" },
];

export const SubscriptionCancelModal: React.FC<
  SubscriptionCancelModalProps
> = ({
  subscription,
  isOpen,
  onClose,
  onConfirmCancel,
  onDisableAutoRenewInstead,
}) => {
  const [selectedReason, setSelectedReason] =
    useState<CancellationReason>("TOO_EXPENSIVE");
  const [message, setMessage] = useState("");

  // Reset the form whenever the modal opens.
  useEffect(() => {
    if (isOpen) {
      setSelectedReason("TOO_EXPENSIVE");
      setMessage("");
    }
  }, [isOpen]);

  // Prevent background page scrolling while the modal is open.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirmCancel = () => {
    onConfirmCancel(selectedReason, message.trim() || undefined);
  };

  const parsedRenewalDate =
    subscription && subscription.cancelledAt
      ? new Date(subscription.cancelledAt)
      : null;

  const hasValidRenewalDate =
    parsedRenewalDate !== null && !Number.isNaN(parsedRenewalDate.getTime());

  const renewalDateFormatted = hasValidRenewalDate
    ? parsedRenewalDate.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const modalContentClass = `
    min-h-0 flex-1 overflow-y-auto overscroll-contain
    p-6 text-xs text-gray-300
    [scrollbar-width:thin]
    [scrollbar-color:rgba(139,154,176,0.4)_transparent]
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-[#536174]
    [&::-webkit-scrollbar-thumb:hover]:bg-[#8b9ab0]
  `;

  // No active subscription.
  if (!subscription) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-subscription-title"
          className="flex max-h-[90dvh] min-h-0 w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1520] shadow-2xl"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                <AlertTriangle size={16} />
              </span>
              <h3
                id="cancel-subscription-title"
                className="text-sm font-bold text-white"
              >
                No Active Subscription
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className={`${modalContentClass} space-y-2`}>
            <p className="text-sm font-semibold text-white">
              You don't have an active subscription to cancel.
            </p>
            <p className="text-xs leading-relaxed text-gray-400">
              You can explore the available plans and choose one whenever you're
              ready.
            </p>
          </div>

          <div className="flex shrink-0 justify-end border-t border-white/10 bg-[#09101a] px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl bg-[#1dc465] px-4 py-2 text-xs font-bold text-[#07130c] transition-colors hover:bg-[#19b85b]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-subscription-title"
        className="flex max-h-[90dvh] min-h-0 w-full max-w-md flex-col overflow-hidden rounded-2xl border border-red-500/30 bg-[#0d1520] shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#160b0e] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
              <ShieldAlert size={16} />
            </span>
            <h3
              id="cancel-subscription-title"
              className="text-sm font-bold text-white"
            >
              Cancel Subscription
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className={`${modalContentClass} space-y-4`}>
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-amber-200">
            <AlertTriangle
              size={16}
              className="mt-0.5 shrink-0 text-amber-400"
            />
            <div className="space-y-1">
              <p className="font-semibold text-white">
                {renewalDateFormatted
                  ? `Your access is expected to continue until ${renewalDateFormatted}`
                  : "Your subscription access may change after cancellation"}
              </p>
              <p className="text-[11px] leading-relaxed text-amber-200/90">
                After cancellation, access to paid features will depend on your
                subscription terms. Your patient and appointment data should
                remain available according to your application's data retention
                policy.
              </p>
            </div>
          </div>

          {/* Cancellation Reason */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Please let us know why you are cancelling:
            </label>

            <div className="space-y-2">
              {CANCELLATION_REASONS.map(({ value, label }) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 transition-colors hover:bg-white/5"
                >
                  <input
                    type="radio"
                    name="cancel_reason"
                    value={value}
                    checked={selectedReason === value}
                    onChange={() => setSelectedReason(value)}
                    className="accent-[#1dc465]"
                  />
                  <span className="text-xs text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Message */}
          <div className="space-y-2">
            <label
              htmlFor="cancellation-message"
              className="text-[11px] font-bold uppercase tracking-wider text-gray-400"
            >
              Additional feedback (Optional)
            </label>
            <textarea
              id="cancellation-message"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 150))}
              maxLength={150}
              rows={3}
              placeholder="Tell us more (optional)"
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs text-gray-300 outline-none transition-colors placeholder:text-gray-500 focus:border-[#1dc465]"
            />
            <p className="text-right text-[10px] text-gray-500">
              {message.length}/150
            </p>
          </div>

          {/* Auto-renewal Alternative */}
          {subscription.autoRenew && (
            <div className="space-y-2 rounded-xl border border-white/10 bg-[#09101a] p-3.5">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Calendar size={14} className="text-[#1dc465]" />
                <span>Prefer to turn off auto-renewal?</span>
              </div>
              <p className="text-[11px] text-[#8b9ab0]">
                Keep your current subscription until its expiry date without
                automatically renewing it.
              </p>
              <button
                type="button"
                onClick={onDisableAutoRenewInstead}
                className="mt-1 w-full cursor-pointer rounded-lg border border-[#1dc465]/40 bg-[#1dc465]/10 py-1.5 text-xs font-semibold text-[#1dc465] transition-colors hover:bg-[#1dc465]/20"
              >
                Turn Off Auto-Renew Instead
              </button>
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-[#09101a] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/5"
          >
            Keep Subscription
          </button>
          <button
            type="button"
            onClick={handleConfirmCancel}
            className="cursor-pointer rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-colors hover:bg-red-500"
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};
