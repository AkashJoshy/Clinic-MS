import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { BrandColorPicker } from "../../brand-color-picker.shared";

import type { PlatformSettings } from "@/schemas/admin/admin.schema";
import { getContrastTextColor } from "@/helpers/color-palette.helper";

const appearanceModes = [
  {
    value: "DARK",
    label: "Dark Mode",
    icon: "🌙",
    description: "Dark backgrounds",
  },
  {
    value: "LIGHT",
    label: "Light Mode",
    icon: "☀️",
    description: "Light backgrounds",
  },
] as const;

interface AppearanceSettingsProps {
  isDark: boolean;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  isDark,
}) => {
  const { register, control, watch } = useFormContext<PlatformSettings>();

  const primaryColor = watch("general.appearance.primaryBrandColor");
  const appearanceMode = watch("general.appearance.mode");
  const platformName = watch("general.platform.platformName");

  const isLightMode = appearanceMode === "LIGHT";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-6">
      <div className="space-y-6">
        <div>
          <p
            className={`text-sm font-medium ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Primary brand color
          </p>

          <p
            className={`text-xs mt-1 mb-4 ${
              isDark ? "text-[#8b9ab0]" : "text-gray-500"
            }`}
          >
            Used for buttons, highlights and other accents across the platform.
          </p>

          <Controller
            name="general.appearance.primaryBrandColor"
            control={control}
            render={({ field }) => (
              <BrandColorPicker
                value={field.value}
                onChange={field.onChange}
                label="Primary brand color"
              />
            )}
          />
        </div>

        <div>
          <p
            className={`text-sm font-medium ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Appearance mode
          </p>

          <p
            className={`text-xs mt-1 mb-4 ${
              isDark ? "text-[#8b9ab0]" : "text-gray-500"
            }`}
          >
            Choose the default theme for your platform.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {appearanceModes.map((mode) => {
              const isSelected = appearanceMode === mode.value;

              return (
                <label
                  key={mode.value}
                  className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-400/10"
                      : isDark
                        ? "border-white/10 bg-[#091420] hover:border-white/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    value={mode.value}
                    className="sr-only"
                    {...register("general.appearance.mode")}
                  />

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{mode.icon}</span>

                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-emerald-400 bg-emerald-400"
                          : isDark
                            ? "border-white/30"
                            : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isDark ? "bg-[#091420]" : "bg-white"
                          }`}
                        />
                      )}
                    </span>
                  </div>

                  <p
                    className={`text-sm font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {mode.label}
                  </p>

                  <p
                    className={`text-xs mt-1 ${
                      isDark ? "text-[#8b9ab0]" : "text-gray-500"
                    }`}
                  >
                    {mode.description}
                  </p>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`rounded-xl border p-4 ${
          isLightMode
            ? "border-gray-200 bg-white"
            : "border-white/8 bg-[#091420]"
        }`}
      >
        <p
          className={`text-xs mb-3 ${
            isLightMode ? "text-gray-500" : "text-[#6b7c93]"
          }`}
        >
          Preview
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl shrink-0"
            style={{ backgroundColor: primaryColor }}
          />

          <p
            className={`text-sm font-semibold truncate ${
              isLightMode ? "text-gray-900" : "text-white"
            }`}
          >
            {platformName || "Platform name"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className="px-3 h-8 inline-flex items-center rounded-lg text-xs font-semibold text-[#05130a]"
            style={{
              backgroundColor: primaryColor,
              color: getContrastTextColor(primaryColor),
            }}
          >
            Book now
          </span>

          <span
            className="px-2.5 h-6 inline-flex items-center rounded-full text-[11px] font-medium border"
            style={{
              color: primaryColor,
              backgroundColor: `${primaryColor}20`,
              borderColor: `${primaryColor}50`,
            }}
          >
            Verified
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
