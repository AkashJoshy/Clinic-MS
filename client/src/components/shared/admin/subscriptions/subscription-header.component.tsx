import React from "react";
import { CreditCard, Plus, Search, Sparkles } from "lucide-react";
import type { PlanStatus } from "@/types/subscription";

interface SubscriptionHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: "ALL" | PlanStatus;
  onStatusFilterChange: (status: "ALL" | PlanStatus) => void;
  onOpenCreateModal: () => void;
  counts: {
    all: number;
    active: number;
    inactive: number;
  };
}

const FILTERS = [
  { value: "ALL", label: "All" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
] as const;

export const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onOpenCreateModal,
  counts,
}) => {
  const getCount = (filter: (typeof FILTERS)[number]["value"]) => {
    switch (filter) {
      case "ALL":
        return counts.all;
      case "ACTIVE":
        return counts.active;
      case "INACTIVE":
        return counts.inactive;
    }
  };

  return (
    <header className="w-full min-w-0 space-y-5">
      {/* Title and primary action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1dc465]/30 bg-[#1dc465]/10 sm:h-11 sm:w-11 sm:rounded-2xl">
            <CreditCard
              size={21}
              className="text-[#1dc465]"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
                Subscription Plans
              </h1>

              <span className="hidden items-center gap-1 rounded-full border border-[#1dc465]/20 bg-[#1dc465]/10 px-2 py-0.5 text-[10px] font-semibold text-[#1dc465] sm:inline-flex">
                <Sparkles size={10} aria-hidden="true" />
                Active Billing
              </span>
            </div>

            <p className="mt-1 text-xs leading-relaxed text-[#8b9ab0] sm:text-sm">
              Create, configure, and manage clinic & doctor subscription tiers
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1dc465] px-4 py-2.5 text-sm font-bold text-[#080d14] shadow-lg shadow-[#1dc465]/10 transition-colors hover:bg-[#15a050] active:scale-[0.98] sm:w-auto"
        >
          <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
          <span>Create Subscription</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex min-w-0 flex-col gap-3 pt-1 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full min-w-0 lg:max-w-md">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b9ab0]"
            aria-hidden="true"
          />

          <input
            type="search"
            aria-label="Search subscription plans"
            placeholder="Search plans, features, keywords..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c141e] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#1dc465]/50 focus:ring-1 focus:ring-[#1dc465]/30"
          />
        </div>

        {/* Horizontally scrollable on narrow screens */}
        <div
          role="group"
          aria-label="Filter subscription plans by status"
          className="flex w-full min-w-0 max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-[#0c141e] p-1 sm:w-fit"
        >
          {FILTERS.map((filter) => {
            const isSelected = statusFilter === filter.value;
            const count = getCount(filter.value);

            const selectedStyles = {
              ALL: "bg-white/10 text-white",
              ACTIVE:
                "border border-[#1dc465]/30 bg-[#1dc465]/15 text-[#1dc465]",
              INACTIVE:
                "border border-rose-500/30 bg-rose-500/15 text-rose-300",
            }[filter.value];

            const countStyles = {
              ALL: "bg-white/5 text-current",
              ACTIVE: "bg-[#1dc465]/10 text-[#1dc465]",
              INACTIVE: "bg-rose-500/10 text-rose-300",
            }[filter.value];

            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onStatusFilterChange(filter.value)}
                className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs transition-colors ${
                  isSelected
                    ? `${selectedStyles} font-semibold`
                    : "text-[#8b9ab0] hover:bg-white/5 hover:text-white"
                }`}
              >
                {filter.label}

                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${countStyles}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default SubscriptionHeader;
