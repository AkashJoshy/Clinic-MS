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


export const WalletSummaryCards: React.FC<WalletSummaryCardsProps> = ({
  stats,
  wallet
}) => {
  const cards = [
    {
      id: "available",
      label: "Available Balance",
      value: formatCurrency(wallet.balance, wallet.currency),
      description: "Ready to withdraw or use",
      icon: Wallet,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-100",
      badge: "Instant Access",
      badgeColor: "bg-emerald-100/70 text-emerald-700",
    },
    {
      id: "pending",
      label: "Pending Settlement",
      // value: formatCurrency(stats.pendingSettlement, stats.currency),
      description: "Expected within 24-48 hrs",
      icon: Clock,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50 border-amber-100",
      badge: "In Escrow",
      badgeColor: "bg-amber-100/70 text-amber-700",
    },
    {
      id: "earnings",
      label: "Total Earnings",
      // value: formatCurrency(stats.totalEarnings, stats.currency),
      description: "Gross revenue recorded",
      icon: ArrowUpRight,
      iconColor: "text-[#1DC465]",
      bgColor: "bg-[#1DC465]/10 border-[#1DC465]/20",
      badge: `+${stats.earningsTrendPercent}% vs mo`,
      badgeColor: "bg-[#1DC465]/15 text-[#118042]",
      hasTrend: true,
    },
    {
      id: "spent",
      label: "Total Spent",
      // value: formatCurrency(stats.totalSpent, stats.currency),
      description: "Withdrawals & subscriptions",
      icon: ArrowDownRight,
      iconColor: "text-rose-600",
      bgColor: "bg-rose-50 border-rose-100",
      badge: "Outflow",
      badgeColor: "bg-rose-100/70 text-rose-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {card.label}
              </span>
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${card.bgColor}`}
              >
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>

            <div className="my-2.5">
              <span className="text-2xl font-bold tracking-tight text-[#0D1A27]">
                {card.value}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-500 truncate max-w-[130px]">
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
