import React from "react";
import { CreditCard, Plus, Search } from "lucide-react";
import type { PlanStatus } from "@/types/subscription";
import AdminPageHeader from "../../page-header.shared";
import { getSubscriptionHeaderTheme } from "@/helpers/admin/subscription.helper";

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
  isDark: boolean;
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
  isDark,
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

  const theme = getSubscriptionHeaderTheme(isDark);

  return (
    <header className="w-full min-w-0 space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <AdminPageHeader
            icon={CreditCard}
            title="Subscription Plans"
            description="Create, configure, and manage clinic & doctor subscription tiers"
            isDark={isDark}
          />
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className={`inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/10 transition-colors hover:bg-primary/90 active:scale-[0.98] sm:w-auto`}
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
            className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${theme.searchIcon}`}
            aria-hidden="true"
          />

          <input
            type="search"
            aria-label="Search subscription plans"
            placeholder="Search plans, features, keywords..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30 ${theme.searchInput}`}
          />
        </div>

        {/* Horizontally scrollable on narrow screens */}
        <div
          role="group"
          aria-label="Filter subscription plans by status"
          className={`flex w-full min-w-0 max-w-full items-center gap-1 overflow-x-auto rounded-xl border p-1 sm:w-fit ${theme.filterContainer}`}
        >
          {FILTERS.map((filter) => {
            const isSelected = statusFilter === filter.value;
            const count = getCount(filter.value);

            const selectedStyles = {
              ALL: theme.allSelected,
              ACTIVE: theme.activeSelected,
              INACTIVE: theme.inactiveSelected,
            }[filter.value];

            const countStyles = {
              ALL: theme.allCount,
              ACTIVE: theme.activeCount,
              INACTIVE: theme.inactiveCount,
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
                    : theme.filterText
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
