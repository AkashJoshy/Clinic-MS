
import React from "react";
import {
  Pencil,
  Users,
  Power,
  Flame,
} from "lucide-react";
import type { SubscriptionPlan } from "@/types/subscription";
import SubscriptionFeatureItem from "./subscription-feature-item.component";

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
  onToggleStatus: (plan: SubscriptionPlan) => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  onEdit,
  onToggleStatus,
}) => {
  const isPopular = plan.isPopular;
  const isActive = plan.status === "ACTIVE";

  const billingLabel =
    plan.billingCycle === "MONTHLY"
      ? "/ month"
      : plan.billingCycle === "QUARTERLY"
        ? "/ quarter"
        : plan.billingCycle === "YEARLY"
          ? "/ year"
          : "one-time";

  const includedFeatures = plan.features.filter(
    (feature) => feature.isIncluded,
  ).length;

  return (
    <article
      className={`relative flex h-full min-w-0 flex-col rounded-2xl p-4 transition-all duration-300 sm:p-5 lg:p-6 ${
        isPopular
          ? "border border-[#1dc465]/50 bg-gradient-to-b from-[#0f1f2e] via-[#0d1825] to-[#0a121c] shadow-xl shadow-[#1dc465]/10"
          : "border border-white/8 bg-[#0b131d]/90 shadow-lg hover:border-white/15 hover:shadow-xl"
      }`}
    >
      {/* Status and badges */}
      <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide sm:text-[11px] ${
              isActive
                ? "border-emerald-500/25 bg-emerald-500/10 text-[#1dc465]"
                : "border-gray-500/20 bg-gray-500/10 text-gray-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isActive ? "bg-[#1dc465]" : "bg-gray-500"
              }`}
            />
            {isActive ? "ACTIVE" : "INACTIVE"}
          </span>

          {plan.badgeText && (
            <span className="max-w-full truncate rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-[#8b9ab0] sm:text-[11px]">
              {plan.badgeText}
            </span>
          )}
        </div>

        {isPopular && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#1dc465] px-2.5 py-1 text-[10px] font-bold text-[#080d14] shadow-md shadow-[#1dc465]/20 sm:px-3 sm:text-[11px]">
            <Flame
              size={12}
              fill="#080d14"
              aria-hidden="true"
            />
            POPULAR
          </span>
        )}
      </div>

      <div className="min-w-0 space-y-1.5">
        <h3 className="break-words text-lg font-bold tracking-tight text-white sm:text-xl">
          {plan.name}
        </h3>

        {plan.tagline && (
          <p className="break-words text-xs font-medium tracking-wide text-[#1dc465]">
            {plan.tagline}
          </p>
        )}

        <p className="line-clamp-3 break-words pt-1 text-xs leading-relaxed text-[#8b9ab0] sm:line-clamp-2">
          {plan.description}
        </p>
      </div>

      <div className="my-4 grid min-w-0 grid-cols-1 gap-4 border-y border-white/8 py-4 sm:my-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-1">
            <span className="text-sm font-semibold text-gray-400">
              {plan.currency === "INR" ? "₹" : plan.currency}
            </span>

            <span className="break-all text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {plan.price.toLocaleString()}
            </span>

            <span className="text-xs font-normal text-[#8b9ab0]">
              {billingLabel}
            </span>
          </div>

          <p className="mt-1 text-[10px] leading-relaxed text-gray-500 sm:text-[11px]">
            Auto-renewed · Cancel anytime
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-1">
          <div className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs font-medium text-[#c9d5e4]">
            <Users
              size={13}
              className="shrink-0 text-[#1dc465]"
              aria-hidden="true"
            />
            <span className="tabular-nums">
              {plan.activeSubscribersCount}
            </span>
            <span>doctors</span>
          </div>

          <p className="text-[10px] text-gray-500">enrolled</p>
        </div>
      </div>

      <div className="mb-5 min-w-0 flex-1 space-y-2.5 sm:mb-6">
        <div className="flex min-w-0 items-center justify-between gap-2 text-xs font-semibold text-gray-300">
          <span>Included Features</span>
          <span className="shrink-0 text-[10px] text-[#8b9ab0] sm:text-[11px]">
            {includedFeatures} / {plan.features.length}
          </span>
        </div>

        <ul className="mt-2 min-w-0 space-y-2">
          {plan.features.map((feature) => (
            <SubscriptionFeatureItem
              key={feature.id}
              feature={feature}
            />
          ))}
        </ul>
      </div>

      <div className="mt-auto flex min-w-0 items-center gap-2 border-t border-white/8 pt-4">
        <button
          type="button"
          onClick={() => onToggleStatus(plan)}
          title={isActive ? "Deactivate plan" : "Activate plan"}
          aria-label={isActive ? "Deactivate plan" : "Activate plan"}
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
            isActive
              ? "border-white/10 text-gray-400 hover:border-amber-400/30 hover:bg-amber-400/5 hover:text-amber-400"
              : "border-[#1dc465]/30 text-[#1dc465] hover:bg-[#1dc465]/10"
          }`}
        >
          <Power size={15} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onEdit(plan)}
          className="flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 text-xs font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/10 sm:gap-2 sm:px-3"
        >
          <Pencil
            size={14}
            className="shrink-0 text-[#1dc465]"
            aria-hidden="true"
          />
          <span className="truncate">Edit Plan</span>
        </button>
      </div>
    </article>
  );
};

export default SubscriptionCard;