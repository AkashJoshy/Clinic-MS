import React from "react";
import {
  Check,
  X,
  Flame,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import type { SubscriptionPlanCardProps } from "@/types/doctor-subscription";
import {
  BILLING_DESCRIPTIONS,
  BILLING_LABELS,
} from "@/constants/doctor-subscription.constant";

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  billingCycle,
  isCurrent,
  onSelectPlan,
  isDark,
}) => {
  const isPopular = Boolean(plan.isPopular);
  const isLifetime = plan.billingCycle === "LIFETIME";

  const hasValidPrice =
    typeof plan.price === "number" &&
    Number.isFinite(plan.price) &&
    plan.price >= 0;

  const formattedPrice = hasValidPrice
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: plan.currency || "INR",
        maximumFractionDigits: 2,
      }).format(plan.price)
    : "Price unavailable";

  const billingLabel = BILLING_LABELS[plan.billingCycle];
  const billingDescription = BILLING_DESCRIPTIONS[plan.billingCycle];

  const badgeLabel =
    plan.badgeText?.trim() ||
    (isLifetime
      ? "Lifetime"
      : plan.billingCycle === "YEARLY"
        ? "Yearly"
        : plan.billingCycle === "QUARTERLY"
          ? "Quarterly"
          : "Monthly");

  const canSelectPlan = hasValidPrice && !isCurrent;

  const cardClass = isCurrent
    ? isDark
      ? "border-primary/60 bg-gradient-to-b from-primary/10 via-[#0c1920] to-[#0a111a] shadow-lg shadow-primary/[0.07]"
      : "border-primary/50 bg-gradient-to-b from-primary/[0.06] via-white to-slate-50 shadow-lg shadow-primary/[0.05]"
    : isPopular
      ? isDark
        ? "border-primary/35 bg-gradient-to-b from-[#101f29] via-[#0c1722] to-[#0a111a] shadow-lg shadow-black/10 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/[0.06]"
        : "border-primary/30 bg-gradient-to-b from-primary/[0.035] via-white to-slate-50 shadow-lg shadow-slate-200/50 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl"
      : isDark
        ? "border-white/[0.09] bg-gradient-to-b from-[#0e1721] to-[#0a111a] hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/20"
        : "border-slate-200 bg-gradient-to-b from-white to-slate-50 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50";

  const primaryTextClass = isDark ? "text-white" : "text-slate-900";

  const secondaryTextClass = isDark ? "text-[#91a0b3]" : "text-slate-600";

  const mutedTextClass = isDark ? "text-[#8291a5]" : "text-slate-500";

  const pricingBoxClass = isDark
    ? "border-white/[0.065] bg-black/[0.12]"
    : "border-slate-200 bg-slate-50";

  const pricingDividerClass = isDark
    ? "border-white/[0.07]"
    : "border-slate-200";

  const includedHeadingClass = isDark ? "text-[#b6c2d1]" : "text-slate-700";

  const includedFeatureClass = isDark ? "text-[#d3dbe5]" : "text-slate-700";

  const excludedFeatureClass = isDark
    ? "text-[#68768a] decoration-[#68768a]/60"
    : "text-slate-400 decoration-slate-400/60";

  const secondaryButtonClass = isDark
    ? "border-white/[0.13] bg-white/[0.035] text-[#e2e8f0] hover:border-primary/35 hover:bg-primary/[0.06]"
    : "border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:bg-primary/[0.04]";

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${cardClass}`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
          isCurrent || isPopular
            ? "bg-gradient-to-r from-transparent via-primary/70 to-transparent"
            : isDark
              ? "bg-gradient-to-r from-transparent via-white/15 to-transparent"
              : "bg-gradient-to-r from-transparent via-slate-300 to-transparent"
        }`}
      />

      {(isCurrent || isPopular) && (
        <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-primary/[0.045] blur-3xl transition-opacity duration-300 group-hover:bg-primary/[0.08]" />
      )}

      <div className="relative flex h-full flex-col p-5 sm:p-6">
        <div className="mb-5 flex min-h-7 items-center justify-between gap-2">
          {isCurrent ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-wide text-primary">
              <Sparkles size={12} />
              YOUR CURRENT PLAN
            </span>
          ) : isPopular ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-wide text-primary">
              <Flame size={12} fill="currentColor" />
              MOST POPULAR
            </span>
          ) : (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wide ${
                isDark
                  ? "border-white/[0.09] bg-white/[0.035] text-[#9ba9bb]"
                  : "border-slate-200 bg-slate-100 text-slate-600"
              }`}
            >
              {badgeLabel}
            </span>
          )}

          {plan.badgeText?.trim() && !isCurrent && !isPopular && (
            <span
              className={`max-w-24 truncate text-[10px] font-medium ${mutedTextClass}`}
            >
              {plan.badgeText}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h4
            className={`text-xl font-bold tracking-tight transition-colors ${
              isDark
                ? "text-white group-hover:text-white"
                : "text-slate-900 group-hover:text-slate-950"
            }`}
          >
            {plan.name}
          </h4>

          <p className={`min-h-[40px] text-xs leading-5 ${secondaryTextClass}`}>
            {plan.tagline ||
              plan.description ||
              "Everything you need to manage your practice."}
          </p>
        </div>

        <div className={`my-5 rounded-xl border p-4 ${pricingBoxClass}`}>
          <p
            className={`mb-2 text-[10px] font-semibold tracking-[0.13em] uppercase ${mutedTextClass}`}
          >
            Plan pricing
          </p>

          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span
              className={`text-3xl font-bold tracking-tight ${
                hasValidPrice ? primaryTextClass : mutedTextClass
              }`}
            >
              {formattedPrice}
            </span>

            {hasValidPrice && (
              <span className={`text-xs font-medium ${mutedTextClass}`}>
                {billingLabel}
              </span>
            )}
          </div>

          <div
            className={`mt-3 flex items-center gap-2 border-t pt-3 ${pricingDividerClass}`}
          >
            <ShieldCheck size={13} className="shrink-0 text-primary" />
            <span className={`text-[11px] ${secondaryTextClass}`}>
              {billingDescription}
            </span>
          </div>
        </div>

        <div className="mb-6 flex-1">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h5
              className={`text-[11px] font-bold tracking-[0.12em] uppercase ${includedHeadingClass}`}
            >
              What's included
            </h5>

            {plan.features?.length > 0 && (
              <span
                className={`rounded-md border px-2 py-0.5 text-[10px] tabular-nums ${
                  isDark
                    ? "border-white/[0.07] bg-white/[0.025] text-[#8291a5]"
                    : "border-slate-200 bg-slate-100 text-slate-500"
                }`}
              >
                {plan.features.filter((feature) => feature.isIncluded).length}
                {" / "}
                {plan.features.length}
              </span>
            )}
          </div>

          {plan.features?.length ? (
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature.id} className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full ${
                      feature.isIncluded
                        ? "bg-primary/10 text-primary"
                        : isDark
                          ? "bg-white/[0.045] text-[#657286]"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {feature.isIncluded ? (
                      <Check size={11} strokeWidth={2.8} />
                    ) : (
                      <X size={10} strokeWidth={2.2} />
                    )}
                  </span>

                  <span
                    className={`text-xs leading-[1.65] ${
                      feature.isIncluded
                        ? includedFeatureClass
                        : `${excludedFeatureClass} line-through`
                    }`}
                  >
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className={`rounded-lg border border-dashed px-3 py-4 text-center text-xs ${
                isDark
                  ? "border-white/[0.09] text-[#8291a5]"
                  : "border-slate-300 text-slate-500"
              }`}
            >
              Plan features will be listed here.
            </p>
          )}
        </div>

        <div className={`mt-auto border-t pt-4 ${pricingDividerClass}`}>
          {isCurrent ? (
            <button
              type="button"
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/[0.07] px-4 py-3 text-xs font-semibold text-primary"
            >
              <Check size={14} />
              Current Active Plan
            </button>
          ) : (
            <button
              type="button"
              disabled={!canSelectPlan}
              onClick={() => onSelectPlan(plan)}
              className={`group/button flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-200 ${
                !canSelectPlan
                  ? isDark
                    ? "cursor-not-allowed border border-white/[0.08] bg-white/[0.025] text-[#68768a]"
                    : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
                  : isPopular
                    ? "cursor-pointer bg-primary text-primary-foreground shadow-md shadow-primary/10 hover:bg-primary/90 active:scale-[0.99]"
                    : `cursor-pointer border active:scale-[0.99] ${secondaryButtonClass}`
              }`}
            >
              {!hasValidPrice ? (
                "Price unavailable"
              ) : (
                <>
                  {`Choose ${plan.name}`}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/button:translate-x-0.5"
                  />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
