import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  X,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { formatCurrency } from "@/helpers/wallet.helper";
import type { AddMoneyFormData } from "@/schemas/shared/shared.schema";
import { addMoneySchema } from "@/schemas/shared/add-money.schema";
import type { AddMoneyModalProps } from "@/types/wallet";
import { useMutate } from "@/hooks/use-mutate.hook";
import {
  createWalletTopUpOrder,
  openRazorpayCheckout,
  verifyPaymentMutation,
} from "@/services/shared.service";
import toast from "react-hot-toast";

interface Props extends AddMoneyModalProps {
  isDark?: boolean;
}

export const AddMoneyModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onBalanceUpdate,
  availableBalance,
  roleOverride,
  isDark = false,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddMoneyFormData>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      amount: 1000,
    },
  });

  const { mutate: verifymutate, isPending: verifyIsPending } = useMutate(
    verifyPaymentMutation,
    {
      onSuccess: (data) => {
        const response = data.data;
        if (response) {
          console.log(`data.data`);
          console.log(data);

          console.log(`response transaction: `);

          onBalanceUpdate(response.balance, response.transaction);
          toast.success(data.data.message);
          onClose();
        }
      },
    },
  );

  const { mutate, isPending } = useMutate(createWalletTopUpOrder, {
    onSuccess(data) {
      console.log(data);
      if (data.data) {
        const order = data.data;
        const { status, ...rest } = order;

        openRazorpayCheckout({
          order: rest,
          description: `${roleOverride[0].toUpperCase + roleOverride.slice(1)} Wallet Top-up`,
          onSuccess: (response) => {
            console.log("Payment successful:", response);
            if (response) {
              verifymutate({
                status: "SUCCESS",
                orderDetails: response,
                authRole: roleOverride,
              });
            }
          },
          onFailure: (error) => {
            console.error("Payment failed:", error);
            toast.error("Payment is Failed");
          },

          onDismiss: () => {
            onClose();
          },
        });
      }
    },
  });

  const selectedAmount = watch("amount") || 0;

  if (!isOpen) return null;

  const quickAmounts = [500, 1000, 2000, 5000];

  const onSubmit = (data: { amount: number }) => {
    mutate({
      amount: data.amount,
      authRole: roleOverride,
    });
  };

  const handleModalClose = () => {
    if (isPending) return;
    setIsSuccess(false);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-2xl p-6 shadow-2xl border ${
          isDark ? "bg-[#0D1A27] border-white/10" : "bg-white border-slate-200"
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleModalClose}
          disabled={isPending}
          className={`absolute right-4 top-4 p-2 rounded-xl transition-colors ${
            isDark
              ? "text-slate-400 hover:text-white hover:bg-white/10"
              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-[#0D1A27]"
              }`}
            >
              Deposit Successful!
            </h3>
            <p
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              ₹{selectedAmount.toLocaleString("en-IN")} has been credited to
              your wallet.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-[#0D1A27]"
                }`}
              >
                Add Money to Wallet
              </h3>
              <p
                className={`text-xs mt-0.5 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Current Available Balance:{" "}
                <span
                  className={`font-semibold ${
                    isDark ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {formatCurrency(availableBalance)}
                </span>
              </p>
            </div>

            {/* Amount input */}
            <div className="space-y-1.5">
              <label
                className={`block text-xs font-semibold ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Enter Amount (₹)
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  ₹
                </span>
                <input
                  type="number"
                  {...register("amount", { valueAsNumber: true })}
                  placeholder="e.g. 2000"
                  className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-lg font-bold focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary/20 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      : "bg-white border-slate-300 text-[#0D1A27] placeholder:text-slate-400"
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Quick Amount Chips */}
            <div className="flex items-center gap-2">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() =>
                    setValue("amount", amt, { shouldValidate: true })
                  }
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedAmount === amt
                      ? "bg-primary/15 border-primary text-primary"
                      : isDark
                        ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  +₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            {/* Payment Summary */}
            <div
              className={`p-3.5 rounded-xl border space-y-1.5 text-xs ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div
                className={`flex justify-between ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <span>Deposit Amount:</span>
                <span
                  className={`font-semibold ${
                    isDark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {formatCurrency(Number(selectedAmount) || 0)}
                </span>
              </div>
              <div
                className={`flex justify-between ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <span>Convenience & Gateway Fee:</span>
                <span className="font-semibold text-emerald-500">
                  FREE (₹0.00)
                </span>
              </div>
              <div
                className={`border-t pt-1.5 flex justify-between font-bold text-sm ${
                  isDark
                    ? "border-white/10 text-white"
                    : "border-slate-200 text-slate-900"
                }`}
              >
                <span>Total Payable:</span>
                <span className="text-primary">
                  {formatCurrency(Number(selectedAmount) || 0)}
                </span>
              </div>
            </div>

            {/* Secure Badge & Actions */}
            <div
              className={`flex items-center gap-1.5 text-[11px] ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                256-bit encrypted • Razorpay verified gateway integration
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleModalClose}
                disabled={isPending}
                className={`flex-1 py-2.5 rounded-xl border font-semibold text-xs transition-colors ${
                  isDark
                    ? "border-white/10 text-slate-300 hover:bg-white/5"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 cursor-pointer py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <span>Continue to Payment</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
