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
}

export const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  transaction,
  onClose,
  onDownloadReceipt,
}) => {
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
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Icon & Amount */}
        <div className="text-center space-y-2 pt-2">
          <div
            className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center ${
              transaction.type === "credit"
                ? "bg-emerald-50 text-[#1DC465] border border-emerald-200"
                : "bg-rose-50 text-rose-500 border border-rose-200"
            }`}
          >
            {transaction.type === "credit" ? (
              <ArrowDownLeft className="w-7 h-7" />
            ) : (
              <ArrowUpRight className="w-7 h-7" />
            )}
          </div>

          <div className="text-2xl font-extrabold text-[#0D1A27]">
            <span
              className={
                transaction.type === "credit"
                  ? "text-[#1DC465]"
                  : "text-rose-600"
              }
            >
              {transaction.type === "credit" ? "+" : "−"}
              {formatCurrency(transaction.amount)}
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-800">
            {transaction.title}
          </h3>
          <p className="text-xs text-slate-500">{transaction.description}</p>
        </div>

        {/* Audit Details Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Transaction Status:</span>
            <div>
              {transaction.status === "completed" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{" "}
                  Completed
                </span>
              )}
              {transaction.status === "pending" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending
                </span>
              )}
              {transaction.status === "failed" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" /> Failed
                </span>
              )}
            </div>
          </div>

          {/* Transaction ID */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Transaction ID:</span>
            <div className="flex items-center gap-1 font-mono font-semibold text-slate-800">
              <span>{transaction.id}</span>
              <button
                type="button"
                onClick={() => handleCopy(transaction.id, "Txn ID")}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                {copiedField === "Txn ID" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Reference ID */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Gateway Reference:</span>
            <div className="flex items-center gap-1 font-mono text-slate-700">
              <span>{transaction.referenceId}</span>
              <button
                type="button"
                onClick={() => handleCopy(transaction.referenceId, "Reference")}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                {copiedField === "Reference" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Date & Time:</span>
            <span className="font-medium text-slate-800">
              {transaction.date} at {transaction.time}
            </span>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Payment Source:</span>
            <span className="font-medium text-slate-800">
              {transaction.paymentMethod}
            </span>
          </div>

          {/* Ledger Trail */}
          <div className="border-t border-slate-200/80 pt-2 flex items-center justify-between">
            <span className="text-slate-500">Previous Balance:</span>
            <span className="text-slate-700 font-medium">
              {formatCurrency(transaction.previousBalance)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Resulting Balance:</span>
            <span className="font-bold text-[#0D1A27]">
              {formatCurrency(transaction.resultingBalance)}
            </span>
          </div>

          {transaction.failureReason && (
            <div className="mt-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
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
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onDownloadReceipt(transaction)}
            className="flex-1 py-2.5 rounded-xl bg-[#0D1A27] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <FileDown className="w-4 h-4 text-emerald-400" />
            <span>Download Receipt</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Healthixia Immutable Financial Ledger Recorded</span>
        </div>
      </div>
    </div>
  );
};
