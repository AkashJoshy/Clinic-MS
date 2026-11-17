import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form";
import {
  ExternalLink,
  User,
  ShieldCheck,
  Save,
  RotateCcw,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  Field,
  SettingRow,
} from "@/components/shared/admin/settings/settings-ui.component";
import {
  inputClass,
  primaryButton,
  ghostButton,
} from "@/constants/admin-settings.constant";
import { initialDoctorSettings } from "@/constants/doctor-settings.constant";
import { profileInfoSchema } from "@/schemas/doctor/settings/profile-info.schema";
import type { DoctorSettingsValues } from "@/types/doctor-settings";
import { useAuthStore } from "@/store";
import { useMutate } from "@/hooks/use-mutate.hook";
import { updateDoctorPersonalDetails } from "@/services/doctor.service";
import type { DoctorPersonalDetails } from "@/types/doctor";

export interface ProfileInfoSectionProps {
  isDark: boolean;
}

export const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  isDark,
}) => {
  const navigate = useNavigate();

  const doctor = useAuthStore((state) => state.doctor);

  const {
    register,
    control,
    watch,
    resetField,
    setError,
    clearErrors,
    reset,
    formState: { errors, dirtyFields },
  } = useFormContext<DoctorSettingsValues>();

  const currentProfile = watch("profileInfo");

  const { mutate, isPending } = useMutate(updateDoctorPersonalDetails, {
    onSuccess(data) {

      console.log(data.data);
      
      if (data.data)
      reset({
        profileInfo: {
          section: "PROFILE_INFO",
          ...data.data
        }
      })
    },
  });

  const themedInputClass = `${inputClass} !focus:border-primary focus:!border-primary focus:!ring-primary/30 ${
    isDark
      ? "!bg-[#080d14] !text-white !border-white/10 placeholder:!text-[#6b7c93]"
      : "!bg-white !text-gray-900 !border-gray-200 placeholder:!text-gray-400"
  }`;

  const handleUpdateProfileSettings = () => {
    if (isPending || !dirtyFields.profileInfo) return;

    clearErrors("profileInfo");

    const rawData = {
      ...currentProfile,
      section: "PROFILE_INFO" as const,
    };

    const result = profileInfoSchema.safeParse(rawData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (
          fieldName &&
          fieldName !== "section" &&
          fieldName in currentProfile
        ) {
          setError(`profileInfo.${fieldName as keyof typeof currentProfile}`, {
            type: "manual",
            message: issue.message,
          });
        }
      });

      return;
    }

    mutate(result.data as DoctorPersonalDetails);
  };

  const handleResetProfile = () => {
    if (isPending) return;

    resetField("profileInfo", {
      defaultValue: initialDoctorSettings.profileInfo,
    });

    clearErrors("profileInfo");

    toast("Profile Info reset to default", { icon: "↩️" });
  };

  return (
    <div className="space-y-6">
      {/* Doctor Profile Summary */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
          isDark
            ? "bg-[#091420]/80 border-white/[0.08]"
            : "bg-slate-50 border-gray-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              {doctor?.doctor?.profilePicture?.url ? (
                <img
                  src={doctor.doctor.profilePicture.url}
                  alt={currentProfile?.displayName || "Doctor Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={26} className="text-primary" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className={`text-base sm:text-lg font-bold truncate ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {currentProfile?.displayName || "Doctor Profile"}
                </h3>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
                  <ShieldCheck size={11} />
                  Verified
                </span>
              </div>

              <p
                className={`text-xs sm:text-sm mt-1 ${
                  isDark ? "text-[#8b9ab0]" : "text-gray-600"
                }`}
              >
                Manage your profile preferences
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/doctor/my-profile")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary text-xs sm:text-sm font-semibold transition-all border border-primary/25 cursor-pointer shrink-0"
          >
            Edit Profile
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Display name" isDark={isDark}>
          <input
            {...register("profileInfo.displayName")}
            className={themedInputClass}
            placeholder="Dr. Full Name"
          />

          {errors.profileInfo?.displayName && (
            <p className="text-xs text-rose-500 mt-1">
              {errors.profileInfo.displayName.message}
            </p>
          )}
        </Field>

        <Field label="Emergency contact phone" isDark={isDark}>
          <input
            type="tel"
            {...register("profileInfo.emergencyContactPhone")}
            className={themedInputClass}
            placeholder="9876543210"
          />

          {errors.profileInfo?.emergencyContactPhone && (
            <p className="text-xs text-rose-500 mt-1">
              {errors.profileInfo.emergencyContactPhone.message}
            </p>
          )}
        </Field>
      </div>

      <div
        className={`rounded-2xl border p-4 sm:p-5 space-y-4 ${
          isDark
            ? "bg-[#091420]/50 border-white/[0.06]"
            : "bg-gray-50/70 border-gray-200"
        }`}
      >
        <Controller
          name="profileInfo.acceptNewPatients"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="Accept new patients"
              description="Allow new patients to discover and book appointments with you. Existing patients can still book follow-up appointments when disabled."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <Controller
          name="profileInfo.publicProfileVisible"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="Public directory visibility"
              description="Control whether your doctor profile appears in patient search and specialty discovery listings."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleResetProfile}
          disabled={isPending}
          className={`${ghostButton} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <RotateCcw size={14} />
          Reset
        </button>

        <button
          type="button"
          onClick={handleUpdateProfileSettings}
          disabled={isPending || !dirtyFields.profileInfo}
          className={`${primaryButton} !text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPending ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={15} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoSection;
