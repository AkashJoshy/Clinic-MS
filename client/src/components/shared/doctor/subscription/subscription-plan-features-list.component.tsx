import React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { SubscriptionPlanFeaturesListProps } from "@/types/doctor-subscription";

export const SubscriptionPlanFeaturesList: React.FC<
  SubscriptionPlanFeaturesListProps
> = ({ features, planName, isDark }) => {
  const containerClass = isDark
    ? "border-white/10 bg-[#0c141d]/60"
    : "border-slate-200 bg-white";

  const headingClass = isDark ? "text-white" : "text-slate-900";

  const featureCardClass = isDark
    ? "border-white/5 bg-white/[0.015] hover:bg-white/[0.04]"
    : "border-slate-200 bg-slate-50 hover:bg-slate-100";

  const featureTextClass = isDark ? "text-gray-200" : "text-slate-700";

  const dividerClass = isDark ? "border-white/10" : "border-slate-200";

  return (
    <div
      className={`rounded-2xl border p-5 lg:p-6 ${containerClass}`}
    >
      <div
        className={`mb-4 flex items-center justify-between border-b pb-3 ${dividerClass}`}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary" />

          <h3
            className={`text-sm font-bold tracking-tight uppercase ${headingClass}`}
          >
            Included in your {planName}
          </h3>
        </div>

        <span className="rounded-full border border-primary-500/20 bg-primary-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
          {features.filter((f) => f.isIncluded).length} Features Active
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`flex items-start gap-2.5 rounded-xl border p-3 transition-colors ${featureCardClass}`}
          >
            <CheckCircle2
              size={15}
              className="mt-0.5 shrink-0 text-primary"
            />

            <span
              className={`text-xs font-medium ${featureTextClass}`}
            >
              {feature.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};