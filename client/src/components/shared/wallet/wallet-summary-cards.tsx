import React from "react";
import {
  Wallet,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";
import { formatCurrency } from "@/helpers/wallet.helper";
import type { WalletSummaryCardsProps } from "@/types/wallet";

interface Props extends WalletSummaryCardsProps {
  isDark?: boolean;
}

export const WalletSummaryCards: React.FC<Props> = ({
  stats,
  wallet,
  isDark = false,
}) => {
  const cards = [
    {
      id: "available",
      label: "Available Balance",
      value: formatCurrency(wallet.balance, wallet.currency),
      description: "Ready to withdraw or use",
      icon: Wallet,
      iconColor: isDark ? "text-emerald-400" : "text-emerald-600",
      bgColor: isDark
        ? "bg-emerald-500/10 border-emerald-500/20"
        : "bg-emerald-50 border-emerald-100",
      badge: "Instant Access",
      badgeColor: isDark
        ? "bg-emerald-500/15 text-emerald-400"
        : "bg-emerald-100/70 text-emerald-700",
    },
    {
      id: "pending",
      label: "Pending Settlement",
      // value: formatCurrency(stats.pendingSettlement, stats.currency),
      description: "Expected within 24-48 hrs",
      icon: Clock,
      iconColor: isDark ? "text-amber-400" : "text-amber-600",
      bgColor: isDark
        ? "bg-amber-500/10 border-amber-500/20"
        : "bg-amber-50 border-amber-100",
      badge: "In Escrow",
      badgeColor: isDark
        ? "bg-amber-500/15 text-amber-400"
        : "bg-amber-100/70 text-amber-700",
    },
    {
      id: "earnings",
      label: "Total Earnings",
      // value: formatCurrency(stats.totalEarnings, stats.currency),
      description: "Gross revenue recorded",
      icon: ArrowUpRight,
      iconColor: "text-primary",
      bgColor: "bg-primary/10 border-primary/20",
      badge: `+${stats.earningsTrendPercent}% vs mo`,
      badgeColor: "bg-primary/15 text-primary",
      hasTrend: true,
    },
    {
      id: "spent",
      label: "Total Spent",
      // value: formatCurrency(stats.totalSpent, stats.currency),
      description: "Withdrawals & subscriptions",
      icon: ArrowDownRight,
      iconColor: isDark ? "text-rose-400" : "text-rose-600",
      bgColor: isDark
        ? "bg-rose-500/10 border-rose-500/20"
        : "bg-rose-50 border-rose-100",
      badge: "Outflow",
      badgeColor: isDark
        ? "bg-rose-500/15 text-rose-400"
        : "bg-rose-100/70 text-rose-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className={`rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
              isDark
                ? "border-white/10 bg-[#0D1A27]"
                : "border-slate-200/80 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-xs font-medium uppercase tracking-wider ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {card.label}
              </span>

              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${card.bgColor}`}
              >
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>

            <div className="my-2.5">
              <span
                className={`text-2xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-[#0D1A27]"
                }`}
              >
                {card.value}
              </span>
            </div>

            <div
              className={`flex items-center justify-between text-xs pt-2 border-t ${
                isDark ? "border-white/10" : "border-slate-100"
              }`}
            >
              <span
                className={`truncate max-w-[130px] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {card.description}
              </span>

              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${card.badgeColor}`}
              >
                {card.hasTrend && <TrendingUp className="w-3 h-3" />}
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
