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
        className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1520] text-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id="subscription-upgrade-title"
              className="text-base font-semibold sm:text-lg"
            >
              Upgrade subscription
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Review your plan and choose a payment method.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Close upgrade modal"
            className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </header>

        <div
          className="custom-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="space-y-5 p-5 text-sm text-gray-300 sm:p-6">
            {/* Selected plan */}
            <div className="rounded-xl border border-[#1dc465]/30 bg-[#1dc465]/[0.07] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#1dc465]">
                    Selected plan
                  </p>

                  <h3 className="mt-2 break-words text-lg font-semibold text-white">
                    {plan.name ?? "Subscription plan"}
                  </h3>

                  {plan.tagline && (
                    <p className="mt-1 text-xs text-gray-400">{plan.tagline}</p>
                  )}
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold text-white">
                    {formatINR(price)}
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    {billingSuffix}
                  </p>
                </div>
              </div>

              {plan.description && (
                <p className="mt-3 text-xs leading-5 text-gray-400">
                  {plan.description}
                </p>
              )}
            </div>

            {/* Plan features */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">
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
                            ? "bg-white/5 text-gray-500"
                            : "bg-[#1dc465]/15 text-[#1dc465]"
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
                          feature.isIncluded === false
                            ? "text-gray-500"
                            : "text-gray-300"
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500">
                  No feature details are available for this plan.
                </p>
              )}
            </div>

            {/* Current subscription */}
            {currentSubscription && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-medium text-gray-400">
                  Your current subscription
                </p>

                <p className="mt-2 font-medium text-white">
                  {currentPlanName || "Current plan"}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Review the new plan details before confirming your
                  subscription change.
                </p>
              </div>
            )}

            {/* Payment summary */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="mb-3 font-semibold text-white">Payment summary</h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-400">New plan price</span>

                  <span className="text-gray-200">{formatINR(price)}</span>
                </div>

                {/* Subscription credit */}
                {credit > 0 && (
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-gray-400">Subscription credit</p>

                      <p className="mt-1 text-[10px] text-gray-500">
                        Unused value from your current plan
                      </p>
                    </div>

                    <span className="font-medium text-[#1dc465]">
                      − {formatINR(credit)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-400">Payable amount</span>

                  <span className="font-semibold text-white">
                    {formatINR(payable)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-400">GST (0%)</span>

                  <span className="text-gray-200">{formatINR(tax)}</span>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-white">
                      Total to pay
                    </span>

                    <span className="text-base font-bold text-[#1dc465]">
                      {formatINR(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet balance after subscription change */}
            {credit > 0 && walletDetails && (
              <div className="rounded-xl border border-[#1dc465]/20 bg-[#1dc465]/[0.05] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Wallet size={17} className="text-[#1dc465]" />

                  <h3 className="font-semibold text-white">
                    Wallet balance after upgrade
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">
                      Current wallet balance
                    </span>

                    <span className="font-medium text-gray-200">
                      {formatINR(walletBalance)}
                    </span>
                  </div>

                  {creditAmount > 0 && (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-gray-400">Refund to wallet</span>

                      <span className="font-semibold text-[#1dc465]">
                        + {formatINR(creditAmount)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 border-t border-[#1dc465]/20 pt-3">
                    <span className="font-semibold text-white">
                      Expected wallet balance
                    </span>

                    <span className="text-base font-bold text-[#1dc465]">
                      {formatINR(projectedWalletBalance)}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-[10px] leading-4 text-gray-500">
                  This is an estimate. Your final wallet balance depends on the
                  subscription change and the transactions confirmed by the
                  server.
                </p>
              </div>
            )}

            <p className="text-[11px] leading-5 text-gray-500">
              The displayed amount is an estimate based on your subscription
              billing calculation. The server will validate the final payable
              amount before payment.
            </p>
          </div>
        </div>

        <footer className="flex shrink-0 flex-col gap-2 border-t border-white/10 bg-[#0d1520] p-4 sm:p-5 md:gap-3 md:p-5">
          <div className="flex flex-col gap-2 md:flex-row md:gap-3">
            <button
              type="button"
              onClick={handleWalletPayment}
              disabled={isProcessing || isWalletUnavailable}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#1dc465]/40 bg-[#1dc465]/10 px-3 py-2.5 text-sm font-semibold text-[#1dc465] transition hover:bg-[#1dc465]/15 disabled:cursor-not-allowed disabled:opacity-50 md:flex-1"
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1dc465] px-3 py-2.5 text-sm font-semibold text-[#07130b] transition hover:bg-[#18b558] disabled:cursor-not-allowed disabled:opacity-60 md:flex-1"
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
            className="w-full rounded-lg px-4 py-2 text-xs font-medium text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 md:mx-auto md:w-full"
          >
            Cancel
          </button>
        </footer>
      </section>
    </div>
  );
};

export default SubscriptionUpgradeModal;
