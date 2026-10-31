import React from "react";
import { Layers, AlertCircle, SearchX } from "lucide-react";

import type { SubscriptionPlansGridProps } from "@/types/doctor-subscription";
import { SubscriptionPlanCard } from "./subscription-plan-card.component";
import {
  BILLING_CYCLE_LABELS,
  BILLING_CYCLES,
} from "@/constants/doctor-subscription.constant";

export const SubscriptionPlansGrid: React.FC<SubscriptionPlansGridProps> = ({
  plans,
  currentSubscription,
  billingCycle,
  onBillingCycleChange,
  onSelectPlan,
}) => {
  const availablePlans = (plans ?? []).filter(
    (plan) => plan.billingCycle === billingCycle,
  );

  return (
    <div id="all-available-plans" className="space-y-6 pt-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers size={17} className="text-[#1dc465]" />

            <h3 className="text-base font-bold tracking-tight text-white uppercase">
              Explore Practice Tiers
            </h3>
          </div>

          <p className="text-xs text-[#8b9ab0]">
            Choose a plan that fits your practice and booking requirements.
          </p>
        </div>

        <div className="inline-flex flex-wrap items-center self-start rounded-xl border border-white/10 bg-[#0d1520] p-1 sm:self-auto">
          {BILLING_CYCLES.map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => onBillingCycleChange(cycle)}
              aria-pressed={billingCycle === cycle}
              className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                billingCycle === cycle
                  ? "bg-[#1dc465] text-[#080d14] shadow-sm"
                  : "text-[#8b9ab0] hover:text-white"
              }`}
            >
              {BILLING_CYCLE_LABELS[cycle]}
            </button>
          ))}
        </div>
      </div>

      {availablePlans.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0c141d]/60 px-5 py-12 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <SearchX size={22} className="text-[#8b9ab0]" />
          </div>

          <h4 className="text-sm font-bold text-white">
            No {BILLING_CYCLE_LABELS[billingCycle]} Plans Available
          </h4>

          <p className="mt-2 max-w-md text-xs leading-5 text-[#8b9ab0]">
            There are currently no active plans for this billing period. Please
            check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {availablePlans.map((plan) => (
            <SubscriptionPlanCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              isCurrent={plan.id === currentSubscription?.planId}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>
      )}

      {!currentSubscription && availablePlans.length > 0 && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-amber-400" />

          <p className="text-xs leading-5 text-[#8b9ab0]">
            You don't currently have an active subscription. Choose a plan above
            to get started with your practice subscription.
          </p>
        </div>
      )}
    </div>
  );
};
