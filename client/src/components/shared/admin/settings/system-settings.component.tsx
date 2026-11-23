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
import type { SystemSettingsSectionProps } from "@/types/admin-settings";
import { getSystemSettingsSectionTheme } from "@/helpers/admin/settings.helper";


export const SystemSettingsSection: React.FC<
  SystemSettingsSectionProps
> = ({ sectionKey, system, updateSystem, isDark }) => {
  const theme = getSystemSettingsSectionTheme(isDark, inputClass);

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
                  className={`flex items-center gap-3.5 p-4 rounded-xl border ${theme.card}`}
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#1dc465]/10 flex items-center justify-center">
                    <IntegrationIcon
                      size={18}
                      className="text-[#1dc465]"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${theme.title}`}>
                      {integration.title}
                    </p>

                    <p className={`text-xs mt-0.5 ${theme.description}`}>
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
                className={`${theme.input} disabled:opacity-50`}
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
            className={`mt-6 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${theme.card}`}
          >
            <div>
              <p className={`text-sm font-medium ${theme.title}`}>
                Backup management
              </p>

              <p className={`text-xs mt-1 ${theme.description}`}>
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
          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${theme.card}`}
        >
          <div>
            <p className={`text-sm font-medium ${theme.title}`}>
              Audit & activity logs
            </p>

            <p
              className={`text-xs mt-1 leading-relaxed ${theme.description}`}
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