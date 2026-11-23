import React from "react";
import { Receipt, Search, SearchX, RotateCcw } from "lucide-react";
import type {
  HistoryItemStatus,
  SubscriptionHistoryTableProps,
} from "@/types/doctor-subscription";
import { SubscriptionHistoryRow } from "./subscription-history-row.component";

export const SubscriptionHistoryTable: React.FC<
  SubscriptionHistoryTableProps
> = ({
  history,
  totalCount,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onResetFilters,
  onViewInvoice,
  onDownloadInvoice,
  isDark,
}) => {
  const statusOptions: Array<{
    label: string;
    value: "ALL" | HistoryItemStatus;
  }> = [
    { label: "All Invoices", value: "ALL" },
    { label: "Paid", value: "PAID" },
    { label: "Pending", value: "PENDING" },
    { label: "Refunded", value: "REFUNDED" },
  ];

  const containerClass = isDark
    ? "border-white/10 bg-[#0c141d]/70"
    : "border-slate-200 bg-white";

  const headingClass = isDark ? "text-white" : "text-slate-900";

  const descriptionClass = isDark ? "text-[#8b9ab0]" : "text-slate-600";

  const dividerClass = isDark ? "border-white/10" : "border-slate-200";

  const searchInputClass = isDark
    ? "border-white/10 bg-white/5 text-white placeholder-gray-500"
    : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400";

  const filterContainerClass = isDark
    ? "border-white/10 bg-[#080d14]"
    : "border-slate-200 bg-slate-100";

  const inactiveFilterClass = isDark
    ? "text-[#8b9ab0] hover:text-white"
    : "text-slate-600 hover:text-slate-900";

  const tableHeaderClass = isDark ? "text-gray-400" : "text-slate-500";

  const secondaryTextClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";

  const emptyIconClass = isDark
    ? "border-white/10 bg-white/5 text-gray-400"
    : "border-slate-200 bg-slate-100 text-slate-500";

  const resetButtonClass = isDark
    ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100";

  return (
    <div
      className={`space-y-4 rounded-2xl border p-4 sm:p-6 ${containerClass}`}
    >
      <div
        className={`flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center lg:justify-between ${dividerClass}`}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Receipt size={17} className="text-primary" />

            <h3
              className={`text-base font-bold tracking-tight uppercase ${headingClass}`}
            >
              Subscription Billing History
            </h3>

            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                isDark
                  ? "border-white/10 bg-white/5 text-gray-400"
                  : "border-slate-200 bg-slate-100 text-slate-600"
              }`}
            >
              {totalCount} Total
            </span>
          </div>

          <p className={`text-xs ${descriptionClass}`}>
            Access and download GST tax invoices and transaction payment
            receipts.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search
              size={14}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-slate-400"
              }`}
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search invoice # or plan..."
              className={`w-full rounded-xl border py-2 pr-3 pl-9 text-xs transition-colors focus:border-primary focus:outline-none ${searchInputClass}`}
            />
          </div>

          <div
            className={`flex flex-wrap items-center gap-1 rounded-xl border p-1 ${filterContainerClass}`}
          >
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onStatusFilterChange(opt.value)}
                aria-pressed={statusFilter === opt.value}
                className={`cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  statusFilter === opt.value
                    ? "bg-primary font-bold text-primary-foreground"
                    : inactiveFilterClass
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${emptyIconClass}`}
          >
            <SearchX size={22} />
          </div>

          <div className="space-y-1">
            <p className={`text-sm font-semibold ${headingClass}`}>
              No billing records found
            </p>

            <p className={`text-xs ${descriptionClass}`}>
              No transactions match your current search or status filter.
            </p>
          </div>

          <button
            type="button"
            onClick={onResetFilters}
            className={`mt-1 inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${resetButtonClass}`}
          >
            <RotateCcw size={13} />
            <span>Reset Search & Filters</span>
          </button>
        </div>
      ) : (
        <>
          <div className="custom-scrollbar scrollbar-none hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr
                  className={`border-b text-[11px] font-semibold tracking-wider uppercase ${dividerClass} ${tableHeaderClass}`}
                >
                  <th className="py-3 pr-3 pl-4">Invoice & Plan</th>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Amount & Tax</th>
                  <th className="px-3 py-3">Payment Method</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="py-3 pr-4 pl-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <SubscriptionHistoryRow
                    key={item.id}
                    item={item}
                    onViewInvoice={onViewInvoice}
                    onDownloadInvoice={onDownloadInvoice}
                    isDark={isDark}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {history.map((item) => (
              <SubscriptionHistoryRow
                key={item.id}
                item={item}
                onViewInvoice={onViewInvoice}
                onDownloadInvoice={onDownloadInvoice}
                isDark={isDark}
              />
            ))}
          </div>

          <div
            className={`flex flex-col gap-2 border-t pt-3 text-[11px] sm:flex-row sm:items-center sm:justify-between ${dividerClass} ${secondaryTextClass}`}
          >
            <span>
              Showing {history.length} of {totalCount} records
            </span>

            <span>All amounts include applicable 18% GST</span>
          </div>
        </>
      )}
    </div>
  );
};
