import React from "react";
import { FileText, Download, Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import type { SubscriptionHistoryRowProps } from "@/types/doctor-subscription";

export const SubscriptionHistoryRow: React.FC<SubscriptionHistoryRowProps> = ({
  item,
  onViewInvoice,
  onDownloadInvoice,
}) => {
  const formattedDate = new Date(item.paidAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getStatusBadge = () => {
    switch (item.status) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#1dc465]">
            <CheckCircle2 size={11} />
            Paid
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
            <Clock size={11} />
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-red-400">
            <AlertCircle size={11} />
            {item.status}
          </span>
        );
    }
  };

  return (
    <>
      {/* Desktop Table Row */}
      <tr className="hidden border-b border-white/5 transition-colors hover:bg-white/[0.02] md:table-row">
        {/* Invoice & Plan */}
        <td className="py-4 pl-4 pr-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#1dc465]">
              <FileText size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {item.invoiceNumber}
              </p>
              <p className="text-[11px] text-[#8b9ab0]">
                {item.planName}
              </p>
            </div>
          </div>
        </td>

        {/* Date */}
        <td className="px-3 py-4 text-xs text-gray-300">
          {formattedDate}
        </td>

        {/* Amount */}
        <td className="px-3 py-4">
          <p className="text-xs font-bold text-white">
            {item.currency}
            {item.totalAmount.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-gray-500">
            GST ₹{item.taxAmount.toLocaleString("en-IN")}
          </p>
        </td>

        {/* Payment Method */}
        <td className="px-3 py-4 text-xs text-[#8b9ab0]">
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-gray-300">
            {item.paymentMethod}
          </span>
        </td>

        {/* Status */}
        <td className="px-3 py-4">
          {getStatusBadge()}
        </td>

        {/* Actions */}
        <td className="py-4 pl-3 pr-4 text-right">
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => onViewInvoice(item)}
              title="View Invoice Details"
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Eye size={13} />
              <span>View</span>
            </button>

            <button
              type="button"
              onClick={() => onDownloadInvoice(item)}
              title="Download Tax Receipt"
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-[#1dc465] transition-colors hover:bg-[#1dc465]/10"
            >
              <Download size={13} />
              <span>PDF</span>
            </button>
          </div>
        </td>
      </tr>

      {/* Mobile Card Layout */}
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 md:hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#1dc465]">
              <FileText size={15} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {item.invoiceNumber}
              </p>
              <p className="text-[11px] text-[#8b9ab0]">
                {item.planName}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-2.5 text-xs">
          <div>
            <span className="text-[11px] text-[#8b9ab0]">Date: </span>
            <span className="text-gray-300">{formattedDate}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#8b9ab0]">Total: </span>
            <span className="font-bold text-white">
              {item.currency}{item.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-2">
          <span className="text-[10px] text-gray-500">
            {item.paymentMethod}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onViewInvoice(item)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold text-gray-200"
            >
              <Eye size={12} />
              <span>View</span>
            </button>
            <button
              type="button"
              onClick={() => onDownloadInvoice(item)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold text-[#1dc465]"
            >
              <Download size={12} />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
