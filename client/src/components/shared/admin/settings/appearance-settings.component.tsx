import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { BrandColorPicker } from "../../brand-color-picker.shared";
import type { PlatformSettings } from "@/schemas/admin/admin.schema";
import { getContrastTextColor } from "@/helpers/color-palette.helper";
import type { ThemeProps } from "@/types/common";
import { getAppearanceSettingsTheme } from "@/helpers/admin/settings.helper";

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

export const AppearanceSettings: React.FC<ThemeProps> = ({ isDark }) => {
  const { register, control, watch } = useFormContext<PlatformSettings>();

  const primaryColor = watch("general.appearance.primaryBrandColor");
  const appearanceMode = watch("general.appearance.mode");
  const platformName = watch("general.platform.platformName");

  const theme = getAppearanceSettingsTheme(isDark);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-6">
      <div className="space-y-6">
        <div>
          <p className={`text-sm font-medium ${theme.heading}`}>
            Primary brand color
          </p>

          <p className={`text-xs mt-1 mb-4 ${theme.description}`}>
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
          <p className={`text-sm font-medium ${theme.heading}`}>
            Appearance mode
          </p>

          <p className={`text-xs mt-1 mb-4 ${theme.description}`}>
            Choose the default theme for your platform.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {appearanceModes.map((mode) => {
              const isSelected = appearanceMode === mode.value;

              return (
                <label
                  key={mode.value}
                  className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${theme.modeCard(isSelected)}`}
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
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${theme.radioIndicator(isSelected)}`}
                    >
                      {isSelected && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${theme.radioInner}`}
                        />
                      )}
                    </span>
                  </div>

                  <p className={`text-sm font-semibold ${theme.heading}`}>
                    {mode.label}
                  </p>

                  <p className={`text-xs mt-1 ${theme.description}`}>
                    {mode.description}
                  </p>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`rounded-xl border p-4 ${theme.previewContainer}`}>
        <p className={`text-xs mb-3 ${theme.previewLabel}`}>Preview</p>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl shrink-0"
            style={{ backgroundColor: primaryColor }}
          />

          <p
            className={`text-sm font-semibold truncate ${theme.previewPlatformName}`}
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
