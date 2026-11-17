import React from "react";
import { Trash2 } from "lucide-react";
import { BrandColorPicker } from "../../brand-color-picker.shared";
import { Field, Toggle } from "./settings-ui.component";
import {
  inputClass,
  billingLabels,
  num,
} from "../../../../constants/admin-settings.constant";
import type {
  SubscriptionPlan,
  BillingCycle,
} from "../../../../types/admin-settings";

export interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  currency: string;
  onUpdate: (id: string, patch: Partial<SubscriptionPlan>) => void;
  onRemove: (id: string) => void;
}

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  currency,
  onUpdate,
  onRemove,
}) => {
  return (
    <article
      className={`rounded-xl border bg-[#091420] overflow-hidden transition-opacity ${
        plan.enabled ? "border-white/10" : "border-white/5 opacity-70"
      }`}
    >
      <div className="h-1" style={{ backgroundColor: plan.color }} />

      <div className="p-4 sm:p-5 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="px-3 h-7 inline-flex items-center rounded-full text-xs font-semibold truncate max-w-[180px]"
              style={{
                color: plan.color,
                backgroundColor: `${plan.color}1f`,
                border: `1px solid ${plan.color}40`,
              }}
            >
              {plan.name || "Untitled"}
            </span>
            {plan.featured && (
              <span className="text-[11px] font-medium text-amber-300">
                Most popular
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline text-xs text-[#8b9ab0]">
              {plan.enabled ? "Active" : "Hidden"}
            </span>
            <Toggle
              checked={plan.enabled}
              onChange={(v) => onUpdate(plan.id, { enabled: v })}
              label={`${plan.name} plan active`}
            />
            <button
              type="button"
              onClick={() => onRemove(plan.id)}
              aria-label={`Remove ${plan.name} plan`}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#8b9ab0] hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Plan name">
            <input
              className={inputClass}
              value={plan.name}
              onChange={(e) => onUpdate(plan.id, { name: e.target.value })}
              placeholder="e.g. Pro"
            />
          </Field>
          <Field label={`Price (${currency})`}>
            <input
              type="number"
              min={0}
              className={inputClass}
              value={plan.price}
              onChange={(e) =>
                onUpdate(plan.id, {
                  price: num(e.target.value),
                })
              }
            />
          </Field>
          <Field label="Billing cycle">
            <select
              className={inputClass}
              value={plan.billingCycle}
              onChange={(e) =>
                onUpdate(plan.id, {
                  billingCycle: e.target.value as BillingCycle,
                })
              }
            >
              <option value="MONTHLY">Monthly</option>
              <option value="QUARTERLY">Quarterly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </Field>
          <Field label="Appointments / month" hint="Use 0 for unlimited.">
            <input
              type="number"
              min={0}
              className={inputClass}
              value={plan.maxAppointments}
              onChange={(e) =>
                onUpdate(plan.id, {
                  maxAppointments: num(e.target.value),
                })
              }
            />
          </Field>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div>
            <p className="text-[13px] font-medium text-[#dbe5f1] mb-2.5">
              Plan color
            </p>
            <BrandColorPicker
              value={plan.color}
              onChange={(color) => onUpdate(plan.id, { color })}
              label={`${plan.name} plan color`}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8b9ab0]">
              Highlight as most popular
            </span>
            <Toggle
              checked={plan.featured}
              onChange={(v) => onUpdate(plan.id, { featured: v })}
              label={`Highlight ${plan.name} as most popular`}
            />
          </div>
        </div>

        <p className="text-xs text-[#6b7c93]">
          Doctors pay{" "}
          <span className="text-white font-medium">
            {currency} {plan.price.toLocaleString("en-IN")}
          </span>{" "}
          per {billingLabels[plan.billingCycle]} for{" "}
          {plan.maxAppointments === 0
            ? "unlimited appointments"
            : `up to ${plan.maxAppointments} appointments a month`}
          .
        </p>
      </div>
    </article>
  );
};

export default SubscriptionPlanCard;
