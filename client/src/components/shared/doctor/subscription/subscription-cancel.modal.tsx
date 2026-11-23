import React, { useEffect, useState } from "react";
import { AlertTriangle, X, ShieldAlert, Calendar } from "lucide-react";
import type {
  CancellationReason,
  SubscriptionCancelModalProps,
} from "@/types/doctor-subscription";
import { CANCELLATION_REASONS } from "@/constants/doctor-subscription.constant";

export const SubscriptionCancelModal: React.FC<
  SubscriptionCancelModalProps
> = ({
  subscription,
  isOpen,
  isDark,
  onClose,
  onConfirmCancel,
  onDisableAutoRenewInstead,
}) => {
  const [selectedReason, setSelectedReason] =
    useState<CancellationReason>("TOO_EXPENSIVE");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedReason("TOO_EXPENSIVE");
      setMessage("");
    }
  }, [isOpen]);

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

  const modalBg = isDark ? "bg-[#0d1520]" : "bg-white";
  const headerBg = isDark ? "bg-[#160b0e]" : "bg-red-50";
  const footerBg = isDark ? "bg-[#09101a]" : "bg-slate-50";
  const borderColor = isDark ? "border-white/10" : "border-slate-200";
  const primaryText = isDark ? "text-white" : "text-slate-900";
  const secondaryText = isDark ? "text-gray-300" : "text-slate-700";
  const mutedText = isDark ? "text-gray-400" : "text-slate-600";
  const subtleText = isDark ? "text-gray-500" : "text-slate-500";

  const modalContentClass = `
    min-h-0 flex-1 overflow-y-auto overscroll-contain
    p-6 text-xs
    ${secondaryText}
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
        className="fixed inset-0 z-[100] flex animate-in fade-in items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-200"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-subscription-title"
          className={`flex max-h-[90dvh] min-h-0 w-full max-w-md flex-col overflow-hidden rounded-2xl border ${borderColor} ${modalBg} shadow-2xl`}
        >
          <div
            className={`flex shrink-0 items-center justify-between border-b ${borderColor} px-6 py-4`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                <AlertTriangle size={16} />
              </span>
              <h3
                id="cancel-subscription-title"
                className={`text-sm font-bold ${primaryText}`}
              >
                No Active Subscription
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                isDark
                  ? "text-gray-400 hover:bg-white/10 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <X size={18} />
            </button>
          </div>

          <div className={`${modalContentClass} space-y-2`}>
            <p className={`text-sm font-semibold ${primaryText}`}>
              You don't have an active subscription to cancel.
            </p>
            <p className={`text-xs leading-relaxed ${mutedText}`}>
              You can explore the available plans and choose one whenever you're
              ready.
            </p>
          </div>

          <div
            className={`flex shrink-0 justify-end border-t ${borderColor} ${footerBg} px-6 py-4`}
          >
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
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
      className="fixed inset-0 z-[100] flex animate-in fade-in items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-subscription-title"
        className={`flex max-h-[90dvh] min-h-0 w-full max-w-md flex-col overflow-hidden rounded-2xl border border-red-500/30 ${modalBg} shadow-2xl`}
      >
        {/* Header */}
        <div
          className={`flex shrink-0 items-center justify-between border-b ${borderColor} ${headerBg} px-6 py-4`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
              <ShieldAlert size={16} />
            </span>
            <h3
              id="cancel-subscription-title"
              className={`text-sm font-bold ${primaryText}`}
            >
              Cancel Subscription
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
              isDark
                ? "text-gray-400 hover:bg-white/10 hover:text-white"
                : "text-slate-500 hover:bg-black/5 hover:text-slate-900"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className={`${modalContentClass} space-y-4`}>
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-amber-700 dark:text-amber-200">
            <AlertTriangle
              size={16}
              className="mt-0.5 shrink-0 text-amber-500"
            />
            <div className="space-y-1">
              <p className={`font-semibold ${primaryText}`}>
                {renewalDateFormatted
                  ? `Your access is expected to continue until ${renewalDateFormatted}`
                  : "Your subscription access may change after cancellation"}
              </p>
              <p className="text-[11px] leading-relaxed text-amber-700 dark:text-amber-200/90">
                After cancellation, access to paid features will depend on your
                subscription terms. Your patient and appointment data should
                remain available according to your application's data retention
                policy.
              </p>
            </div>
          </div>

          {/* Cancellation Reason */}
          <div className="space-y-2">
            <label
              className={`text-[11px] font-bold uppercase tracking-wider ${mutedText}`}
            >
              Please let us know why you are cancelling:
            </label>

            <div className="space-y-2">
              {CANCELLATION_REASONS.map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-2.5 transition-colors ${
                    isDark
                      ? "border-white/5 bg-white/[0.02] hover:bg-white/5"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="cancel_reason"
                    value={value}
                    checked={selectedReason === value}
                    onChange={() => setSelectedReason(value)}
                    className="accent-primary"
                  />
                  <span className={`text-xs ${secondaryText}`}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Message */}
          <div className="space-y-2">
            <label
              htmlFor="cancellation-message"
              className={`text-[11px] font-bold uppercase tracking-wider ${mutedText}`}
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
              className={`w-full resize-none rounded-lg border p-3 text-xs outline-none transition-colors placeholder:text-gray-500 focus:border-primary ${
                isDark
                  ? "border-white/10 bg-white/[0.02] text-gray-300"
                  : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
              }`}
            />

            <p className={`text-right text-[10px] ${subtleText}`}>
              {message.length}/150
            </p>
          </div>

          {/* Auto-renewal Alternative */}
          {subscription.autoRenew && (
            <div
              className={`space-y-2 rounded-xl border p-3.5 ${
                isDark
                  ? "border-white/10 bg-[#09101a]"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div
                className={`flex items-center gap-2 font-semibold ${primaryText}`}
              >
                <Calendar size={14} className="text-primary" />
                <span>Prefer to turn off auto-renewal?</span>
              </div>

              <p className={`text-[11px] ${mutedText}`}>
                Keep your current subscription until its expiry date without
                automatically renewing it.
              </p>

              <button
                type="button"
                onClick={onDisableAutoRenewInstead}
                className="mt-1 w-full cursor-pointer rounded-lg border border-primary/40 bg-primary/10 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                Turn Off Auto-Renew Instead
              </button>
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        <div
          className={`flex shrink-0 items-center justify-between gap-3 border-t ${borderColor} ${footerBg} px-6 py-4`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-semibold transition-colors ${
              isDark
                ? "border-white/10 text-gray-300 hover:bg-white/5"
                : "border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
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
