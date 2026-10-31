import React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { SubscriptionPlanFeaturesListProps } from "@/types/doctor-subscription";

export const SubscriptionPlanFeaturesList: React.FC<
  SubscriptionPlanFeaturesListProps
> = ({ features, planName }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c141d]/60 p-5 lg:p-6">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#1dc465]" />
          <h3 className="text-sm font-bold tracking-tight text-white uppercase">
            Included in your {planName}
          </h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#1dc465]">
          {features.filter((f) => f.isIncluded).length} Features Active
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.015] p-3 transition-colors hover:bg-white/[0.03]"
          >
            <CheckCircle2
              size={15}
              className="mt-0.5 shrink-0 text-[#1dc465]"
            />
            <span className="text-xs font-medium text-gray-200">
              {feature.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
