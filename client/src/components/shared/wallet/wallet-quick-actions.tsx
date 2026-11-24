
import React from "react";
import {
  PlusCircle,
  ArrowDownToLine,
  ListOrdered,
  FileSpreadsheet,
  CreditCard,
  Building2,
  ShieldCheck,
} from "lucide-react";

import UnderConstructionOverlay from "../under-construction-overlay.shared";

interface WalletQuickActionsProps {
  onAddMoney: () => void;
  onWithdraw: () => void;
  onViewTransactions: () => void;
  onOpenStatements: () => void;
  onOpenPaymentMethods: () => void;
  isDark?: boolean;
}

export const WalletQuickActions: React.FC<WalletQuickActionsProps> = ({
  onAddMoney,
  onWithdraw,
  onViewTransactions,
  onOpenStatements,
  onOpenPaymentMethods,
  isDark = false,
}) => {
  const actions = [
    {
      id: "add",
      label: "Add Money",
      desc: "Top up wallet",
      icon: PlusCircle,
      isPrimary: true,
      isUnderConstruction: false,
      onClick: onAddMoney,
    },
    {
      id: "withdraw",
      label: "Withdraw",
      desc: "Payout to bank",
      icon: ArrowDownToLine,
      isPrimary: false,
      isUnderConstruction: true,
      onClick: onWithdraw,
    },
    {
      id: "history",
      label: "Transactions",
      desc: "View all logs",
      icon: ListOrdered,
      isPrimary: false,
      isUnderConstruction: false,
      onClick: onViewTransactions,
    },
    {
      id: "statement",
      label: "Statements",
      desc: "Export PDF/CSV",
      icon: FileSpreadsheet,
      isPrimary: false,
      isUnderConstruction: true,
      onClick: onOpenStatements,
    },
    {
      id: "methods",
      label: "Payment Modes",
      desc: "UPI & Cards",
      icon: CreditCard,
      isPrimary: false,
      isUnderConstruction: true,
      onClick: onOpenPaymentMethods,
    },
  ];

  return (
    <section
      className={`
        flex h-full min-w-0 flex-col gap-4
        rounded-2xl border p-4 shadow-xs
        sm:gap-5 sm:p-5 lg:p-6
        ${
          isDark
            ? "border-white/10 bg-[#0D1A27]"
            : "border-slate-200/80 bg-white"
        }
      `}
    >
      {/* Header */}
      <div className="min-w-0">
        <h2
          className={`
            text-base font-bold sm:text-lg
            ${isDark ? "text-white" : "text-[#0D1A27]"}
          `}
        >
          Quick Actions
        </h2>

        <p
          className={`
            mt-0.5 text-xs leading-relaxed
            ${isDark ? "text-slate-400" : "text-slate-500"}
          `}
        >
          Execute fast operations or configure wallet tools.
        </p>
      </div>

      {/* Action Tiles */}
      <div
        className="
          grid min-w-0 grid-cols-2 gap-2
          sm:grid-cols-3 sm:gap-2.5
          xl:grid-cols-2
          2xl:grid-cols-3
        "
      >
        {actions.map((action) => {
          const Icon = action.icon;

          const tileContent = (
            <>
              <span
                className={`
                  mb-2 flex h-9 w-9 shrink-0 items-center
                  justify-center rounded-lg transition-transform
                  group-hover:scale-105 sm:h-10 sm:w-10
                  ${
                    action.isPrimary
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : isDark
                        ? "border border-white/10 bg-white/5 text-slate-300 shadow-2xs"
                        : "border border-slate-200 bg-white text-slate-600 shadow-2xs"
                  }
                `}
              >
                <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </span>

              <span
                className={`
                  max-w-full break-words text-xs font-bold
                  leading-tight
                  ${isDark ? "text-white" : "text-[#0D1A27]"}
                `}
              >
                {action.label}
              </span>

              <span
                className={`
                  mt-1 max-w-full break-words
                  text-[10px] leading-relaxed
                  ${isDark ? "text-slate-400" : "text-slate-500"}
                `}
              >
                {action.desc}
              </span>
            </>
          );

          const tileClass = `
            group flex min-w-0 min-h-[105px] flex-col
            items-center justify-center rounded-xl border
            p-2.5 text-center transition-all sm:p-3
            ${
              action.isPrimary
                ? "border-primary/30 bg-primary/10 hover:bg-primary/20"
                : isDark
                  ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  : "border-slate-200/80 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100"
            }
          `;

          // Under Construction Actions
          if (action.isUnderConstruction) {
            return (
              <div
                key={action.id}
                className={`
                  relative flex min-h-[105px] min-w-0
                  items-center justify-center overflow-hidden
                  rounded-xl border
                  ${
                    isDark
                      ? "border-white/10 bg-white/5"
                      : "border-slate-200/80 bg-slate-50/70"
                  }
                `}
              >
                <UnderConstructionOverlay
                  name={action.label}
                  isDark={isDark}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            );
          }

          // Functional Actions
          return (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              className={`
                ${tileClass}
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-primary
              `}
            >
              {tileContent}
            </button>
          );
        })}
      </div>

      {/* Linked Payout Summary */}
      <div
        className={`
          mt-auto flex min-w-0 flex-col gap-4
          rounded-xl border p-3
          sm:p-4
          ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-slate-200/80 bg-slate-50"
          }
        `}
      >
        {/* Bank Details */}
        <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
          <div
            className={`
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg border
              ${
                isDark
                  ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  : "border-blue-200 bg-blue-100 text-blue-700"
              }
            `}
          >
            <Building2 className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <span
                className={`
                  break-words text-xs font-semibold leading-relaxed
                  ${isDark ? "text-slate-200" : "text-slate-800"}
                `}
              >
                Linked Payout: HDFC Bank (•••• 9842)
              </span>

              <span
                className={`
                  inline-flex shrink-0 items-center gap-1
                  rounded border px-1.5 py-0.5
                  text-[10px] font-medium
                  ${
                    isDark
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "border-emerald-200 bg-emerald-100 text-emerald-800"
                  }
                `}
              >
                <ShieldCheck
                  className={`
                    h-3 w-3
                    ${isDark ? "text-emerald-400" : "text-emerald-600"}
                  `}
                />
                Verified
              </span>
            </div>

            <p
              className={`
                mt-1 break-words text-[11px] leading-relaxed
                ${isDark ? "text-slate-400" : "text-slate-500"}
              `}
            >
              IFSC: HDFC0001245
              <span className="mx-1">•</span>
              Auto-settlement active
            </p>
          </div>
        </div>

        {/* Limits */}
        <div
          className={`
            grid grid-cols-2 gap-3
            border-t pt-3
            text-[11px]
            ${
              isDark
                ? "border-white/10 text-slate-400"
                : "border-slate-200 text-slate-500"
            }
          `}
        >
          <div className="min-w-0">
            <span
              className={`
                block leading-relaxed
                ${isDark ? "text-slate-500" : "text-slate-400"}
              `}
            >
              Daily Limit
            </span>

            <span
              className={`
                mt-0.5 block break-words font-semibold sm:text-xs
                ${isDark ? "text-slate-200" : "text-slate-700"}
              `}
            >
              ₹1,00,000
            </span>
          </div>

          <div
            className={`
              min-w-0 border-l pl-3
              ${isDark ? "border-white/10" : "border-slate-200"}
            `}
          >
            <span
              className={`
                block leading-relaxed
                ${isDark ? "text-slate-500" : "text-slate-400"}
              `}
            >
              Per Txn Limit
            </span>

            <span
              className={`
                mt-0.5 block break-words font-semibold sm:text-xs
                ${isDark ? "text-slate-200" : "text-slate-700"}
              `}
            >
              ₹50,000
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletQuickActions;
