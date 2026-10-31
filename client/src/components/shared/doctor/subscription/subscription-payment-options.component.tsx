
import React from "react";
import {
  Wallet,
  CreditCard,
  ArrowRight,
  AlertCircle,
  Plus,
} from "lucide-react";
import type { SubscriptionPaymentOptionsProps } from "@/types/doctor-subscription";

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

export const SubscriptionPaymentOptions: React.FC<
  SubscriptionPaymentOptionsProps
> = ({
  plan,
  balance,
  total,
  shortfall,
  hasSufficientBalance,
  isProcessing,
  onPayWithWallet,
  onAddMoneyWithRazorpay,
}) => {
  return (
    <>
      {/* Wallet Option */}
      <button
        type="button"
        disabled={isProcessing || !hasSufficientBalance}
        onClick={onPayWithWallet}
        className={`w-full rounded-xl border p-4 text-left transition-all ${
          hasSufficientBalance
            ? "border-[#1dc465]/30 bg-[#1dc465]/5 hover:border-[#1dc465]/60 hover:bg-[#1dc465]/10"
            : "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-80"
        } disabled:cursor-not-allowed`}
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1dc465]/20 bg-[#1dc465]/10 text-[#1dc465]">
            <Wallet size={20} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-white">
                Pay with Wallet
              </span>

              {hasSufficientBalance && (
                <span className="rounded-full bg-[#1dc465]/15 px-2 py-0.5 text-[9px] font-bold text-[#1dc465]">
                  RECOMMENDED
                </span>
              )}
            </div>

            <p className="mt-1 text-[11px] leading-5 text-gray-400">
              Use your available Doctor Wallet balance to pay for this
              subscription.
            </p>

            <div className="mt-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] text-gray-500">
                  Available Balance
                </p>

                <p className="mt-0.5 text-sm font-bold text-white">
                  {formatPrice(balance, plan.currency)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-gray-500">
                  {hasSufficientBalance
                    ? "Balance after payment"
                    : "Additional funds needed"}
                </p>

                <p
                  className={`mt-0.5 text-xs font-bold ${
                    hasSufficientBalance
                      ? "text-[#1dc465]"
                      : "text-amber-400"
                  }`}
                >
                  {hasSufficientBalance
                    ? formatPrice(balance - total, plan.currency)
                    : formatPrice(shortfall, plan.currency)}
                </p>
              </div>
            </div>

            {!hasSufficientBalance && (
              <p className="mt-2 flex items-center gap-1.5 text-[10px] text-amber-400">
                <AlertCircle size={12} />
                Insufficient balance. Add money to continue.
              </p>
            )}
          </div>

          <ArrowRight
            size={16}
            className="mt-1 shrink-0 text-gray-500"
          />
        </div>
      </button>

      {/* Razorpay / Wallet Top-up Option */}
      <button
        type="button"
        disabled={isProcessing}
        onClick={onAddMoneyWithRazorpay}
        className="w-full rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition-all hover:border-blue-400/40 hover:bg-blue-400/5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-400">
            <CreditCard size={20} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-white">
                Add Money with Razorpay
              </span>

              <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 text-[9px] font-bold text-blue-400">
                ONLINE PAYMENT
              </span>
            </div>

            <p className="mt-1 text-[11px] leading-5 text-gray-400">
              Securely add funds to your wallet using UPI, cards, or
              other payment methods supported by Razorpay.
            </p>

            <div className="mt-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] text-gray-500">
                  Estimated subscription amount
                </p>

                <p className="mt-0.5 text-sm font-bold text-white">
                  {formatPrice(total, plan.currency)}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-400/10 px-3 py-2 text-[11px] font-semibold text-blue-300">
                <Plus size={13} />
                Add Funds
              </span>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
