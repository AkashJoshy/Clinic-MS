import React, { useEffect, useState } from "react";
import {
  X,
  CreditCard,
  Check,
  ShieldCheck,
  LoaderCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import type { SubscriptionPaymentModalProps } from "@/types/doctor-subscription";
import { SubscriptionPaymentOptions } from "./subscription-payment-options.component";
import {
  BILLING_CYCLE_LABELS,
  BILLING_SUFFIXES,
  modalContentClass,
} from "@/constants/doctor-subscription.constant";

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

export const SubscriptionPaymentMethodModal: React.FC<
  SubscriptionPaymentModalProps
> = ({
  plan,
  currentSubscription,
  walletBalance,
  isOpen,
  onClose,
  onPayWithWallet,
  onAddMoneyWithRazorpay,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(false);
    }
  }, [isOpen, plan?.id]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const cycle = plan.billingCycle;
  const price = plan.price;

  const tax = Math.round(price * 0.18 * 100) / 100;
  const total = Math.round((price + tax) * 100) / 100;

  const balance = Number.isFinite(walletBalance)
    ? Math.max(0, walletBalance)
    : 0;

  const hasSufficientBalance = balance >= total;
  const shortfall = Math.max(0, total - balance);
  const isNewSubscription = currentSubscription === null;

  const includedFeatures = (plan.features ?? []).filter(
    (feature) => feature.isIncluded,
  );

  const handleWalletPayment = () => {
    if (isProcessing || !hasSufficientBalance) return;

    setIsProcessing(true);
    onPayWithWallet(plan, cycle, total);
  };

  const handleRazorpayTopUp = () => {
    if (isProcessing) return;

    setIsProcessing(true);
    onAddMoneyWithRazorpay(plan, cycle, total);
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isProcessing) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-method-title"
        className="flex max-h-[90dvh] min-h-0 w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1520] shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#09101a] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1dc465]/15 text-[#1dc465]">
              <CreditCard size={16} />
            </span>

            <div>
              <h3
                id="payment-method-title"
                className="text-sm font-bold text-white"
              >
                Choose Payment Method
              </h3>

              <p className="mt-0.5 text-[10px] text-gray-400">
                Select how you want to pay for your subscription.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={onClose}
            aria-label="Close payment method modal"
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className={modalContentClass}>
          <div className="rounded-xl border border-[#1dc465]/30 bg-gradient-to-br from-[#0c1f20] to-[#070e17] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="rounded-full border border-[#1dc465]/30 bg-[#1dc465]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#1dc465]">
                  {isNewSubscription ? "New Subscription" : "Plan Change"}
                </span>

                <h4 className="mt-2 text-lg font-bold text-white">
                  {plan.name}
                </h4>

                {plan.tagline && (
                  <p className="mt-0.5 text-xs text-[#8b9ab0]">
                    {plan.tagline}
                  </p>
                )}

                {plan.description && (
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="shrink-0 text-right">
                <p className="text-base font-black text-white">
                  {formatPrice(price, plan.currency)}
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  {BILLING_SUFFIXES[cycle]}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
              <Calendar size={13} className="text-[#1dc465]" />
              <span className="text-[11px] font-semibold text-gray-300">
                {BILLING_CYCLE_LABELS[cycle]} billing
              </span>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-white/10 bg-[#09101a] p-4 font-mono text-[11px]">
            <div className="flex justify-between gap-3 text-gray-400">
              <span>
                {isNewSubscription ? "Subscription:" : "Current Plan:"}
              </span>

              <span className="text-right text-white">
                {isNewSubscription
                  ? "New subscription"
                  : `Current subscription`}
              </span>
            </div>

            {!isNewSubscription && (
              <div className="flex justify-between gap-3 text-gray-400">
                <span>Payment Method:</span>

                <span className="text-right text-white">
                  {currentSubscription.paymentMethod.replaceAll("_", " ")}
                </span>
              </div>
            )}

            <div className="flex justify-between gap-3 border-t border-white/10 pt-3 text-gray-300">
              <span>Plan Price:</span>
              <span>{formatPrice(price, plan.currency)}</span>
            </div>

            <div className="flex justify-between gap-3 text-gray-400">
              <span>Estimated GST (18%):</span>
              <span>{formatPrice(tax, plan.currency)}</span>
            </div>

            <div className="flex justify-between gap-3 border-t border-white/10 pt-3 text-sm font-bold text-[#1dc465]">
              <span>Estimated Total:</span>
              <span>{formatPrice(total, plan.currency)}</span>
            </div>
          </div>

          <SubscriptionPaymentOptions
            plan={plan}
            balance={balance}
            total={total}
            shortfall={shortfall}
            hasSufficientBalance={hasSufficientBalance}
            isProcessing={isProcessing}
            onPayWithWallet={handleWalletPayment}
            onAddMoneyWithRazorpay={handleRazorpayTopUp}
          />

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Included Plan Features
            </label>

            <div className="space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
              {includedFeatures.length > 0 ? (
                includedFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-start gap-2">
                    <Check
                      size={13}
                      className="mt-0.5 shrink-0 text-[#1dc465]"
                    />

                    <span className="text-gray-200">{feature.name}</span>
                  </div>
                ))
              ) : (
                <p className="py-2 text-center text-xs text-[#8b9ab0]">
                  No included features are listed for this plan.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2 text-[11px] leading-5 text-[#8b9ab0]">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#1dc465]" />

            <span>
              Your subscription will be activated only after the payment is
              verified by the server. Wallet debits and wallet top-ups should be
              processed securely on the backend.
            </span>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-amber-500/15 bg-amber-500/5 p-3 text-[11px] leading-5 text-[#8b9ab0]">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-400" />

            <span>
              The tax and total shown are estimates. The backend must validate
              the final amount before creating a payment order.
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-[#09101a] px-6 py-4">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400">Estimated total</p>

            <p className="text-sm font-black text-white">
              {formatPrice(total, plan.currency)}
            </p>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle size={13} className="animate-spin" />
                Processing
              </span>
            ) : (
              "Cancel"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPaymentMethodModal;
