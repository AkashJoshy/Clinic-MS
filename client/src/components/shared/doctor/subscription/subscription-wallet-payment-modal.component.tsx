import React from "react";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import type {
  AvailablePlanOption,
  DoctorSubscription,
  SubscriptionWalletPaymentModalProps,
  WalletBalance,
} from "@/types/doctor-subscription";
import WalletBalanceCard from "./wallet-balance-card.component";
import { useDoctorSubscription } from "@/hooks/use-doctor-subscription.hook";
import { formatINR } from "@/helpers/wallet.helper";

const amountOf = (value: unknown) => Math.max(0, Number(value) || 0);

const SubscriptionWalletPaymentModal: React.FC<
  SubscriptionWalletPaymentModalProps
> = ({
  plan,
  isOpen,
  onClose,
  onConfirmPayment,
  walletDetails,
  currentSubscription,
  creditAmount,
  payableAmount,
  isDark,
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const { currentPlanName } = useDoctorSubscription("doctor");

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

  const selectedPrice = amountOf(plan.price);
  const credit = amountOf(creditAmount);
  const amountToPay = amountOf(payableAmount);

  const currentPrice = currentSubscription
    ? amountOf(currentSubscription.price)
    : 0;

  const hasExistingSubscription = Boolean(currentSubscription);

  const walletBalance = amountOf(walletDetails?.balance);

  const walletUnavailable = !walletDetails || walletDetails.status !== "ACTIVE";

  const enoughBalance = walletBalance >= amountToPay;

  const projectedBalance = walletBalance + credit;

  const isDowngrade = credit > 0 && amountToPay === 0;
  const isUpgrade = amountToPay > 0;
  const isSamePrice =
    hasExistingSubscription && credit === 0 && amountToPay === 0;

  const title = !hasExistingSubscription
    ? "New subscription"
    : isUpgrade
      ? "Upgrade subscription"
      : isDowngrade
        ? "Downgrade subscription"
        : "Change subscription";

  const confirmLabel = isProcessing
    ? "Processing..."
    : walletUnavailable
      ? "Wallet Unavailable"
      : !enoughBalance
        ? "Insufficient Balance"
        : isDowngrade
          ? "Confirm Downgrade"
          : isSamePrice
            ? "Confirm Plan Change"
            : amountToPay === 0
              ? "Confirm Plan"
              : `Pay ${formatINR(amountToPay)}`;

  const handleConfirm = async () => {
    if (isProcessing) return;

    if (walletUnavailable) {
      toast.error("Your wallet is unavailable or inactive.");
      return;
    }

    if (!enoughBalance) {
      toast.error(`You need ${formatINR(amountToPay - walletBalance)} more.`);
      return;
    }

    setIsProcessing(true);

    try {
      await onConfirmPayment(plan, payableAmount);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Subscription plan change failed. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Theme classes
  const modalBg = isDark ? "bg-[#0d1520]" : "bg-white";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-gray-400" : "text-slate-600";
  const textMuted = isDark ? "text-gray-500" : "text-slate-500";
  const textBody = isDark ? "text-gray-300" : "text-slate-700";
  const borderClass = isDark ? "border-white/10" : "border-slate-200";
  const subtleBg = isDark ? "bg-white/[0.025]" : "bg-slate-50";
  const iconBg = isDark ? "bg-white/[0.04]" : "bg-slate-100";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isProcessing) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-payment-title"
        className={`flex max-h-[calc(100dvh-1.5rem)] min-h-0 w-full max-w-lg flex-col overflow-hidden rounded-2xl border ${borderClass} ${modalBg} ${textPrimary} shadow-2xl sm:max-h-[85dvh]`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <header
          className={`flex shrink-0 items-center gap-3 border-b ${borderClass} px-4 py-4 sm:px-5`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Wallet size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 id="wallet-payment-title" className="text-base font-semibold">
              Review plan change
            </h2>

            <p className={`mt-1 text-xs ${textSecondary}`}>{title} · Wallet</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Close modal"
            className={`rounded-lg p-2 transition disabled:opacity-50 ${
              isDark
                ? "text-gray-400 hover:bg-white/10 hover:text-white"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <X size={18} />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="custom-scrollbar scrollbar-dark min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
          <div className="space-y-5 p-4 sm:p-5">
            <WalletBalanceCard
              balance={walletBalance}
              unavailable={walletUnavailable}
              isDark={isDark}
            />

            {/* Selected Plan */}
            <div
              className={`rounded-2xl border ${borderClass} ${subtleBg} p-4`}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${textMuted}`}
                >
                  Selected plan
                </p>

                {plan.billingCycle && (
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                    {plan.billingCycle.toLowerCase()}
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3
                    className={`break-words text-lg font-semibold ${textPrimary}`}
                  >
                    {plan.name ?? "Subscription plan"}
                  </h3>

                  {plan.tagline && (
                    <p className={`mt-1 text-xs leading-5 ${textSecondary}`}>
                      {plan.tagline}
                    </p>
                  )}
                </div>

                <p className={`shrink-0 text-lg font-bold ${textPrimary}`}>
                  {formatINR(selectedPrice)}
                </p>
              </div>

              {hasExistingSubscription && (
                <>
                  <div
                    className={`my-4 border-t border-dashed ${borderClass}`}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className={`text-[11px] ${textMuted}`}>Current plan</p>

                      <p
                        className={`mt-1 truncate text-sm font-medium ${textBody}`}
                      >
                        {currentPlanName || "Current plan"}
                      </p>
                    </div>

                    <p className={`shrink-0 text-sm font-semibold ${textBody}`}>
                      {formatINR(currentPrice)}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Payment Status */}
            <div
              className={`flex items-start gap-3 rounded-xl border p-4 ${
                walletUnavailable
                  ? "border-amber-500/20 bg-amber-500/[0.05]"
                  : !enoughBalance
                    ? "border-red-500/20 bg-red-500/[0.05]"
                    : isDowngrade
                      ? "border-sky-500/20 bg-sky-500/[0.05]"
                      : "border-primary/20 bg-primary/[0.05]"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
              >
                {walletUnavailable || !enoughBalance ? (
                  <AlertCircle size={19} className="text-red-400" />
                ) : isDowngrade ? (
                  <ArrowDownLeft size={19} className="text-sky-400" />
                ) : isUpgrade ? (
                  <ArrowUpRight size={19} className="text-primary" />
                ) : (
                  <CheckCircle2 size={19} className="text-primary" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${textPrimary}`}>
                  {walletUnavailable
                    ? "Wallet unavailable"
                    : !enoughBalance
                      ? "Insufficient wallet balance"
                      : isDowngrade
                        ? "Subscription credit available"
                        : isUpgrade
                          ? "Payment required"
                          : "Ready for plan change"}
                </p>

                <p className={`mt-1 text-xs leading-5 ${textSecondary}`}>
                  {walletUnavailable
                    ? "Your wallet is inactive or unavailable."
                    : !enoughBalance
                      ? `Add ${formatINR(
                          amountToPay - walletBalance,
                        )} more to complete this plan change.`
                      : isDowngrade
                        ? `${formatINR(credit)} in subscription credit is available for this plan change.`
                        : isUpgrade
                          ? `The payable amount is ${formatINR(amountToPay)} after applying the subscription calculation.`
                          : "No additional payment is required."}
                </p>
              </div>
            </div>

            {/* Wallet Balance Overview */}
            <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Wallet size={17} className="text-primary" />

                <h3 className={`font-semibold ${textPrimary}`}>
                  Wallet balance overview
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <span className={textSecondary}>Current wallet balance</span>

                  <span className={`font-medium ${textBody}`}>
                    {formatINR(walletBalance)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className={textSecondary}>Subscription credit</span>

                  <span className="font-semibold text-[#1dc465]">
                    + {formatINR(credit)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className={textSecondary}>Amount payable</span>

                  <span className={`font-medium ${textBody}`}>
                    − {formatINR(amountToPay)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-primary/20 pt-3">
                  <span className={`font-semibold ${textPrimary}`}>
                    Projected wallet balance
                  </span>

                  <span className="text-base font-bold text-[#1dc465]">
                    {formatINR(projectedBalance)}
                  </span>
                </div>
              </div>

              <p className={`mt-3 text-[10px] leading-4 ${textMuted}`}>
                This is an estimate, not your available balance after payment.
                The subscription credit and payable amount are shown separately;
                the server determines the final wallet balance after processing
                the plan change.
              </p>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-2 px-1">
              <ShieldCheck
                size={15}
                className={`mt-0.5 shrink-0 ${textMuted}`}
              />

              <p className={`text-[11px] leading-5 ${textMuted}`}>
                Your actual wallet balance remains unchanged until the
                transaction succeeds. The server validates the final
                subscription adjustment.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <footer
          className={`flex shrink-0 flex-col gap-2 border-t ${borderClass} ${modalBg} p-4 sm:p-5`}
        >
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing || walletUnavailable || !enoughBalance}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isProcessing ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : isDowngrade ? (
              <ArrowDownLeft size={17} />
            ) : amountToPay === 0 ? (
              <Sparkles size={16} />
            ) : (
              <Wallet size={16} />
            )}

            <span>{confirmLabel}</span>

            {!isProcessing && !walletUnavailable && enoughBalance && (
              <ArrowRight size={16} />
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className={`w-full rounded-xl border ${borderClass} px-4 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
              isDark
                ? "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Cancel
          </button>
        </footer>
      </section>
    </div>
  );
};

export default SubscriptionWalletPaymentModal;
