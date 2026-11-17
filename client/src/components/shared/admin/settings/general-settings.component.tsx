import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { AppearanceSettings } from "./appearance-settings.component";
import { Field, SettingRow } from "./settings-ui.component";

import { inputClass } from "../../../../constants/admin-settings.constant";

import type { SettingsKey } from "../../../../types/admin-settings";
import type { PlatformSettings } from "@/schemas/admin/admin.schema";

export interface GeneralSettingsSectionProps {
  sectionKey: SettingsKey;
  isDark: boolean;
}

export const GeneralSettingsSection: React.FC<GeneralSettingsSectionProps> = ({
  sectionKey,
  isDark,
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PlatformSettings>();

  const themedInputClass = `${inputClass} !focus:border-primary focus:!border-primary focus:!ring-primary/30 ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  switch (sectionKey) {
    case "PLATFORM":
      return (
        <div className="space-y-5">
          <Field label="Platform name" isDark={isDark}>
            <input
              {...register("general.platform.platformName")}
              className={themedInputClass}
              placeholder="Enter platform name"
            />

            {errors.general?.platform?.platformName && (
              <p className="text-sm text-red-500">
                {errors.general.platform.platformName.message}
              </p>
            )}
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Support email" isDark={isDark}>
              <input
                type="email"
                {...register("general.platform.supportEmail")}
                className={themedInputClass}
                placeholder="support@example.com"
              />

              {errors.general?.platform?.supportEmail && (
                <p className="text-sm text-red-500">
                  {errors.general.platform.supportEmail.message}
                </p>
              )}
            </Field>

            <Field label="Support phone" isDark={isDark}>
              <input
                type="tel"
                {...register("general.platform.supportPhone")}
                className={themedInputClass}
                placeholder="Support phone number"
              />

              {errors.general?.platform?.supportPhone && (
                <p className="text-sm text-red-500">
                  {errors.general.platform.supportPhone.message}
                </p>
              )}
            </Field>

            <Field label="Default timezone" isDark={isDark}>
              <select
                {...register("general.platform.defaultTimezone")}
                className={themedInputClass}
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
                <option value="Europe/London">Europe/London</option>
              </select>

              {errors.general?.platform?.defaultTimezone && (
                <p className="text-sm text-red-500">
                  {errors.general.platform.defaultTimezone.message}
                </p>
              )}
            </Field>

            <Field label="Default currency" isDark={isDark}>
              <select
                {...register("general.platform.defaultCurrency")}
                className={themedInputClass}
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="EUR">EUR - Euro</option>
              </select>

              {errors.general?.platform?.defaultCurrency && (
                <p className="text-sm text-red-500">
                  {errors.general.platform.defaultCurrency.message}
                </p>
              )}
            </Field>
          </div>
        </div>
      );

    case "APPEARANCE":
      return <AppearanceSettings isDark={isDark} />;

    case "NOTIFICATIONS":
      return (
        <>
          <Controller
            name="general.notifications.emailNotifications"
            control={control}
            render={({ field }) => (
              <SettingRow
                title="Email notifications"
                description="Send platform emails where applicable."
                checked={field.value}
                onChange={field.onChange}
                isDark={isDark}
              />
            )}
          />

          <Controller
            name="general.notifications.appointmentReminders"
            control={control}
            render={({ field }) => (
              <SettingRow
                title="Appointment reminders"
                description="Remind patients and doctors about upcoming appointments."
                checked={field.value}
                onChange={field.onChange}
                isDark={isDark}
              />
            )}
          />

          <Controller
            name="general.notifications.paymentNotifications"
            control={control}
            render={({ field }) => (
              <SettingRow
                title="Payment notifications"
                description="Notify users about payments, refunds and payouts."
                checked={field.value}
                onChange={field.onChange}
                isDark={isDark}
              />
            )}
          />
        </>
      );

    case "SECURITY":
      return (
        <>
          <Controller
            name="general.security.twoFactorAuthRequired"
            control={control}
            render={({ field }) => (
              <SettingRow
                title="Two-factor authentication"
                description="Require a second verification step for supported admin accounts."
                checked={field.value}
                onChange={field.onChange}
                isDark={isDark}
              />
            )}
          />

          <div className="mt-5 max-w-sm">
            <Field
              label="Admin session timeout"
              hint="Takes effect once the backend enforces session expiry."
              isDark={isDark}
            >
              <select
                {...register("general.security.adminSessionTimeoutMinutes", {
                  valueAsNumber: true,
                })}
                className={themedInputClass}
              >
                {[15, 30, 60, 120].map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes} minutes
                  </option>
                ))}
              </select>

              {errors.general?.security?.adminSessionTimeoutMinutes && (
                <p className="text-sm text-red-500">
                  {errors.general.security.adminSessionTimeoutMinutes.message}
                </p>
              )}
            </Field>
          </div>

          <div className="mt-5 max-w-sm">
            <Field label="Absolute session lifetime" isDark={isDark}>
              <select
                {...register("general.security.absoluteSessionLifetimeHours", {
                  valueAsNumber: true,
                })}
                className={themedInputClass}
              >
                {[12, 24, 72, 168, 336].map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} hours
                  </option>
                ))}
              </select>

              {errors.general?.security?.absoluteSessionLifetimeHours && (
                <p className="text-sm text-red-500">
                  {errors.general.security.absoluteSessionLifetimeHours.message}
                </p>
              )}
            </Field>
          </div>

          <Controller
            name="general.security.maintenanceMode"
            control={control}
            render={({ field }) => (
              <SettingRow
                title="Maintenance mode"
                description="Restrict normal platform access during maintenance."
                checked={field.value}
                onChange={field.onChange}
                isDark={isDark}
              />
            )}
          />
        </>
      );

    default:
      return null;
  }
};

export default GeneralSettingsSection;
