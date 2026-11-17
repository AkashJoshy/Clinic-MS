import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  FileDown,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { formatCurrency, copyToClipboard } from "@/helpers/wallet.helper";
import toast from "react-hot-toast";
import type { WalletTransaction } from "../types";

interface TransactionDetailsModalProps {
  transaction: WalletTransaction | null;
  onClose: () => void;
  onDownloadReceipt: (txn: WalletTransaction) => void;
  isDark?: boolean;
}

export const TransactionDetailsModal: React.FC<
  TransactionDetailsModalProps
> = ({ transaction, onClose, onDownloadReceipt, isDark = false }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!transaction) return null;

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text, () => {
      setCopiedField(label);
      toast.success(`Copied ${label}`);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-2xl p-6 shadow-2xl border space-y-5 ${
          isDark ? "bg-[#0D1A27] border-white/10" : "bg-white border-slate-200"
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-4 top-4 p-2 rounded-xl transition-colors ${
            isDark
              ? "text-slate-400 hover:text-white hover:bg-white/10"
              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Icon & Amount */}
        <div className="text-center space-y-2 pt-2">
          <div
            className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center ${
              transaction.type === "credit"
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
            }`}
          >
            {transaction.type === "credit" ? (
              <ArrowDownLeft className="w-7 h-7" />
            ) : (
              <ArrowUpRight className="w-7 h-7" />
            )}
          </div>

          <div className="text-2xl font-extrabold">
            <span
              className={
                transaction.type === "credit"
                  ? "text-emerald-500"
                  : "text-rose-500"
              }
            >
              {transaction.type === "credit" ? "+" : "−"}
              {formatCurrency(transaction.amount)}
            </span>
          </div>

          <h3
            className={`text-sm font-bold ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            {transaction.title}
          </h3>
          <p
            className={`text-xs ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {transaction.description}
          </p>
        </div>

        {/* Audit Details Card */}
        <div
          className={`p-4 rounded-xl border space-y-2.5 text-xs ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Transaction Status:
            </span>
            <div>
              {transaction.status === "completed" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              )}
              {transaction.status === "pending" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500">
                  <Clock className="w-3.5 h-3.5" /> Pending
                </span>
              )}
              {transaction.status === "failed" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500">
                  <XCircle className="w-3.5 h-3.5" /> Failed
                </span>
              )}
            </div>
          </div>

          {/* Transaction ID */}
          <div className="flex items-center justify-between gap-2">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Transaction ID:
            </span>
            <div
              className={`flex items-center gap-1 font-mono font-semibold min-w-0 ${
                isDark ? "text-slate-200" : "text-slate-800"
              }`}
            >
              <span className="truncate">{transaction.id}</span>
              <button
                type="button"
                onClick={() => handleCopy(transaction.id, "Txn ID")}
                className={`p-1 shrink-0 ${
                  isDark
                    ? "text-slate-400 hover:text-primary"
                    : "text-slate-400 hover:text-primary"
                }`}
              >
                {copiedField === "Txn ID" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Reference ID */}
          <div className="flex items-center justify-between gap-2">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Gateway Reference:
            </span>
            <div
              className={`flex items-center gap-1 font-mono min-w-0 ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <span className="truncate">{transaction.referenceId}</span>
              <button
                type="button"
                onClick={() => handleCopy(transaction.referenceId, "Reference")}
                className="p-1 shrink-0 text-slate-400 hover:text-primary"
              >
                {copiedField === "Reference" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-between gap-2">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Date & Time:
            </span>
            <span
              className={`font-medium text-right ${
                isDark ? "text-slate-200" : "text-slate-800"
              }`}
            >
              {transaction.date} at {transaction.time}
            </span>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between gap-2">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Payment Source:
            </span>
            <span
              className={`font-medium text-right ${
                isDark ? "text-slate-200" : "text-slate-800"
              }`}
            >
              {transaction.paymentMethod}
            </span>
          </div>

          {/* Ledger Trail */}
          <div
            className={`border-t pt-2 flex items-center justify-between ${
              isDark ? "border-white/10" : "border-slate-200/80"
            }`}
          >
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Previous Balance:
            </span>
            <span
              className={`font-medium ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {formatCurrency(transaction.previousBalance)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              Resulting Balance:
            </span>
            <span
              className={`font-bold ${
                isDark ? "text-white" : "text-[#0D1A27]"
              }`}
            >
              {formatCurrency(transaction.resultingBalance)}
            </span>
          </div>

          {transaction.failureReason && (
            <div className="mt-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs">
              <span className="font-bold">Failure Reason: </span>
              {transaction.failureReason}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl border font-semibold text-xs transition-colors ${
              isDark
                ? "border-white/10 text-slate-300 hover:bg-white/5"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onDownloadReceipt(transaction)}
            className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
        </div>

        <div
          className={`flex items-center justify-center gap-1.5 text-[10px] text-center ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Healthixia Immutable Financial Ledger Recorded</span>
        </div>
      </div>
    </div>
  );
};
