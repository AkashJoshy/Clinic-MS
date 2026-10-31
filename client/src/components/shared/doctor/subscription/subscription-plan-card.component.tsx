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

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
        isCurrent
          ? "border-[#1dc465]/60 bg-gradient-to-b from-[#102720] via-[#0c1920] to-[#0a111a] shadow-lg shadow-[#1dc465]/[0.07]"
          : isPopular
            ? "border-[#1dc465]/35 bg-gradient-to-b from-[#101f29] via-[#0c1722] to-[#0a111a] shadow-lg shadow-black/10 hover:-translate-y-1 hover:border-[#1dc465]/60 hover:shadow-xl hover:shadow-[#1dc465]/[0.06]"
            : "border-white/[0.09] bg-gradient-to-b from-[#0e1721] to-[#0a111a] hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/20"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
          isCurrent || isPopular
            ? "bg-gradient-to-r from-transparent via-[#1dc465]/70 to-transparent"
            : "bg-gradient-to-r from-transparent via-white/15 to-transparent"
        }`}
      />

      {(isCurrent || isPopular) && (
        <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-[#1dc465]/[0.045] blur-3xl transition-opacity duration-300 group-hover:bg-[#1dc465]/[0.08]" />
      )}

      <div className="relative flex h-full flex-col p-5 sm:p-6">
        <div className="mb-5 flex min-h-7 items-center justify-between gap-2">
          {isCurrent ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1dc465]/25 bg-[#1dc465]/10 px-3 py-1 text-[10px] font-bold tracking-wide text-[#5ee69a]">
              <Sparkles size={12} />
              YOUR CURRENT PLAN
            </span>
          ) : isPopular ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1dc465]/25 bg-[#1dc465]/10 px-3 py-1 text-[10px] font-bold tracking-wide text-[#5ee69a]">
              <Flame size={12} fill="currentColor" />
              MOST POPULAR
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1 text-[10px] font-semibold tracking-wide text-[#9ba9bb]">
              {badgeLabel}
            </span>
          )}

          {plan.badgeText?.trim() && !isCurrent && !isPopular && (
            <span className="max-w-24 truncate text-[10px] font-medium text-[#8291a5]">
              {plan.badgeText}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-white">
            {plan.name}
          </h4>

          <p className="min-h-[40px] text-xs leading-5 text-[#91a0b3]">
            {plan.tagline ||
              plan.description ||
              "Everything you need to manage your practice."}
          </p>
        </div>

        <div className="my-5 rounded-xl border border-white/[0.065] bg-black/[0.12] p-4">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.13em] text-[#8291a5] uppercase">
            Plan pricing
          </p>

          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span
              className={`text-3xl font-bold tracking-tight ${
                hasValidPrice ? "text-white" : "text-[#8291a5]"
              }`}
            >
              {formattedPrice}
            </span>

            {hasValidPrice && (
              <span className="text-xs font-medium text-[#8291a5]">
                {billingLabel}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-white/[0.07] pt-3">
            <ShieldCheck size={13} className="shrink-0 text-[#1dc465]" />
            <span className="text-[11px] text-[#91a0b3]">
              {billingDescription}
            </span>
          </div>
        </div>

        <div className="mb-6 flex-1">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h5 className="text-[11px] font-bold tracking-[0.12em] text-[#b6c2d1] uppercase">
              What's included
            </h5>

            {plan.features?.length > 0 && (
              <span className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-0.5 text-[10px] tabular-nums text-[#8291a5]">
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
                        ? "bg-[#1dc465]/10 text-[#45d987]"
                        : "bg-white/[0.045] text-[#657286]"
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
                        ? "text-[#d3dbe5]"
                        : "text-[#68768a] line-through decoration-[#68768a]/60"
                    }`}
                  >
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-lg border border-dashed border-white/[0.09] px-3 py-4 text-center text-xs text-[#8291a5]">
              Plan features will be listed here.
            </p>
          )}
        </div>

        <div className="mt-auto border-t border-white/[0.07] pt-4">
          {isCurrent ? (
            <button
              type="button"
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#1dc465]/20 bg-[#1dc465]/[0.07] px-4 py-3 text-xs font-semibold text-[#75dba0]"
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
                  ? "cursor-not-allowed border border-white/[0.08] bg-white/[0.025] text-[#68768a]"
                  : isPopular
                    ? "cursor-pointer bg-[#1dc465] text-[#07120b] shadow-md shadow-[#1dc465]/10 hover:bg-[#2cdb77] active:scale-[0.99]"
                    : "cursor-pointer border border-white/[0.13] bg-white/[0.035] text-[#e2e8f0] hover:border-[#1dc465]/35 hover:bg-[#1dc465]/[0.06] active:scale-[0.99]"
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
