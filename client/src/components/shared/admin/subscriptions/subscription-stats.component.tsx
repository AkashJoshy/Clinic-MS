import React from "react";
import { Layers, Users, IndianRupee, ShieldCheck } from "lucide-react";
import type { SubscriptionStats } from "@/types/subscription";

interface SubscriptionStatsProps {
  stats: SubscriptionStats;
}

export const SubscriptionStatsSection: React.FC<SubscriptionStatsProps> = ({ stats }) => {
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
      color: "text-[#1dc465]",
      bg: "bg-[#1dc465]/10 border-[#1dc465]/20",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#0c141e]/80 border border-white/8 backdrop-blur-sm hover:border-white/15 transition-all flex items-center justify-between shadow-sm"
          >
            <div>
              <p className="text-xs font-medium text-[#8b9ab0] uppercase tracking-wider">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">
                {item.value}
              </h3>
              <p className="text-[11px] text-[#6b7c93] mt-0.5">{item.subtitle}</p>
            </div>
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.bg} ${item.color}`}
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
