import React from "react";
import { ArrowRight, Check, CreditCard, Wallet, X } from "lucide-react";
import type {
  SubscriptionFeature,
  SubscriptionUpgradeModalProps,
} from "@/types/doctor-subscription";
import type { BillingCycle } from "@/types/subscription";
import {
  BILLING_CYCLE_LABELS,
  BILLING_SUFFIXES,
} from "@/constants/doctor-subscription.constant";
import { formatINR } from "@/helpers/wallet.helper";
import { useAuthStore } from "@/store";

const SubscriptionUpgradeModal: React.FC<SubscriptionUpgradeModalProps> = ({
  plan,
  currentSubscription,
  creditAmount,
  payableAmount,
  currentPlanName,
  isOpen,
  onClose,
  onWalletPay,
  walletDetails,
  isDark,
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setIsProcessing(false);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isProcessing) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen || !plan) return null;

  const price = Math.max(0, Number(plan.price) || 0);
  const credit = Math.max(0, Number(creditAmount) || 0);
  const payable = Math.max(0, Number(payableAmount) || 0);

  const tax = 0;
  const total = payable + tax;

  const billingCycle: BillingCycle = plan.billingCycle ?? "MONTHLY";

  const billingLabel = BILLING_CYCLE_LABELS[billingCycle];
  const billingSuffix = BILLING_SUFFIXES[billingCycle];

  const features: SubscriptionFeature[] = Array.isArray(plan.features)
    ? plan.features
    : [];

  const isWalletUnavailable =
    !walletDetails || walletDetails.status !== "ACTIVE";

  const walletBalance = Math.max(0, Number(walletDetails?.balance) || 0);

  const projectedWalletBalance = walletBalance + creditAmount;

  const handleWalletPayment = () => {
    if (isProcessing || isWalletUnavailable) return;
    onWalletPay();
  };

  const modalBg = isDark ? "bg-[#0d1520]" : "bg-white";
  const headerBg = isDark ? "bg-[#0d1520]" : "bg-white";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-gray-400" : "text-slate-600";
  const textMuted = isDark ? "text-gray-500" : "text-slate-500";
  const textBody = isDark ? "text-gray-300" : "text-slate-700";
  const borderClass = isDark ? "border-white/10" : "border-slate-200";
  const subtleBg = isDark ? "bg-white/[0.03]" : "bg-slate-50";
  const hoverBg = isDark ? "hover:bg-white/10" : "hover:bg-slate-100";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isProcessing) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscription-upgrade-title"
        className={`flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border ${borderClass} ${modalBg} ${textPrimary} shadow-2xl`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header
          className={`flex shrink-0 items-center justify-between gap-4 border-b ${borderClass} ${headerBg} px-5 py-4 sm:px-6`}
        >
          <div className="min-w-0">
            <h2
              id="subscription-upgrade-title"
              className="text-base font-semibold sm:text-lg"
            >
              Upgrade subscription
            </h2>

            <p className={`mt-1 text-xs ${textSecondary}`}>
              Review your plan and choose a payment method.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Close upgrade modal"
            className={`shrink-0 rounded-lg p-2 ${textSecondary} transition ${hoverBg} hover:${textPrimary} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <X size={18} />
          </button>
        </header>

        {/* Scrollable Content */}
        <div
          className={`custom-scrollbar ${isDark ? "scrollbar-dark" : "scrollbar-light"} min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain`}
          style={{ scrollbarGutter: "stable" }}
        >
          <div className={`space-y-5 p-5 text-sm ${textBody} sm:p-6`}>
            {/* Selected Plan */}
            <div className="rounded-xl border border-primary/30 bg-primary/[0.07] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    Selected plan
                  </p>

                  <h3
                    className={`mt-2 break-words text-lg font-semibold ${textPrimary}`}
                  >
                    {plan.name ?? "Subscription plan"}
                  </h3>

                  {plan.tagline && (
                    <p className={`mt-1 text-xs ${textSecondary}`}>
                      {plan.tagline}
                    </p>
                  )}
                </div>

                <div className="shrink-0 text-right">
                  <p className={`text-lg font-bold ${textPrimary}`}>
                    {formatINR(price)}
                  </p>

                  <p className={`mt-1 text-[11px] ${textSecondary}`}>
                    {billingSuffix}
                  </p>
                </div>
              </div>

              {plan.description && (
                <p className={`mt-3 text-xs leading-5 ${textSecondary}`}>
                  {plan.description}
                </p>
              )}
            </div>

            {/* Plan Features */}
            <div>
              <h3 className={`mb-3 text-sm font-semibold ${textPrimary}`}>
                Plan features
              </h3>

              {features.length > 0 ? (
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li
                      key={feature.id ?? `${feature.name}-${index}`}
                      className="flex items-start gap-3"
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          feature.isIncluded === false
                            ? isDark
                              ? "bg-white/5 text-gray-500"
                              : "bg-slate-100 text-slate-400"
                            : "bg-primary/15 text-primary"
                        }`}
                      >
                        {feature.isIncluded === false ? (
                          <X size={12} />
                        ) : (
                          <Check size={12} />
                        )}
                      </span>

                      <span
                        className={
                          feature.isIncluded === false ? textMuted : textBody
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`text-xs ${textMuted}`}>
                  No feature details are available for this plan.
                </p>
              )}
            </div>

            {/* Current Subscription */}
            {currentSubscription && (
              <div
                className={`rounded-xl border ${borderClass} ${subtleBg} p-4`}
              >
                <p className={`text-xs font-medium ${textSecondary}`}>
                  Your current subscription
                </p>

                <p className={`mt-2 font-medium ${textPrimary}`}>
                  {currentPlanName || "Current plan"}
                </p>

                <p className={`mt-1 text-xs leading-5 ${textSecondary}`}>
                  Review the new plan details before confirming your
                  subscription change.
                </p>
              </div>
            )}

            {/* Payment Summary */}
            <div className={`rounded-xl border ${borderClass} ${subtleBg} p-4`}>
              <h3 className={`mb-3 font-semibold ${textPrimary}`}>
                Payment summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <span className={textSecondary}>New plan price</span>
                  <span className={textBody}>{formatINR(price)}</span>
                </div>

                {credit > 0 && (
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className={textSecondary}>Subscription credit</p>
                      <p className={`mt-1 text-[10px] ${textMuted}`}>
                        Unused value from your current plan
                      </p>
                    </div>

                    <span className="font-medium text-[#1dc465]">
                      − {formatINR(credit)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4">
                  <span className={textSecondary}>Payable amount</span>
                  <span className={`font-semibold ${textPrimary}`}>
                    {formatINR(payable)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className={textSecondary}>GST (0%)</span>
                  <span className={textBody}>{formatINR(tax)}</span>
                </div>

                <div className={`border-t ${borderClass} pt-3`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className={`font-semibold ${textPrimary}`}>
                      Total to pay
                    </span>

                    <span className="text-base font-bold text-[#1dc465]">
                      {formatINR(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Balance After Subscription Change */}
            {credit > 0 && walletDetails && (
              <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Wallet size={17} className="text-primary" />

                  <h3 className={`font-semibold ${textPrimary}`}>
                    Wallet balance after upgrade
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <span className={textSecondary}>
                      Current wallet balance
                    </span>

                    <span className={`font-medium ${textBody}`}>
                      {formatINR(walletBalance)}
                    </span>
                  </div>

                  {creditAmount > 0 && (
                    <div className="flex items-center justify-between gap-4">
                      <span className={textSecondary}>Refund to wallet</span>

                      <span className="font-semibold text-[#1dc465]">
                        + {formatINR(creditAmount)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 border-t border-primary/20 pt-3">
                    <span className={`font-semibold ${textPrimary}`}>
                      Expected wallet balance
                    </span>

                    <span className="text-base font-bold text-[#1dc465]">
                      {formatINR(projectedWalletBalance)}
                    </span>
                  </div>
                </div>

                <p className={`mt-3 text-[10px] leading-4 ${textMuted}`}>
                  This is an estimate. Your final wallet balance depends on the
                  subscription change and the transactions confirmed by the
                  server.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <p className={`text-[11px] leading-5 ${textMuted}`}>
              The displayed amount is an estimate based on your subscription
              billing calculation. The server will validate the final payable
              amount before payment.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <footer
          className={`flex shrink-0 flex-col gap-2 border-t ${borderClass} ${headerBg} p-4 sm:p-5 md:gap-3`}
        >
          <div className="flex flex-col gap-2 md:flex-row md:gap-3">
            <button
              type="button"
              onClick={handleWalletPayment}
              disabled={isProcessing || isWalletUnavailable}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/15 disabled:cursor-not-allowed disabled:opacity-50 md:flex-1"
            >
              <Wallet size={16} className="shrink-0" />

              <span>
                {isWalletUnavailable ? "Wallet Unavailable" : "Wallet Pay"}
              </span>

              <ArrowRight size={14} className="ml-auto shrink-0" />
            </button>

            <button
              type="button"
              disabled={isProcessing}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 md:flex-1"
            >
              <CreditCard size={16} className="shrink-0" />

              <span>{isProcessing ? "Processing..." : "Pay online"}</span>

              <ArrowRight size={14} className="ml-auto shrink-0" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className={`w-full rounded-lg px-4 py-2 text-xs font-medium ${textSecondary} transition ${
              isDark
                ? "hover:bg-white/5 hover:text-white"
                : "hover:bg-slate-100 hover:text-slate-900"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            Cancel
          </button>
        </footer>
      </section>
    </div>
  );
};

export default SubscriptionUpgradeModal;
