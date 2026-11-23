import React from "react";
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import type { SubscriptionHistoryRowProps } from "@/types/doctor-subscription";

export const SubscriptionHistoryRow: React.FC<SubscriptionHistoryRowProps> = ({
  item,
  onViewInvoice,
  onDownloadInvoice,
  isDark,
}) => {
  const formattedDate = new Date(item.paidAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const primaryTextClass = isDark ? "text-white" : "text-slate-900";

  const secondaryTextClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";

  const mutedTextClass = isDark ? "text-gray-500" : "text-slate-500";

  const dividerClass = isDark ? "border-white/5" : "border-slate-200";

  const iconContainerClass = isDark
    ? "border-white/10 bg-white/5"
    : "border-slate-200 bg-slate-100";

  const actionButtonClass = isDark
    ? "border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white"
    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900";

  const downloadButtonClass = isDark
    ? "border-white/10 bg-white/5 text-primary hover:bg-primary/10"
    : "border-slate-200 bg-slate-50 text-primary hover:bg-primary/5";

  const getStatusBadge = () => {
    switch (item.status) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-500">
            <CheckCircle2 size={11} />
            Paid
          </span>
        );

      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-500">
            <Clock size={11} />
            Pending
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-red-500">
            <AlertCircle size={11} />
            {item.status}
          </span>
        );
    }
  };

  return (
    <>
      {/* Desktop Table Row */}
      <tr
        className={`hidden border-b transition-colors md:table-row ${
          dividerClass
        } ${
          isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"
        }`}
      >
        <td className="py-4 pr-3 pl-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-primary ${iconContainerClass}`}
            >
              <FileText size={16} />
            </div>

            <div>
              <p className={`text-xs font-bold ${primaryTextClass}`}>
                {item.invoiceNumber}
              </p>

              <p className={`text-[11px] ${secondaryTextClass}`}>
                {item.planName}
              </p>
            </div>
          </div>
        </td>

        <td className={`px-3 py-4 text-xs ${isDark ? "text-gray-300" : "text-slate-600"}`}>
          {formattedDate}
        </td>

        <td className="px-3 py-4">
          <p className={`text-xs font-bold ${primaryTextClass}`}>
            {item.currency}
            {item.totalAmount.toLocaleString("en-IN")}
          </p>

          <p className={`text-[10px] ${mutedTextClass}`}>
            GST ₹{item.taxAmount.toLocaleString("en-IN")}
          </p>
        </td>

        <td className={`px-3 py-4 text-xs ${secondaryTextClass}`}>
          <span
            className={`rounded-md border px-2 py-1 text-[11px] ${
              isDark
                ? "border-white/10 bg-white/5 text-gray-300"
                : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            {item.paymentMethod}
          </span>
        </td>

        <td className="px-3 py-4">{getStatusBadge()}</td>

        <td className="py-4 pr-4 pl-3 text-right">
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => onViewInvoice(item)}
              title="View Invoice Details"
              className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${actionButtonClass}`}
            >
              <Eye size={13} />
              <span>View</span>
            </button>

            <button
              type="button"
              onClick={() => onDownloadInvoice(item)}
              title="Download Tax Receipt"
              className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${downloadButtonClass}`}
            >
              <Download size={13} />
              <span>PDF</span>
            </button>
          </div>
        </td>
      </tr>

      {/* Mobile Card Layout */}
      <div
        className={`flex flex-col gap-3 rounded-xl border p-4 md:hidden ${
          isDark
            ? "border-white/10 bg-white/[0.02]"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-primary ${iconContainerClass}`}
            >
              <FileText size={15} />
            </div>

            <div>
              <p className={`text-xs font-bold ${primaryTextClass}`}>
                {item.invoiceNumber}
              </p>

              <p className={`text-[11px] ${secondaryTextClass}`}>
                {item.planName}
              </p>
            </div>
          </div>

          {getStatusBadge()}
        </div>

        <div
          className={`flex items-center justify-between border-t pt-2.5 text-xs ${dividerClass}`}
        >
          <div>
            <span className={`text-[11px] ${secondaryTextClass}`}>
              Date:{" "}
            </span>

            <span className={isDark ? "text-gray-300" : "text-slate-600"}>
              {formattedDate}
            </span>
          </div>

          <div className="text-right">
            <span className={`text-[11px] ${secondaryTextClass}`}>
              Total:{" "}
            </span>

            <span className={`font-bold ${primaryTextClass}`}>
              {item.currency}
              {item.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div
          className={`flex items-center justify-between border-t pt-2 ${dividerClass}`}
        >
          <span className={`text-[10px] ${mutedTextClass}`}>
            {item.paymentMethod}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onViewInvoice(item)}
              className={`inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold ${actionButtonClass}`}
            >
              <Eye size={12} />
              <span>View</span>
            </button>

            <button
              type="button"
              onClick={() => onDownloadInvoice(item)}
              className={`inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold ${downloadButtonClass}`}
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