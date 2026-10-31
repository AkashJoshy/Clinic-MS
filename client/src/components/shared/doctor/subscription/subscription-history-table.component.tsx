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

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0c141d]/70 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Receipt size={17} className="text-[#1dc465]" />
            <h3 className="text-base font-bold tracking-tight text-white uppercase">
              Subscription Billing History
            </h3>
            <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-bold text-gray-400">
              {totalCount} Total
            </span>
          </div>
          <p className="text-xs text-[#8b9ab0]">
            Access and download GST tax invoices and transaction payment
            receipts.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search invoice # or plan..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-gray-500 transition-colors focus:border-[#1dc465] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#080d14] p-1">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onStatusFilterChange(opt.value)}
                className={`cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  statusFilter === opt.value
                    ? "bg-[#1dc465] text-[#080d14] font-bold"
                    : "text-[#8b9ab0] hover:text-white"
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-400">
            <SearchX size={22} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">
              No billing records found
            </p>
            <p className="text-xs text-[#8b9ab0]">
              No transactions match your current search or status filter.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-1 inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
          >
            <RotateCcw size={13} />
            <span>Reset Search & Filters</span>
          </button>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  <th className="py-3 pl-4 pr-3">Invoice & Plan</th>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Amount & Tax</th>
                  <th className="px-3 py-3">Payment Method</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="py-3 pl-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <SubscriptionHistoryRow
                    key={item.id}
                    item={item}
                    onViewInvoice={onViewInvoice}
                    onDownloadInvoice={onDownloadInvoice}
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
              />
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-[#8b9ab0]">
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
