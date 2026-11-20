import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Bell, Mail, MessageSquare, Save, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import {
  SettingRow,
  Field,
} from "@/components/shared/admin/settings/settings-ui.component";
import {
  inputClass,
  primaryButton,
  ghostButton,
} from "@/constants/admin-settings.constant";
import { initialDoctorSettings } from "@/constants/doctor-settings.constant";
import { notificationsSettingsSchema } from "@/schemas/doctor/settings/notifications-settings.schema";
import type { DoctorSettingsValues } from "@/types/doctor-settings";
import FeatureUnderConstruction from "@/components/shared/feature-under-construction.shared";

export interface NotificationsSectionProps {
  isDark: boolean;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  isDark,
}) => {
  const { control, register, watch, resetField } =
    useFormContext<DoctorSettingsValues>();

  const currentNotifications = watch("notifications");

  const themedInputClass = `${inputClass} !focus:border-primary focus:!border-primary focus:!ring-primary/30 ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  const onSubmit = () => {
    const rawData = {
      ...currentNotifications,
      section: "NOTIFICATIONS" as const,
    };

    const result = notificationsSettingsSchema.safeParse(rawData);

    if (!result.success) {
      return;
    }

    console.log("[Doctor Settings] Successfully saved NOTIFICATIONS:", {
      section: result.data.section,
      data: result.data,
      timestamp: new Date().toISOString(),
    });

    toast.success("Notification preferences updated successfully");
  };

  const handleReset = () => {
    resetField("notifications", {
      defaultValue: initialDoctorSettings.notifications,
    });
    toast("Notification preferences reset to default", { icon: "↩️" });
  };

  return (
    <>
    <div className="space-y-6">
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-colors ${
          isDark
            ? "bg-[#091420]/70 border-white/[0.08]"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3.5 pb-4 border-b border-inherit">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Bell size={18} className="text-primary" />
          </div>
          <div>
            <h4
              className={`text-sm sm:text-base font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Clinical & Appointment Alerts
            </h4>
            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Get notified immediately when patient schedules or statuses
              change.
            </p>
          </div>
        </div>

        <Controller
          name="notifications.clinical.appointmentBooked"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="New Appointment Bookings"
              description="Notify when a patient books a new slot on your calendar."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <Controller
          name="notifications.clinical.appointmentCancelled"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="Cancellations & Reschedules"
              description="Notify immediately if an upcoming slot is cancelled or changed."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <Controller
          name="notifications.clinical.patientMessages"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="Patient Inquiries & Messages"
              description="Alert for pre-consultation chat messages and report submissions."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <div className="pt-2 max-w-sm">
          <Field
            label="Appointment Reminder Lead Time"
            hint="Send an alert before the appointment commences."
            isDark={isDark}
          >
            <select
              {...register("notifications.clinical.appointmentReminderHours", {
                valueAsNumber: true,
              })}
              className={themedInputClass}
            >
              <option value={1}>1 Hour before</option>
              <option value={2}>2 Hours before (Recommended)</option>
              <option value={6}>6 Hours before</option>
              <option value={24}>24 Hours before</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Financial & Platform Alerts */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-colors ${
          isDark
            ? "bg-[#091420]/70 border-white/[0.08]"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3.5 pb-4 border-b border-inherit">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <MessageSquare size={18} className="text-primary" />
          </div>
          <div>
            <h4
              className={`text-sm sm:text-base font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Payouts & Updates
            </h4>
            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Stay updated on settlement deposits, wallet withdrawals, and news.
            </p>
          </div>
        </div>

        <Controller
          name="notifications.updates.payoutUpdates"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="Wallet & Payout Settlements"
              description="Receive notifications when consultation fees clear and are deposited to your bank account."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <Controller
          name="notifications.updates.marketingEmails"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="Platform Features & Clinical Guides"
              description="Periodic tips, feature announcements, and doctor community webinars."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />
      </div>

      {/* Delivery Channels */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-colors ${
          isDark
            ? "bg-[#091420]/70 border-white/[0.08]"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3.5 pb-4 border-b border-inherit">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Mail size={18} className="text-primary" />
          </div>
          <div>
            <h4
              className={`text-sm sm:text-base font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Notification Delivery Channels
            </h4>
            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Select where you wish to receive urgent patient alerts.
            </p>
          </div>
        </div>

        <Controller
          name="notifications.channels.emailAlerts"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="Email Notifications"
              description="Send alerts directly to your registered doctor email address."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <Controller
          name="notifications.channels.smsAlerts"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="SMS Messages"
              description="Send high-priority SMS reminders for immediate appointments."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <Controller
          name="notifications.channels.whatsappAlerts"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="WhatsApp Business Alerts"
              description="Receive instant schedule pings and booking digests directly on WhatsApp."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={handleReset} className={ghostButton}>
          <RotateCcw size={14} />
          Reset Preferences
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className={`${primaryButton} !text-white`}
        >
          <Save size={15} />
          Update Notifications
        </button>
      </div>
    </div>
    </>
  );
};

export default NotificationsSection;
