import type { DoctorSettingsValues } from "@/types/doctor-settings";
import { Check, Moon, Palette, Sun } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface InterfaceThemeModeProps {
  cardClass: string;
  headingClass: string;
  descriptionClass: string;
}

const InterfaceThemeMode = ({
  cardClass,
  headingClass,
  descriptionClass,
}: InterfaceThemeModeProps) => {
  const { control, watch, setValue, resetField } =
    useFormContext<DoctorSettingsValues>();

  const currentMode = watch("appearance.theme");

  return (
    <section className={cardClass}>
      <div className="flex items-center gap-3.5 pb-4 border-b border-inherit mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Palette size={18} className="text-primary" />
        </div>

        <div>
          <h4 className={headingClass}>Interface Theme Mode</h4>

          <p className={descriptionClass}>
            Choose your preferred visual presentation mode across the clinical
            portal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {(
          [
            {
              value: "DARK",
              name: "Dark Obsidian",
              description: "Elegant dark interface for comfortable viewing.",
              icon: Moon,
            },
            {
              value: "LIGHT",
              name: "Clean Light",
              description: "Bright, minimal interface with crisp contrast.",
              icon: Sun,
            },
          ] as const
        ).map((theme) => {
          const Icon = theme.icon;
          const active = currentMode === theme.value;
          const darkPreview = theme.value === "DARK";

          return (
            <button
              key={theme.value}
              type="button"
              onClick={() =>
                setValue("appearance.theme", theme.value, {
                  shouldDirty: true,
                })
              }
              className={`
                  relative text-left rounded-2xl border-2 overflow-hidden
                  transition-all duration-200
                  ${
                    active
                      ? "border-primary ring-2 ring-primary/15"
                      : "border-transparent hover:border-primary/40"
                  }
                `}
            >
              <div
                className={`
                    p-4 sm:p-5 transition-colors
                    ${darkPreview ? "bg-[#080F1B]" : "bg-white"}
                  `}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`
                          w-8 h-8 rounded-lg flex items-center justify-center
                          ${
                            darkPreview
                              ? "bg-primary text-primary-400"
                              : "bg-primary-50 text-primary-600"
                          }
                        `}
                    >
                      <Icon size={16} />
                    </div>

                    <span
                      className={`
                          text-sm font-semibold
                          ${darkPreview ? "text-white" : "text-gray-900"}
                        `}
                    >
                      Doctor Portal
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((item) => (
                      <span
                        key={item}
                        className={`
                            w-2 h-2 rounded-full
                            ${darkPreview ? "bg-gray-600" : "bg-gray-300"}
                          `}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className={`
                      rounded-xl border p-4
                      ${
                        darkPreview
                          ? "bg-[#111D2C] border-white/10"
                          : "bg-gray-50 border-gray-200"
                      }
                    `}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p
                        className={`
                            text-[10px]
                            ${darkPreview ? "text-gray-400" : "text-gray-500"}
                          `}
                      >
                        Total Balance
                      </p>

                      <p
                        className={`
                            text-xl font-bold mt-1
                            ${darkPreview ? "text-white" : "text-gray-900"}
                          `}
                      >
                        ₹1,25,000
                      </p>
                    </div>

                    <div
                      className={`
                          px-2.5 py-1 rounded-lg text-[10px] font-semibold
                          ${
                            darkPreview
                              ? "bg-primary-400/10 text-primary-400"
                              : "bg-primary-50 text-primary-700"
                          }
                        `}
                    >
                      +12.5%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className={`
                            rounded-lg p-3
                            ${
                              darkPreview
                                ? "bg-[#1A293B]"
                                : "bg-white border border-gray-200"
                            }
                          `}
                      >
                        <div
                          className={`
                              w-12 h-1.5 rounded-full mb-2
                              ${darkPreview ? "bg-gray-600" : "bg-gray-300"}
                            `}
                        />

                        <div
                          className={`
                              w-16 h-2 rounded-full
                              ${darkPreview ? "bg-gray-400" : "bg-gray-700"}
                            `}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span className="w-2 h-2 rounded-full bg-primary" />

                  <span
                    className={`
                        text-[10px]
                        ${darkPreview ? "text-gray-400" : "text-gray-500"}
                      `}
                  >
                    {darkPreview ? "Dark appearance" : "Light appearance"}
                  </span>
                </div>
              </div>

              <div
                className={`
                    flex items-center justify-between gap-3 px-4 py-4
                    ${darkPreview ? "bg-[#111D2C]" : "bg-gray-50"}
                  `}
              >
                <div>
                  <p
                    className={`
                        text-sm font-bold
                        ${darkPreview ? "text-white" : "text-gray-900"}
                      `}
                  >
                    {theme.name}
                  </p>

                  <p
                    className={`
                        text-xs mt-1
                        ${darkPreview ? "text-gray-400" : "text-gray-500"}
                      `}
                  >
                    {theme.description}
                  </p>
                </div>

                <span
                  className={`
                      w-5 h-5 rounded-full border-2 shrink-0
                      flex items-center justify-center
                      ${
                        active
                          ? "border-primary bg-primary"
                          : darkPreview
                            ? "border-gray-500"
                            : "border-gray-400"
                      }
                    `}
                >
                  {active && (
                    <Check size={12} className="text-white" strokeWidth={3} />
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default InterfaceThemeMode;
