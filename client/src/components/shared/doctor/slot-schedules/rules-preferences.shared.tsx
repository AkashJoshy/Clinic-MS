import type {
  SlotRules,
  SlotRulesPreferencesProps,
} from "@/types/doctor-clinic";
import { NumberBadge } from "../../number-badge.shared";
import { LockedOverlay } from "./locked-overlay.shared";

export const SlotRulesPreferences: React.FC<SlotRulesPreferencesProps> = ({
  rules,
  onChange,
  disabled,
  error,
  isDark,
}) => {
  const handleChange = <K extends keyof SlotRules>(
    key: K,
    value: SlotRules[K],
  ) => {
    onChange({
      ...rules,
      [key]: value,
    });
  };

  const headingClass = isDark ? "text-white" : "text-slate-900";
  const labelClass = isDark ? "text-[#8b9ab0]" : "text-slate-600";
  const descriptionClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";

  const cardClass = isDark
    ? "bg-[#0d1a27] border-white/10"
    : "bg-white border-slate-200";

  const inputClass = isDark
    ? "bg-black/20 border-white/10 text-white [color-scheme:dark]"
    : "bg-slate-50 border-slate-300 text-slate-900 [color-scheme:light]";

  const toggleCardClass = isDark
    ? "border-white/10 bg-white/5"
    : "border-slate-200 bg-slate-50";

  const renderToggle = (
    key: "autoConfirmBookings" | "allowReschedule",
    label: string,
    description: string,
  ) => {
    const enabled = rules[key];

    return (
      <div
        className={`flex items-center justify-between rounded border p-4 md:col-span-2 ${toggleCardClass}`}
      >
        <div className="min-w-0 pr-3">
          <p className={`font-medium ${headingClass}`}>{label}</p>
          <p className={`mt-1 text-xs ${descriptionClass}`}>{description}</p>

          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={label}
            onClick={() => handleChange(key, !enabled)}
            className={`relative mt-2 h-6 w-11 rounded-full cursor-pointer transition-colors xsxs:block md:hidden ${
              enabled ? "bg-primary" : "bg-gray-600"
            }`}
          >
            <div
              className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                enabled ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={label}
          onClick={() => handleChange(key, !enabled)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors xsxs:hidden md:block ${
            enabled ? "bg-primary" : "bg-gray-600"
          }`}
        >
          <div
            className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
              enabled ? "translate-x-5" : ""
            }`}
          />
        </button>

        {error?.[key]?.message && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {error[key]?.message}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div
        className={`
          rounded-lg border p-6 transition-all duration-300
          ${cardClass}
          ${disabled ? "select-none" : ""}
        `}
      >
        <div className="mb-6 flex items-center">
          <div className="[&_*]:!text-primary [&_*]:!border-primary [&_*]:!bg-primary/10">
            <NumberBadge number={2} />
          </div>

          <h2 className={`ml-2 text-xl font-semibold ${headingClass}`}>
            Slot & Booking Rules
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className={`text-sm ${labelClass}`}>
              Maximum Tokens Per Day
            </label>

            <input
              type="number"
              min={1}
              value={rules.maxTokensPerDay ?? ""}
              onChange={(e) =>
                handleChange("maxTokensPerDay", Number(e.target.value))
              }
              className={`rounded border px-3 py-2 outline-none transition focus:border-primary/50 ${inputClass}`}
            />

            {error?.maxTokensPerDay?.message && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error.maxTokensPerDay.message}
              </p>
            )}
          </div>

          {renderToggle(
            "autoConfirmBookings",
            "Auto-Confirm Bookings",
            "Automatically accept appointments without manual review.",
          )}

          {renderToggle(
            "allowReschedule",
            "Allow Rescheduling",
            "Allow patients to reschedule existing appointments.",
          )}
          
        </div>
      </div>

      {disabled && (
        <LockedOverlay
          disabled={disabled}
          isDark={isDark}
          title="Slot & Booking Rules Locked"
          description="Complete the weekly schedule setup first to configure your slot and booking rules."
        />
      )}
    </div>
  );
};
