import React, { useEffect } from "react";

import { Controller, useFormContext } from "react-hook-form";

import {
  Palette,
  Moon,
  Sun,
  Check,
  Save,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

import { SettingRow } from "@/components/shared/admin/settings/settings-ui.component";

import { initialDoctorSettings } from "@/constants/doctor-settings.constant";

import { appearanceSettingsSchema } from "@/schemas/doctor/settings/appearance-settings.schema";

import {
  primaryButton,
  ghostButton,
} from "@/constants/admin-settings.constant";

import type {
  DoctorSettingsValues,
  UpdateDoctorSettingsData,
} from "@/types/doctor-settings";

import { walletCardDesigns } from "@/components/shared/wallet/wallet-card-designs.shared";

import { doctorColorPalettes } from "@/mocks/doctor-color-palettes.mocks";
import InterfaceThemeMode from "./interface-theme-mode.shared";

export interface AppearanceSectionProps {
  isDark: boolean;
  mutateFn: (data: UpdateDoctorSettingsData) => void;
  isMutateFn: boolean;
}

const FIRST_WALLET_DESIGN_ID = walletCardDesigns[0].id;

const DEFAULT_PALETTE_ID = doctorColorPalettes[0].id;

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  isDark,
  isMutateFn,
  mutateFn,
}) => {
  const { control, watch, setValue, resetField } =
    useFormContext<DoctorSettingsValues>();

  const selectedDesignId = watch("appearance.walletCardDesignId");

  const selectedPaletteId = watch("appearance.colorPaletteId");

  const selectedPalette = doctorColorPalettes.find(
    (palette) => palette.id === selectedPaletteId,
  );

  // Initialize default selections.
  useEffect(() => {
    console.log(selectedPaletteId);

    if (selectedDesignId == null) {
      setValue("appearance.walletCardDesignId", FIRST_WALLET_DESIGN_ID, {
        shouldDirty: false,
      });
    }

    if (!selectedPaletteId || !selectedPalette) {
      setValue("appearance.colorPaletteId", DEFAULT_PALETTE_ID, {
        shouldDirty: false,
      });
    }
  }, [selectedDesignId, selectedPaletteId, setValue]);

  const cardClass = `rounded-2xl border p-5 sm:p-6 transition-colors ${
    isDark ? "bg-[#091420]/70 border-white/[0.08]" : "bg-white border-gray-200"
  }`;

  const headingClass = `text-sm sm:text-base font-semibold ${
    isDark ? "text-white" : "text-gray-900"
  }`;

  const descriptionClass = `text-xs mt-1 ${
    isDark ? "text-[#8b9ab0]" : "text-gray-500"
  }`;

  const onSubmit = () => {
    const rawData = {
      ...watch("appearance"),
      section: "APPEARANCE" as const,
    };

    const result = appearanceSettingsSchema.safeParse(rawData);

    if (!result.success) return;

    console.log(`RawData`);
    console.log(rawData);

    const {
      section,
      theme,
      colorPaletteId,
      walletCardDesignId,
      compactScheduleView,
      highContrastMode,
    } = rawData;

    mutateFn({
      section,
      data: {
        theme,
        colorPaletteId,
        compactScheduleView,
        highContrastMode,
        walletCardDesignId,
      },
    });

  
  };

  const handleReset = () => {
    resetField("appearance", {
      defaultValue: initialDoctorSettings.appearance,
    });

    toast("Appearance reset to default", { icon: "↩️" });
  };

  return (
    <div className="space-y-6">
      <InterfaceThemeMode
        cardClass={cardClass}
        descriptionClass={descriptionClass}
        headingClass={headingClass}
      />

      <section className={cardClass}>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <h4 className={headingClass}>Wallet Card Design</h4>

            <p className={descriptionClass}>
              Select how your wallet card should look.
            </p>
          </div>

          <span className="text-xs text-gray-500 shrink-0">
            {walletCardDesigns.length} designs
          </span>
        </div>

        <Controller
          name="appearance.walletCardDesignId"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {walletCardDesigns.map(({ id, name, Component }) => {
                const active = field.value === id;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => field.onChange(id)}
                    className={`
                        group text-left rounded-2xl overflow-hidden border
                        transition-all duration-200
                        ${
                          active
                            ? "border-primary ring-1 ring-primary/40"
                            : isDark
                              ? "border-white/10 hover:border-white/25"
                              : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                  >
                    {/* Preview Area */}
                    <div
                      className={`
                          relative h-[170px] overflow-hidden flex items-center
                          justify-center px-3
                          ${isDark ? "bg-[#111c29]" : "bg-[#f1f3f5]"}
                        `}
                    >
                      <div className="w-full max-w-[340px] h-[145px] overflow-hidden">
                        <div
                          className="w-[166.67%] origin-top-left"
                          style={{ transform: "scale(0.6)" }}
                        >
                          <Component
                            totalBalance={12500}
                            walletHolder="Dr. Alex Morgan"
                            maskedId="•••• 4829"
                            trendPercent={12.5}
                            preview
                          />
                        </div>
                      </div>
                    </div>

                    {/* Design Details */}
                    <div
                      className={`
                          flex items-center justify-between gap-3 px-4 py-3.5
                          ${isDark ? "bg-[#0d1723]" : "bg-white"}
                        `}
                    >
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold truncate ${headingClass}`}
                        >
                          {name}
                        </p>

                        <p className="text-[11px] text-gray-500 mt-1">
                          Design {String(id).padStart(2, "0")}
                        </p>
                      </div>

                      <span
                        className={`
                            w-[19px] h-[19px] rounded-full border-2 shrink-0
                            flex items-center justify-center transition-colors
                            ${
                              active
                                ? "border-primary"
                                : "border-gray-400/60 group-hover:border-primary/60"
                            }
                          `}
                      >
                        {active && (
                          <span className="w-[9px] h-[9px] rounded-full bg-primary" />
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        />
      </section>

      <section className={cardClass}>
        <div className="flex items-center gap-3.5 pb-4 border-b border-inherit mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="text-primary" />
          </div>

          <div>
            <h4 className={headingClass}>Subscription Color Collections</h4>

            <p className={descriptionClass}>
              Choose a color collection included in your subscription. Your
              selection changes the accent color throughout supported interface
              elements.
            </p>
          </div>
        </div>

        <Controller
          name="appearance.colorPaletteId"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctorColorPalettes.map((palette) => {
                const active = field.value === palette.id;

                return (
                  <label
                    key={palette.id}
                    className={`
                      p-4 rounded-xl border cursor-pointer transition-all
                      ${
                        active
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : isDark
                            ? "border-white/10 bg-[#060c13] hover:border-white/25"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={field.name}
                      value={palette.id}
                      checked={active}
                      onChange={() => field.onChange(palette.id)}
                      className="sr-only"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className={headingClass}>{palette.name}</p>

                        <p className={descriptionClass}>
                          {palette.description}
                        </p>
                      </div>

                      <span
                        className={`
                          w-5 h-5 rounded-full border flex items-center
                          justify-center shrink-0
                          ${
                            active
                              ? "border-primary bg-primary"
                              : "border-gray-400"
                          }
                        `}
                      >
                        {active && <Check size={12} className="text-white" />}
                      </span>
                    </div>

                    {/* Color Collection */}
                    <div className="flex items-center gap-2 mt-5">
                      {palette.colors.map((color) => (
                        <span
                          key={color}
                          className="w-9 h-9 rounded-xl border border-black/10 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">
                        Primary accent
                      </span>

                      <span
                        className="w-16 h-2 rounded-full"
                        style={{
                          backgroundColor: palette.primary,
                        }}
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        />
      </section>

      {/* =====================================================
          ACCESSIBILITY & LAYOUT
      ===================================================== */}

      <section className={`${cardClass} space-y-4`}>
        <h4 className={headingClass}>Accessibility & Layout Preferences</h4>

        <Controller
          name="appearance.compactScheduleView"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="Compact Weekly Schedule View"
              description="Display more patient appointment slots per hour by reducing calendar row heights."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />

        <Controller
          name="appearance.highContrastMode"
          control={control}
          render={({ field }) => (
            <SettingRow
              title="High Contrast Accessibility"
              description="Increase border distinction and font weight for enhanced accessibility."
              checked={field.value}
              onChange={field.onChange}
              isDark={isDark}
            />
          )}
        />
      </section>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={handleReset} className={ghostButton}>
          <RotateCcw size={14} />
          Reset Appearance
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className={`${primaryButton} !text-white`}
        >
          <Save size={15} />
          Save Appearance
        </button>
      </div>
    </div>
  );
};

export default AppearanceSection;
