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
> = ({ invoice, isOpen, onClose, onDownload }) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1520] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-[#09101a] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1dc465]/15 text-[#1dc465]">
              <ShieldCheck size={16} />
            </span>
            <h3 className="text-sm font-bold text-white">
              Official Tax Invoice Receipt
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-gray-300">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-white">
                <Building2 size={20} className="text-[#1dc465]" />
                <span className="text-lg font-bold tracking-tight">
                  ClinicMS Healthcare Cloud
                </span>
              </div>
              <p className="mt-1 text-gray-400">
                Cloud Healthcare Software & Clinical Solutions Ltd.
              </p>
              <p className="text-gray-400">
                GSTIN: 29AAAAA0000A1Z5 | Support: billing@clinicms.com
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-[#1dc465]">
                TAX INVOICE - PAID
              </span>
              <p className="font-mono text-sm font-bold text-white">
                {invoice.invoiceNumber}
              </p>
              <p className="text-[11px] text-gray-400">Issued on {issueDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Billed To (Doctor / Clinic)
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {invoice.customerName || "Dr. Alexander Wright, MD"}
              </p>
              <p className="text-gray-400">
                {invoice.clinicName || "Apex Specialty Clinic"}
              </p>
              <p className="text-gray-400 font-mono text-[11px]">
                Doctor GSTIN: {invoice.clinicGstin || "29AABCU9603R1ZM"}
              </p>
              <p className="text-gray-400">
                {invoice.customerEmail || "alexander.wright@medicare.com"}
              </p>
            </div>

            <div className="space-y-1 sm:text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Payment Details
              </p>
              <p className="mt-1 flex sm:justify-end items-center gap-1.5 text-white">
                <CreditCard size={14} className="text-[#1dc465]" />
                <span>{invoice.paymentMethod}</span>
              </p>
              <p className="font-mono text-[11px] text-gray-400 flex sm:justify-end items-center gap-1">
                <Hash size={12} />
                <span>Txn: {invoice.transactionId}</span>
              </p>
              <p className="flex sm:justify-end items-center gap-1 text-[11px] text-[#8b9ab0]">
                <Calendar size={12} />
                <span>
                  Coverage: {periodStartDate} – {periodEndDate}
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-[11px] font-semibold text-gray-400">
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Period</th>
                  <th className="py-2.5 px-3 text-right">Base Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 px-3">
                    <p className="font-semibold text-white">
                      {invoice.planName}
                    </p>
                    <p className="text-[11px] text-[#8b9ab0]">
                      Cloud clinical management suite, AI Rx scribing &
                      telehealth
                    </p>
                  </td>
                  <td className="py-3 px-3 text-[#8b9ab0]">
                    {invoice.billingCycle}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-white">
                    {invoice.currency}
                    {invoice.amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-end gap-1.5 pt-2 font-mono">
            <div className="flex w-64 justify-between text-gray-400">
              <span>Subtotal:</span>
              <span>
                {invoice.currency}
                {invoice.amount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex w-64 justify-between text-gray-400">
              <span>Integrated GST (18%):</span>
              <span>
                {invoice.currency}
                {invoice.taxAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex w-64 justify-between border-t border-white/10 pt-2 text-sm font-bold text-[#1dc465]">
              <span>Total Paid:</span>
              <span>
                {invoice.currency}
                {invoice.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-[11px] text-[#1dc465]">
            <CheckCircle2 size={15} />
            <span>
              This is a digitally generated tax receipt with certified 256-bit
              signature. Valid for input tax credit (ITC).
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-[#09101a] px-6 py-4">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Printer size={14} />
            <span>Print Invoice</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/5"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onDownload(invoice)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#1dc465] px-4 py-2 text-xs font-bold text-[#080d14] shadow-md transition-colors hover:bg-[#18af59]"
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
