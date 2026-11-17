
import React from "react";
import { Pencil, Users, Power, Flame } from "lucide-react";
import type { SubscriptionPlan } from "@/types/subscription";
import SubscriptionFeatureItem from "./subscription-feature-item.component";

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
  onToggleStatus: (plan: SubscriptionPlan) => void;
  isDark: boolean;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  onEdit,
  onToggleStatus,
  isDark,
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

  const theme = {
    card: isPopular
      ? isDark
        ? "border-primary/50 bg-gradient-to-b from-primary/10 via-[#0d1825] to-[#0a121c] shadow-xl shadow-primary/10"
        : "border-primary/50 bg-gradient-to-b from-primary/5 via-white to-white shadow-xl shadow-primary/10"
      : isDark
        ? "border-white/8 bg-[#0b131d]/90 shadow-lg hover:border-white/15 hover:shadow-xl"
        : "border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md",
    heading: isDark ? "text-white" : "text-gray-900",
    description: isDark ? "text-[#8b9ab0]" : "text-gray-500",
    muted: isDark ? "text-gray-400" : "text-gray-600",
    subtle: isDark ? "text-gray-500" : "text-gray-500",
    badge: isDark
      ? "border-white/10 bg-white/5 text-[#8b9ab0]"
      : "border-gray-200 bg-gray-100 text-gray-600",
    divider: isDark ? "border-white/8" : "border-gray-200",
    subscriber: isDark
      ? "bg-white/5 text-[#c9d5e4]"
      : "bg-gray-100 text-gray-700",
    featureHeading: isDark ? "text-gray-300" : "text-gray-700",
    actionButton: isDark
      ? "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
      : "border-gray-200 bg-gray-50 text-gray-800 hover:border-gray-300 hover:bg-gray-100",
    inactiveButton: isDark
      ? "border-white/10 text-gray-400 hover:border-amber-400/30 hover:bg-amber-400/5 hover:text-amber-400"
      : "border-gray-200 text-gray-500 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600",
  };

  return (
    <article
      className={`relative flex h-full min-w-0 flex-col rounded-2xl border p-4 transition-all duration-300 sm:p-5 lg:p-6 ${theme.card}`}
    >
      {/* Status and badges */}
      <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide sm:text-[11px] ${
              isActive
                ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
                : isDark
                  ? "border-gray-500/20 bg-gray-500/10 text-gray-400"
                  : "border-gray-200 bg-gray-100 text-gray-500"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isActive ? "bg-emerald-400" : "bg-gray-500"
              }`}
            />
            {isActive ? "ACTIVE" : "INACTIVE"}
          </span>

          {plan.badgeText && (
            <span
              className={`max-w-full truncate rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:text-[11px] ${theme.badge}`}
            >
              {plan.badgeText}
            </span>
          )}
        </div>

        {isPopular && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-md shadow-primary/20 sm:px-3 sm:text-[11px]">
            <Flame
              size={12}
              fill="currentColor"
              aria-hidden="true"
            />
            POPULAR
          </span>
        )}
      </div>

      <div className="min-w-0 space-y-1.5">
        <h3
          className={`break-words text-lg font-bold tracking-tight sm:text-xl ${theme.heading}`}
        >
          {plan.name}
        </h3>

        {plan.tagline && (
          <p className="break-words text-xs font-medium tracking-wide text-primary">
            {plan.tagline}
          </p>
        )}

        <p
          className={`line-clamp-3 break-words pt-1 text-xs leading-relaxed sm:line-clamp-2 ${theme.description}`}
        >
          {plan.description}
        </p>
      </div>

      <div
        className={`my-4 grid min-w-0 grid-cols-1 gap-4 border-y py-4 sm:my-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center ${theme.divider}`}
      >
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-1">
            <span className={`text-sm font-semibold ${theme.muted}`}>
              {plan.currency === "INR" ? "₹" : plan.currency}
            </span>

            <span
              className={`break-all text-2xl font-extrabold tracking-tight sm:text-3xl ${theme.heading}`}
            >
              {plan.price.toLocaleString()}
            </span>

            <span className={`text-xs font-normal ${theme.description}`}>
              {billingLabel}
            </span>
          </div>

          <p className={`mt-1 text-[10px] leading-relaxed sm:text-[11px] ${theme.subtle}`}>
            Auto-renewed · Cancel anytime
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-1">
          <div
            className={`inline-flex max-w-full items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${theme.subscriber}`}
          >
            <Users
              size={13}
              className="shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="tabular-nums">
              {plan.activeSubscribersCount}
            </span>
            <span>doctors</span>
          </div>

          <p className={`text-[10px] ${theme.subtle}`}>enrolled</p>
        </div>
      </div>

      <div className="mb-5 min-w-0 flex-1 space-y-2.5 sm:mb-6">
        <div
          className={`flex min-w-0 items-center justify-between gap-2 text-xs font-semibold ${theme.featureHeading}`}
        >
          <span>Included Features</span>
          <span className={`shrink-0 text-[10px] sm:text-[11px] ${theme.description}`}>
            {includedFeatures} / {plan.features.length}
          </span>
        </div>

        <ul className="mt-2 min-w-0 space-y-2">
          {plan.features.map((feature) => (
            <SubscriptionFeatureItem
              key={feature.id}
              feature={feature}
              isDark={isDark}
            />
          ))}
        </ul>
      </div>

      <div
        className={`mt-auto flex min-w-0 items-center gap-2 border-t pt-4 ${theme.divider}`}
      >
        <button
          type="button"
          onClick={() => onToggleStatus(plan)}
          title={isActive ? "Deactivate plan" : "Activate plan"}
          aria-label={isActive ? "Deactivate plan" : "Activate plan"}
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
            isActive
              ? theme.inactiveButton
              : "border-primary/30 text-primary hover:bg-primary/10"
          }`}
        >
          <Power size={15} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onEdit(plan)}
          className={`flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border px-2 text-xs font-semibold transition-colors sm:gap-2 sm:px-3 ${theme.actionButton}`}
        >
          <Pencil
            size={14}
            className="shrink-0 text-primary"
            aria-hidden="true"
          />
          <span className="truncate">Edit Plan</span>
        </button>
      </div>
    </article>
  );
};

export default SubscriptionCard;
