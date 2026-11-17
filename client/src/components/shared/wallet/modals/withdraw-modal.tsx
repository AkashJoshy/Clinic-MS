
import React, { useState } from "react";
import {
  X,
  Building2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { formatCurrency } from "@/helpers/wallet.helper";
import toast from "react-hot-toast";
import type { WalletTransaction } from "../types";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onSuccessWithdraw: (newTxn: WalletTransaction, amount: number) => void;
  isDark?: boolean;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  availableBalance,
  onSuccessWithdraw,
  isDark = false,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);

    if (isNaN(num) || num <= 0) {
      setError("Please enter a valid withdrawal amount");
      return;
    }
    if (num < 500) {
      setError("Minimum withdrawal amount is ₹500");
      return;
    }
    if (num > availableBalance) {
      setError("Withdrawal amount cannot exceed available balance");
      return;
    }

    setError(null);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const txnId = `txn_wth_${Date.now()}`;
      const displayId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;

      const newTxn: WalletTransaction = {
        id: txnId,
        displayId,
        title: "Bank Withdrawal",
        description: "Payout to HDFC Bank (•••• 9842)",
        category: "Payout",
        type: "debit",
        amount: num,
        status: "completed",
        date: "Today",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        paymentMethod: "NEFT / IMPS",
        referenceId: `WTH-${Math.floor(1000000 + Math.random() * 9000000)}`,
        previousBalance: availableBalance,
        resultingBalance: availableBalance - num,
      };

      onSuccessWithdraw(newTxn, num);
      toast.success(
        `Withdrawal of ${formatCurrency(num)} initiated to HDFC Bank (•••• 9842)`,
      );
      setAmount("");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-2xl p-6 shadow-2xl border space-y-5 ${
          isDark
            ? "bg-[#0D1A27] border-white/10"
            : "bg-white border-slate-200"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className={`absolute right-4 top-4 p-2 rounded-xl transition-colors ${
            isDark
              ? "text-slate-400 hover:text-white hover:bg-white/10"
              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h3
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-[#0D1A27]"
            }`}
          >
            Request Bank Withdrawal
          </h3>
          <p
            className={`text-xs mt-0.5 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Transfer funds from your Healthixia wallet directly to your verified
            bank account.
          </p>
        </div>

        {/* Linked Account Preview */}
        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span
                className={`font-bold block ${
                  isDark ? "text-slate-200" : "text-slate-800"
                }`}
              >
                HDFC Bank Ltd • Savings
              </span>
              <span
                className={`text-[11px] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                A/C: •••• 9842 • IFSC: HDFC0001245
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> Verified
          </span>
        </div>

        <form onSubmit={handleWithdraw} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label
                className={`font-semibold ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Withdrawal Amount (₹)
              </label>
              <button
                type="button"
                onClick={() => setAmount(availableBalance.toString())}
                className="font-semibold text-primary hover:text-primary/80 hover:underline"
              >
                Withdraw Max ({formatCurrency(availableBalance)})
              </button>
            </div>

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
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                placeholder="Minimum ₹500"
                className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-lg font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                    : "bg-white border-slate-300 text-[#0D1A27] placeholder:text-slate-400"
                }`}
              />
            </div>
            {error && (
              <p className="flex items-center gap-1 text-xs text-rose-500">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          <div
            className={`p-3 rounded-xl border text-[11px] space-y-1 ${
              isDark
                ? "bg-white/5 border-white/10 text-slate-400"
                : "bg-slate-50 border-slate-200 text-slate-600"
            }`}
          >
            <div
              className={`flex items-center gap-1.5 font-semibold ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct Bank Settlement</span>
            </div>
            <p>
              Withdrawals are settled automatically via IMPS/NEFT batches
              within 2-4 banking hours. No processing charges apply.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
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
              disabled={isProcessing}
              className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Initiating...
                </>
              ) : (
                <span>Confirm Withdrawal</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
