import React, { useState } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  KeyRound,
  Shield,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  changePasswordSchema,
  securitySettingsSchema,
  type ChangePasswordFormValues,
} from "@/schemas/doctor/settings/security-settings.schema";

import {
  Field,
  SettingRow,
} from "@/components/shared/admin/settings/settings-ui.component";

import {
  inputClass,
  primaryButton,
  ghostButton,
} from "@/constants/admin-settings.constant";

import type {
  DoctorSettingsValues,
  UpdateDoctorSettingsData,
} from "@/types/doctor-settings";

import { useMutate } from "@/hooks/use-mutate.hook";
import { changeDoctorPassword } from "@/services/auth.service";
import type { RouteRoleProps } from "@/types/auth";
import { useAuthStore } from "@/store";
import ActiveSessions from "./active-sessions.shared";
import FeatureUnderConstruction from "@/components/shared/feature-under-construction.shared";

export interface SecuritySectionProps {
  isDark: boolean;
  role: RouteRoleProps;
  mutateFn: (data: UpdateDoctorSettingsData) => void;
  isMutateFn: boolean;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  isDark,
  role,
  mutateFn,
  isMutateFn,
}) => {
  const {
    control,
    register: registerParent,
    watch,
    resetField,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<DoctorSettingsValues>();

  const currentSecurity = watch("security");
  const user = useAuthStore((state) => state.users[role]);

  // Check whether any security preference has changed.
  const isSecurityDirty =
    !!dirtyFields.security?.twoFactorAuth ||
    !!dirtyFields.security?.loginAlerts ||
    !!dirtyFields.security?.sessionTimeoutMinutes;

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Separate form for changing the account password.
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      section: "CHANGE_PASSWORD",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { mutate, isPending } = useMutate(changeDoctorPassword, {
    onSuccess() {},
  });

  const themedInputClass = `${inputClass} !focus:border-primary focus:!border-primary focus:!ring-primary/30 ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  // Change password.
  const onPasswordSubmit = (data: ChangePasswordFormValues) => {
    const result = changePasswordSchema.safeParse({
      ...data,
      section: "CHANGE_PASSWORD" as const,
    });

    if (!result.success) return;

    mutate({
      userId: user?.id!,
      currentpassword: result.data.currentPassword,
      newPassword: result.data.newPassword,
    });

    resetPassword({
      section: "CHANGE_PASSWORD",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleUpdateSecurityPreferences = () => {
    if (!isSecurityDirty || isMutateFn) return;

    const rawData = {
      ...currentSecurity,
      section: "SECURITY" as const,
    };

    const result = securitySettingsSchema.safeParse(rawData);

    if (!result.success) return;

    mutateFn({
      section: "SECURITY",
      data: {
        newDeviceLoginAlerts: result.data.loginAlerts,
        inactivitySessionTimeoutMinutes: result.data.sessionTimeoutMinutes,
        twoFactorAuthentication: result.data.twoFactorAuth,
      },
    });
  };

  const handleResetSecurity = () => {
    resetField("security");
    toast("Security preferences reset to default", {
      icon: "↩️",
    });
  };

  return (
    <div className="space-y-6">
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
          isDark
            ? "bg-[#091420]/70 border-white/[0.08]"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-inherit">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <KeyRound size={18} className="text-primary" />
          </div>

          <div>
            <h4
              className={`text-sm sm:text-base font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Change Account Password
            </h4>

            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Choose a strong password containing numbers and uppercase letters.
            </p>
          </div>
        </div>

        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Current Password" isDark={isDark}>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  {...registerPassword("currentPassword")}
                  className={`${themedInputClass} pr-10`}
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {passwordErrors.currentPassword && (
                <p className="text-xs text-rose-500 mt-1">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </Field>

            <Field label="New Password" isDark={isDark}>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  {...registerPassword("newPassword")}
                  className={`${themedInputClass} pr-10`}
                  placeholder="Min 8 chars, 1 uppercase, 1 digit"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {passwordErrors.newPassword && (
                <p className="text-xs text-rose-500 mt-1">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </Field>

            <Field label="Confirm New Password" isDark={isDark}>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...registerPassword("confirmNewPassword")}
                  className={`${themedInputClass} pr-10`}
                  placeholder="Repeat new password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {passwordErrors.confirmNewPassword && (
                <p className="text-xs text-rose-500 mt-1">
                  {passwordErrors.confirmNewPassword.message}
                </p>
              )}
            </Field>
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                resetPassword();
                toast("Password fields cleared", { icon: "↩️" });
              }}
              className={ghostButton}
            >
              <RotateCcw size={14} />
              Reset Fields
            </button>

            <button
              type="submit"
              disabled={isPasswordSubmitting || isPending}
              className={`${primaryButton} !text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isPending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <FeatureUnderConstruction>
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-colors ${
          isDark
            ? "bg-[#091420]/70 border-white/[0.08]"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3.5 pb-4 border-b border-inherit">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Shield size={18} className="text-primary" />
          </div>

          <div>
            <h4
              className={`text-sm sm:text-base font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Session & Account Protection
            </h4>

            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-[#8b9ab0]" : "text-gray-500"
              }`}
            >
              Manage two-factor authentication and idle timeout policies.
            </p>
          </div>
        </div>

        <Controller
          name="security.twoFactorAuth"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="Two-Factor Authentication (2FA)"
              description="Require an SMS or authenticator code verification in addition to your password on new device logins."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <Controller
          name="security.loginAlerts"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="New Device Login Alerts"
              description="Receive an immediate email alert whenever an unrecognized browser or IP logs into your doctor account."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <div className="pt-2">
          <Field
            label="Inactivity Session Timeout"
            hint="Automatically logs out your portal session after a period of idle inactivity to protect sensitive patient records."
            isDark={isDark}
          >
            <select
              {...registerParent("security.sessionTimeoutMinutes", {
                valueAsNumber: true,
              })}
              className={`${themedInputClass} max-w-sm`}
            >
              <option value={15}>15 Minutes</option>
              <option value={30}>30 Minutes (Recommended)</option>
              <option value={60}>1 Hour</option>
              <option value={120}>2 Hours</option>
              <option value={1440}>24 Hours</option>
            </select>
          </Field>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetSecurity}
            disabled={!isSecurityDirty || isMutateFn}
            className={`${ghostButton} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <RotateCcw size={14} />
            Reset Preferences
          </button>

          <button
            type="button"
            onClick={handleUpdateSecurityPreferences}
            disabled={!isSecurityDirty || isMutateFn}
            className={`${primaryButton} !text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isMutateFn ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={15} />
                Save Security Preferences
              </>
            )}
          </button>
        </div>
      </div>

      <ActiveSessions isDark={isDark} />
      </FeatureUnderConstruction>

    </div>
  );
};

export default SecuritySection;
