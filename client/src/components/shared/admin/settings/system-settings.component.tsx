import React from "react";
import { Mail, CreditCard, Database } from "lucide-react";

import {
  Field,
  SettingRow,
  Note,
  StatusPill,
  Toggle,
} from "./settings-ui.component";

import { inputClass } from "../../../../constants/admin-settings.constant";

import type {
  SystemSettings,
  SettingsKey,
} from "../../../../types/admin-settings";

export interface SystemSettingsSectionProps {
  sectionKey: SettingsKey;
  system: SystemSettings;
  isDark: boolean;
  updateSystem: <K extends keyof SystemSettings>(
    key: K,
    value: SystemSettings[K],
  ) => void;
}

export const SystemSettingsSection: React.FC<
  SystemSettingsSectionProps
> = ({
  sectionKey,
  system,
  updateSystem,
  isDark,
}) => {
  const cardClass = isDark
    ? "border-white/8 bg-[#091420]"
    : "border-gray-200 bg-white";

  const titleClass = isDark ? "text-white" : "text-gray-900";

  const descriptionClass = isDark
    ? "text-[#8b9ab0]"
    : "text-gray-500";

  const themedInputClass = `${inputClass} ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  switch (sectionKey) {
    case "INTEGRATIONS":
      return (
        <>
          <div className="space-y-3">
            {[
              {
                title: "Email service",
                description: "Email delivery provider",
                checked: system.emailIntegration,
                onChange: (v: boolean) =>
                  updateSystem("emailIntegration", v),
                icon: Mail,
              },
              {
                title: "Payment gateway",
                description: "Razorpay payment integration",
                checked: system.paymentIntegration,
                onChange: (v: boolean) =>
                  updateSystem("paymentIntegration", v),
                icon: CreditCard,
              },
              {
                title: "Cloud storage",
                description: "Document storage integration",
                checked: system.cloudStorageIntegration,
                onChange: (v: boolean) =>
                  updateSystem("cloudStorageIntegration", v),
                icon: Database,
              },
            ].map((integration) => {
              const IntegrationIcon = integration.icon;

              return (
                <div
                  key={integration.title}
                  className={`flex items-center gap-3.5 p-4 rounded-xl border ${cardClass}`}
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#1dc465]/10 flex items-center justify-center">
                    <IntegrationIcon
                      size={18}
                      className="text-[#1dc465]"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${titleClass}`}>
                      {integration.title}
                    </p>

                    <p className={`text-xs mt-0.5 ${descriptionClass}`}>
                      {integration.description}
                    </p>
                  </div>

                  <Toggle
                    checked={integration.checked}
                    onChange={integration.onChange}
                    label={integration.title}
                    isDark={isDark}
                  />
                </div>
              );
            })}
          </div>

          <Note isDark={isDark}>
            These toggles are preferences only. Manage credentials,
            connectivity and health checks separately.
          </Note>
        </>
      );

    case "BACKUP":
      return (
        <>
          <SettingRow
            title="Automatic backups"
            description="Run backups on the schedule below."
            checked={system.autoBackup}
            onChange={(v) => updateSystem("autoBackup", v)}
            isDark={isDark}
          />

          <div className="mt-5 max-w-sm">
            <Field label="Backup frequency" isDark={isDark}>
              <select
                className={`${themedInputClass} disabled:opacity-50`}
                disabled={!system.autoBackup}
                value={system.backupFrequency}
                onChange={(e) =>
                  updateSystem("backupFrequency", e.target.value)
                }
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </Field>
          </div>

          <div
            className={`mt-6 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${cardClass}`}
          >
            <div>
              <p className={`text-sm font-medium ${titleClass}`}>
                Backup management
              </p>

              <p className={`text-xs mt-1 ${descriptionClass}`}>
                Connect your backup service to view and restore backups.
              </p>
            </div>

            <StatusPill tone="warn">Not connected</StatusPill>
          </div>
        </>
      );

    case "LOGS":
      return (
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${cardClass}`}
        >
          <div>
            <p className={`text-sm font-medium ${titleClass}`}>
              Audit & activity logs
            </p>

            <p
              className={`text-xs mt-1 leading-relaxed ${descriptionClass}`}
            >
              Connect your audit logging module to browse records, filter
              events and investigate issues.
            </p>
          </div>

          <StatusPill tone="warn">Not connected</StatusPill>
        </div>
      );

    default:
      return null;
  }
};

export default SystemSettingsSection;