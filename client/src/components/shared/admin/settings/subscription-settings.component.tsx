import React from "react";

import { Field, SettingRow } from "./settings-ui.component";

import { inputClass } from "../../../../constants/admin-settings.constant";

import type { BusinessSettings } from "../../../../types/admin-settings";

export interface SubscriptionSettingsProps {
  trialEnabled: boolean;
  autoRenewal: boolean;
  prorateUpgrades: boolean;
  trialDays: number;
  gracePeriodDays: number;
  isDark: boolean;
  onUpdateBusiness: <K extends keyof BusinessSettings>(
    key: K,
    value: BusinessSettings[K],
  ) => void;
}

export const SubscriptionSettings: React.FC<
  SubscriptionSettingsProps
> = ({
  trialEnabled,
  autoRenewal,
  prorateUpgrades,
  trialDays,
  gracePeriodDays,
  onUpdateBusiness,
  isDark,
}) => {
  const themedInputClass = `${inputClass} ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  return (
    <div className="space-y-8">
      {/* Billing rules */}
      <div className="pt-1">
        <h4
          className={`text-sm font-semibold mb-1 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Billing rules
        </h4>

        <p
          className={`text-xs mb-5 ${
            isDark ? "text-[#8b9ab0]" : "text-gray-500"
          }`}
        >
          Apply to every plan unless a doctor-specific contract overrides them.
        </p>

        <SettingRow
          title="Free trial"
          description="Let new doctors try a plan before they are charged."
          checked={trialEnabled}
          onChange={(v) => onUpdateBusiness("trialEnabled", v)}
          isDark={isDark}
        />

        <SettingRow
          title="Auto-renewal"
          description="Renew subscriptions automatically at the end of each billing cycle."
          checked={autoRenewal}
          onChange={(v) => onUpdateBusiness("autoRenewal", v)}
          isDark={isDark}
        />

        <SettingRow
          title="Prorate plan changes"
          description="Credit unused time when a doctor upgrades or downgrades mid-cycle."
          checked={prorateUpgrades}
          onChange={(v) => onUpdateBusiness("prorateUpgrades", v)}
          isDark={isDark}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Field label="Trial length" isDark={isDark}>
            <select
              className={`${themedInputClass} disabled:opacity-50`}
              disabled={!trialEnabled}
              value={trialDays}
              onChange={(e) =>
                onUpdateBusiness("trialDays", Number(e.target.value))
              }
            >
              {[7, 14, 21, 30].map((days) => (
                <option key={days} value={days}>
                  {days} days
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Grace period after failed payment"
            hint="Access continues for this long while payment is retried."
            isDark={isDark}
          >
            <select
              className={themedInputClass}
              value={gracePeriodDays}
              onChange={(e) =>
                onUpdateBusiness("gracePeriodDays", Number(e.target.value))
              }
            >
              {[0, 3, 7, 14].map((days) => (
                <option key={days} value={days}>
                  {days === 0 ? "No grace period" : `${days} days`}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettings;