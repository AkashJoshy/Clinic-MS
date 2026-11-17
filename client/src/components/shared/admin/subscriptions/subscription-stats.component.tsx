import React from "react";
import { Layers, Users, IndianRupee, ShieldCheck } from "lucide-react";
import type { SubscriptionStats } from "@/types/subscription";

interface SubscriptionStatsProps {
  stats: SubscriptionStats;
  isDark: boolean;
}

export const SubscriptionStatsSection: React.FC<SubscriptionStatsProps> = ({
  stats,
  isDark,
}) => {
  const theme = {
    card: isDark
      ? "bg-[#0c141e]/80 border-white/8 hover:border-white/15"
      : "bg-white border-gray-200 hover:border-gray-300",
    title: isDark ? "text-[#8b9ab0]" : "text-gray-500",
    value: isDark ? "text-white" : "text-gray-900",
    subtitle: isDark ? "text-[#6b7c93]" : "text-gray-500",
  };

  const statItems = [
    {
      title: "Active Tiers",
      value: `${stats.activePlans} / ${stats.totalPlans}`,
      subtitle: "Plans currently published",
      icon: Layers,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Enrolled Doctors",
      value: stats.totalSubscribers.toLocaleString(),
      subtitle: "Active physician subscribers",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Monthly Revenue (MRR)",
      value: `₹${stats.estimatedMonthlyRevenue.toLocaleString()}`,
      subtitle: "Estimated active revenue",
      icon: IndianRupee,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "System Compliance",
      value: "100%",
      subtitle: "NABH / Telehealth compliant",
      icon: ShieldCheck,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, idx) => {
        const Icon = item.icon;

        return (
          <div
            key={idx}
            className={`flex items-center justify-between rounded-2xl border p-4 shadow-sm backdrop-blur-sm transition-all ${theme.card}`}
          >
            <div>
              <p
                className={`text-xs font-medium uppercase tracking-wider ${theme.title}`}
              >
                {item.title}
              </p>

              <h3
                className={`mt-1 text-2xl font-bold tracking-tight ${theme.value}`}
              >
                {item.value}
              </h3>

              <p className={`mt-0.5 text-[11px] ${theme.subtitle}`}>
                {item.subtitle}
              </p>
            </div>

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.bg} ${item.color}`}
            >
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionStatsSection;
