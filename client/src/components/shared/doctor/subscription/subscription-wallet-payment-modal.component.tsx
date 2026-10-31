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
  WalletBalance,
} from "@/types/doctor-subscription";

import WalletBalanceCard from "./wallet-balance-card.component";
import { useDoctorSubscription } from "@/hooks/use-doctor-subscription.hook";

interface SubscriptionWalletPaymentModalProps {
  plan: AvailablePlanOption | null;
  currentSubscription: DoctorSubscription | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (plan: AvailablePlanOption, payableAmount: number) => Promise<void> | void;
  walletDetails: WalletBalance | null;
  creditAmount: number;
  payableAmount: number;
}

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

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
        className="flex max-h-[calc(100dvh-1.5rem)] min-h-0 w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1520] text-white shadow-2xl sm:max-h-[85dvh]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1dc465]/10 text-[#1dc465]">
            <Wallet size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 id="wallet-payment-title" className="text-base font-semibold">
              Review plan change
            </h2>

            <p className="mt-1 text-xs text-gray-400">{title} · Wallet</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </header>

        <div className="custom-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
          <div className="space-y-5 p-4 sm:p-5">
            <WalletBalanceCard
              balance={walletBalance}
              unavailable={walletUnavailable}
            />

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                  Selected plan
                </p>

                {plan.billingCycle && (
                  <span className="rounded-full border border-[#1dc465]/20 bg-[#1dc465]/10 px-2.5 py-1 text-[10px] font-medium text-[#1dc465]">
                    {plan.billingCycle.toLowerCase()}
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="break-words text-lg font-semibold">
                    {plan.name ?? "Subscription plan"}
                  </h3>

                  {plan.tagline && (
                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      {plan.tagline}
                    </p>
                  )}
                </div>

                <p className="shrink-0 text-lg font-bold">
                  {formatINR(selectedPrice)}
                </p>
              </div>

              {hasExistingSubscription && (
                <>
                  <div className="my-4 border-t border-dashed border-white/10" />

                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-500">Current plan</p>

                      <p className="mt-1 truncate text-sm font-medium text-gray-300">
                        {currentPlanName || "Current plan"}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-gray-300">
                      {formatINR(currentPrice)}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div
              className={`flex items-start gap-3 rounded-xl border p-4 ${
                walletUnavailable
                  ? "border-amber-500/20 bg-amber-500/[0.05]"
                  : !enoughBalance
                    ? "border-red-500/20 bg-red-500/[0.05]"
                    : isDowngrade
                      ? "border-sky-500/20 bg-sky-500/[0.05]"
                      : "border-[#1dc465]/20 bg-[#1dc465]/[0.05]"
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
                {walletUnavailable || !enoughBalance ? (
                  <AlertCircle size={19} className="text-red-400" />
                ) : isDowngrade ? (
                  <ArrowDownLeft size={19} className="text-sky-400" />
                ) : isUpgrade ? (
                  <ArrowUpRight size={19} className="text-[#1dc465]" />
                ) : (
                  <CheckCircle2 size={19} className="text-[#1dc465]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
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

                <p className="mt-1 text-xs leading-5 text-gray-400">
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

            <div className="rounded-xl border border-[#1dc465]/20 bg-[#1dc465]/[0.05] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Wallet size={17} className="text-[#1dc465]" />

                <h3 className="font-semibold text-white">
                  Wallet balance overview
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-400">Current wallet balance</span>

                  <span className="font-medium text-gray-200">
                    {formatINR(walletBalance)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-400">Subscription credit</span>

                  <span className="font-semibold text-[#1dc465]">
                    + {formatINR(credit)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-400">Amount payable</span>

                  <span className="font-medium text-gray-200">
                    − {formatINR(amountToPay)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-[#1dc465]/20 pt-3">
                  <span className="font-semibold text-white">
                    Projected wallet balance
                  </span>

                  <span className="text-base font-bold text-[#1dc465]">
                    {formatINR(projectedBalance)}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[10px] leading-4 text-gray-500">
                This is an estimate, not your available balance after payment.
                The subscription credit and payable amount are shown separately;
                the server determines the final wallet balance after processing
                the plan change.
              </p>
            </div>

            <div className="flex items-start gap-2 px-1">
              <ShieldCheck
                size={15}
                className="mt-0.5 shrink-0 text-gray-500"
              />

              <p className="text-[11px] leading-5 text-gray-500">
                Your actual wallet balance remains unchanged until the
                transaction succeeds. The server validates the final
                subscription adjustment.
              </p>
            </div>
          </div>
        </div>

        <footer className="flex shrink-0 flex-col gap-2 border-t border-white/10 bg-[#0d1520] p-4 sm:p-5">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing || walletUnavailable || !enoughBalance}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1dc465] px-4 py-3.5 text-sm font-semibold text-[#07130b] transition hover:bg-[#18b558] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
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
            className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </footer>
      </section>
    </div>
  );
};

export default SubscriptionWalletPaymentModal;
