
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

interface WalletQuickActionsProps {
  onAddMoney: () => void;
  onWithdraw: () => void;
  onViewTransactions: () => void;
  onOpenStatements: () => void;
  onOpenPaymentMethods: () => void;
}

export const WalletQuickActions: React.FC<WalletQuickActionsProps> = ({
  onAddMoney,
  onWithdraw,
  onViewTransactions,
  onOpenStatements,
  onOpenPaymentMethods,
}) => {
  const actions = [
    {
      id: "add",
      label: "Add Money",
      desc: "Top up wallet",
      icon: PlusCircle,
      isPrimary: true,
      onClick: onAddMoney,
    },
    {
      id: "withdraw",
      label: "Withdraw",
      desc: "Payout to bank",
      icon: ArrowDownToLine,
      isPrimary: false,
      onClick: onWithdraw,
    },
    {
      id: "history",
      label: "Transactions",
      desc: "View all logs",
      icon: ListOrdered,
      isPrimary: false,
      onClick: onViewTransactions,
    },
    {
      id: "statement",
      label: "Statements",
      desc: "Export PDF/CSV",
      icon: FileSpreadsheet,
      isPrimary: false,
      onClick: onOpenStatements,
    },
    {
      id: "methods",
      label: "Payment Modes",
      desc: "UPI & Cards",
      icon: CreditCard,
      isPrimary: false,
      onClick: onOpenPaymentMethods,
    },
  ];

  return (
    <section
      className="
        flex h-full min-w-0 flex-col gap-4
        rounded-2xl border border-slate-200/80
        bg-white p-4 shadow-xs
        sm:gap-5 sm:p-5
        lg:p-6
      "
    >
      {/* Header */}
      <div className="min-w-0">
        <h2 className="text-base font-bold text-[#0D1A27] sm:text-lg">
          Quick Actions
        </h2>

        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
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

          return (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              className={`
                group flex min-w-0 flex-col items-center
                justify-center rounded-xl border
                p-2.5 text-center transition-all
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-emerald-500
                sm:p-3
                ${
                  action.isPrimary
                    ? "border-[#1DC465]/30 bg-[#1DC465]/10 hover:bg-[#1DC465]/20"
                    : "border-slate-200/80 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100"
                }
              `}
            >
              <span
                className={`
                  mb-2 flex h-9 w-9 shrink-0 items-center
                  justify-center rounded-lg transition-transform
                  group-hover:scale-105 sm:h-10 sm:w-10
                  ${
                    action.isPrimary
                      ? "bg-[#1DC465] text-white shadow-xs"
                      : "border border-slate-200 bg-white text-slate-600 shadow-2xs"
                  }
                `}
              >
                <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </span>

              <span
                className="
                  max-w-full break-words text-xs font-bold
                  leading-tight text-[#0D1A27]
                "
              >
                {action.label}
              </span>

              <span
                className="
                  mt-1 max-w-full break-words
                  text-[10px] leading-relaxed text-slate-500
                "
              >
                {action.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Linked Payout Summary */}
      <div
        className="
          mt-auto flex min-w-0 flex-col gap-4
          rounded-xl border border-slate-200/80
          bg-slate-50 p-3
          sm:p-4
        "
      >
        {/* Bank Details */}
        <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg border border-blue-200
              bg-blue-100 text-blue-700
            "
          >
            <Building2 className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <span className="break-words text-xs font-semibold leading-relaxed text-slate-800">
                Linked Payout: HDFC Bank (•••• 9842)
              </span>

              <span
                className="
                  inline-flex shrink-0 items-center gap-1
                  rounded border border-emerald-200
                  bg-emerald-100 px-1.5 py-0.5
                  text-[10px] font-medium text-emerald-800
                "
              >
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                Verified
              </span>
            </div>

            <p className="mt-1 break-words text-[11px] leading-relaxed text-slate-500">
              IFSC: HDFC0001245
              <span className="mx-1">•</span>
              Auto-settlement active
            </p>
          </div>
        </div>

        {/* Limits */}
        <div
          className="
            grid grid-cols-2 gap-3
            border-t border-slate-200 pt-3
            text-[11px] text-slate-500
          "
        >
          <div className="min-w-0">
            <span className="block leading-relaxed text-slate-400">
              Daily Limit
            </span>

            <span className="mt-0.5 block break-words font-semibold text-slate-700 sm:text-xs">
              ₹1,00,000
            </span>
          </div>

          <div className="min-w-0 border-l border-slate-200 pl-3">
            <span className="block leading-relaxed text-slate-400">
              Per Txn Limit
            </span>

            <span className="mt-0.5 block break-words font-semibold text-slate-700 sm:text-xs">
              ₹50,000
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletQuickActions;
