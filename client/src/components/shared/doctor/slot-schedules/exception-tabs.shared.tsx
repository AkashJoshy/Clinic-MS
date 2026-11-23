import type { ExceptionTabsProps } from "@/types/doctor-clinic";
import React from "react";

export const ExceptionTabs: React.FC<ExceptionTabsProps> = ({
  activeTab,
  exceptions,
  onTabChange,
  tabInactiveClass,
  countInactiveClass,
}) => {
  const tabs = ["breaks", "vacations", "blackouts", "holidays"] as const;

  return (
    <div className="flex items-center overflow-x-auto border-b border-gray-200 dark:border-slate-700/60">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        const tabCount = exceptions[tab].length;

        const count = tabCount > 9 ? `${tabCount}+` : tabCount;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`
              group inline-flex shrink-0 items-center gap-2
              whitespace-nowrap border-b-2 px-3 py-3
              text-xs font-medium capitalize
              transition-all duration-200 sm:px-4 sm:text-sm
              ${
                isActive
                  ? "border-primary text-primary"
                  : `border-transparent ${tabInactiveClass}`
              }
            `}
          >
            <span>{tab}</span>

            <span
              className={`
                inline-flex h-[22px] min-w-[22px] items-center
                justify-center rounded-md px-1.5
                text-[11px] font-semibold tabular-nums
                transition-colors duration-200
                ${
                  isActive
                    ? "border border-primary/30 bg-primary/15 text-primary"
                    : `border ${countInactiveClass}`
                }
              `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
