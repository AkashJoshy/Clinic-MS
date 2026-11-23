import React from "react";
import {
  X,
  Printer,
  Download,
  Building2,
  CheckCircle2,
  Calendar,
  CreditCard,
  Hash,
  ShieldCheck,
} from "lucide-react";
import type { SubscriptionInvoiceModalProps } from "@/types/doctor-subscription";

export const SubscriptionInvoiceModal: React.FC<
  SubscriptionInvoiceModalProps
> = ({ invoice, isOpen, onClose, onDownload, isDark }) => {
  if (!isOpen || !invoice) return null;

  const issueDate = new Date(invoice.paidAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const periodStartDate = new Date(invoice.periodStart).toLocaleDateString(
    "en-IN",
    { month: "short", day: "numeric", year: "numeric" },
  );

  const periodEndDate = new Date(invoice.periodEnd).toLocaleDateString(
    "en-IN",
    { month: "short", day: "numeric", year: "numeric" },
  );

  const handlePrint = () => {
    window.print();
  };

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-[#8b9ab0]" : "text-slate-600";
  const borderClass = isDark ? "border-white/10" : "border-slate-200";
  const modalBg = isDark ? "bg-[#0d1520]" : "bg-white";
  const headerBg = isDark ? "bg-[#09101a]" : "bg-slate-50";
  const subtleBg = isDark ? "bg-white/[0.02]" : "bg-slate-50";
  const tableHeaderBg = isDark ? "bg-white/5" : "bg-slate-100";
  const tableDivider = isDark ? "divide-white/5" : "divide-slate-100";

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border ${borderClass} ${modalBg} shadow-2xl`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b ${borderClass} ${headerBg} px-6 py-4`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <ShieldCheck size={16} />
            </span>
            <h3 className={`text-sm font-bold ${textPrimary}`}>
              Official Tax Invoice Receipt
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
              isDark
                ? "text-gray-400 hover:bg-white/10 hover:text-white"
                : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Invoice Content */}
        <div
          className={`flex-1 space-y-6 overflow-y-auto p-6 text-xs ${textSecondary}`}
        >
          {/* Company Details */}
          <div
            className={`flex flex-col gap-4 border-b ${borderClass} pb-6 sm:flex-row sm:items-start sm:justify-between`}
          >
            <div>
              <div className={`flex items-center gap-2 ${textPrimary}`}>
                <Building2 size={20} className="text-primary" />
                <span className="text-lg font-bold tracking-tight">
                  ClinicMS Healthcare Cloud
                </span>
              </div>

              <p className={`mt-1 ${textSecondary}`}>
                Cloud Healthcare Software & Clinical Solutions Ltd.
              </p>
              <p className={textSecondary}>
                GSTIN: 29AAAAA0000A1Z5 | Support: billing@clinicms.com
              </p>
            </div>

            <div className="space-y-1 text-left sm:text-right">
              <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-emerald-500">
                TAX INVOICE - PAID
              </span>

              <p className={`font-mono text-sm font-bold ${textPrimary}`}>
                {invoice.invoiceNumber}
              </p>
              <p className={`text-[11px] ${textSecondary}`}>
                Issued on {issueDate}
              </p>
            </div>
          </div>

          {/* Customer and Payment Details */}
          <div
            className={`grid grid-cols-1 gap-4 rounded-xl border ${isDark ? "border-white/5" : "border-slate-200"} ${subtleBg} p-4 sm:grid-cols-2`}
          >
            <div>
              <p
                className={`text-[11px] font-bold uppercase tracking-wider ${textSecondary}`}
              >
                Billed To (Doctor / Clinic)
              </p>

              <p className={`mt-1 text-sm font-bold ${textPrimary}`}>
                {invoice.customerName || "Dr. Alexander Wright, MD"}
              </p>
              <p className={textSecondary}>
                {invoice.clinicName || "Apex Specialty Clinic"}
              </p>
              <p className={`font-mono text-[11px] ${textSecondary}`}>
                Doctor GSTIN: {invoice.clinicGstin || "29AABCU9603R1ZM"}
              </p>
              <p className={textSecondary}>
                {invoice.customerEmail || "alexander.wright@medicare.com"}
              </p>
            </div>

            <div className="space-y-1 sm:text-right">
              <p
                className={`text-[11px] font-bold uppercase tracking-wider ${textSecondary}`}
              >
                Payment Details
              </p>

              <p
                className={`mt-1 flex items-center gap-1.5 ${textPrimary} sm:justify-end`}
              >
                <CreditCard size={14} className="text-primary" />
                <span>{invoice.paymentMethod}</span>
              </p>

              <p
                className={`flex items-center gap-1 font-mono text-[11px] ${textSecondary} sm:justify-end`}
              >
                <Hash size={12} />
                <span>Txn: {invoice.transactionId}</span>
              </p>

              <p
                className={`flex items-center gap-1 text-[11px] ${textSecondary} sm:justify-end`}
              >
                <Calendar size={12} />
                <span>
                  Coverage: {periodStartDate} – {periodEndDate}
                </span>
              </p>
            </div>
          </div>

          {/* Invoice Table */}
          <div className={`overflow-hidden rounded-xl border ${borderClass}`}>
            <table className="w-full text-left">
              <thead>
                <tr
                  className={`border-b ${borderClass} ${tableHeaderBg} text-[11px] font-semibold ${textSecondary}`}
                >
                  <th className="px-3 py-2.5">Description</th>
                  <th className="px-3 py-2.5">Period</th>
                  <th className="px-3 py-2.5 text-right">Base Amount</th>
                </tr>
              </thead>

              <tbody className={tableDivider}>
                <tr>
                  <td className="px-3 py-3">
                    <p className={`font-semibold ${textPrimary}`}>
                      {invoice.planName}
                    </p>
                    <p className={`text-[11px] ${textSecondary}`}>
                      Cloud clinical management suite, AI Rx scribing &
                      telehealth
                    </p>
                  </td>

                  <td className={`px-3 py-3 ${textSecondary}`}>
                    {invoice.billingCycle}
                  </td>

                  <td
                    className={`px-3 py-3 text-right font-mono ${textPrimary}`}
                  >
                    {invoice.currency}
                    {invoice.amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount Summary */}
          <div className="flex flex-col items-end gap-1.5 pt-2 font-mono">
            <div className={`flex w-64 justify-between ${textSecondary}`}>
              <span>Subtotal:</span>
              <span>
                {invoice.currency}
                {invoice.amount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className={`flex w-64 justify-between ${textSecondary}`}>
              <span>Integrated GST (18%):</span>
              <span>
                {invoice.currency}
                {invoice.taxAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div
              className={`flex w-64 justify-between border-t ${borderClass} pt-2 text-sm font-bold text-primary`}
            >
              <span>Total Paid:</span>
              <span>
                {invoice.currency}
                {invoice.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Verification Notice */}
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-[11px] text-primary">
            <CheckCircle2 size={15} className="shrink-0" />
            <span>
              This is a digitally generated tax receipt with certified 256-bit
              signature. Valid for input tax credit (ITC).
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className={`flex items-center justify-between border-t ${borderClass} ${headerBg} px-6 py-4`}
        >
          <button
            type="button"
            onClick={handlePrint}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
              isDark
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Printer size={14} />
            <span>Print Invoice</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-semibold transition-colors ${
                isDark
                  ? "border-white/10 text-gray-300 hover:bg-white/5"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => onDownload(invoice)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
