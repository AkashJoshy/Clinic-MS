import type {
  SlotRules,
  SlotRulesPreferencesProps,
} from "@/types/doctor-clinic";
import { LockKeyhole } from "lucide-react";
import { NumberBadge } from "../../number-badge.shared";
import { LockedOverlay } from "./locked-overlay.shared";

export const SlotRulesPreferences: React.FC<SlotRulesPreferencesProps> = ({
  rules,
  onChange,
  disabled,
  error,
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

  return (
    <div className="relative">
      <div
        className={`
          rounded-lg border border-white/10 bg-[#0d1a27] p-6
          text-[#8b9ab0] transition-all duration-300
          ${disabled ? "select-none" : ""}
        `}
      >
        <div className="mb-6 flex items-center">
          <NumberBadge number={2} />

          <h2 className="ml-2 text-xl font-semibold text-white">
            Slot & Booking Rules
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Session Duration (minutes)</label>

            <input
              type="number"
              min={5}
              value={rules.sessionDuration ?? ""}
              onChange={(e) =>
                handleChange("sessionDuration", Number(e.target.value))
              }
              className="rounded border border-white/10 bg-black/20 px-3 py-2 text-white outline-none transition focus:border-[#1dc465]/50"
            />
            {error?.sessionDuration?.message && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error.sessionDuration.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Buffer Time (minutes)</label>

            <input
              type="number"
              min={0}
              value={rules.bufferTime ?? ""}
              onChange={(e) =>
                handleChange("bufferTime", Number(e.target.value))
              }
              className="rounded border border-white/10 bg-black/20 px-3 py-2 text-white outline-none transition focus:border-[#1dc465]/50"
            />
            {error?.bufferTime?.message && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error.bufferTime.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Max Sessions Per Day</label>

            <input
              type="number"
              min={1}
              value={rules.maxSessionsPerDay ?? ""}
              onChange={(e) =>
                handleChange("maxSessionsPerDay", Number(e.target.value))
              }
              className="rounded border border-white/10 bg-black/20 px-3 py-2 text-white outline-none transition focus:border-[#1dc465]/50"
            />
            {error?.maxSessionsPerDay?.message && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error.maxSessionsPerDay.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Min Advance Notice (hours)</label>

            <input
              type="number"
              min={0}
              value={rules.minAdvanceNotice ?? ""}
              onChange={(e) =>
                handleChange("minAdvanceNotice", Number(e.target.value))
              }
              className="rounded border border-white/10 bg-black/20 px-3 py-2 text-white outline-none transition focus:border-[#1dc465]/50"
            />
            {error?.minAdvanceNotice?.message && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error.minAdvanceNotice.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Booking Window (days ahead)</label>

            <input
              type="number"
              min={1}
              value={rules.bookingWindow ?? ""}
              onChange={(e) =>
                handleChange("bookingWindow", Number(e.target.value))
              }
              className="rounded border border-white/10 bg-black/20 px-3 py-2 text-white outline-none transition focus:border-[#1dc465]/50"
            />
            {error?.bookingWindow?.message && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error.bookingWindow.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Slot Interval Calculation</label>

            <select
              value={rules.slotInterval}
              onChange={(e) =>
                handleChange(
                  "slotInterval",
                  e.target.value as SlotRules["slotInterval"],
                )
              }
              className="rounded border border-white/10 bg-black/20 px-3 py-2 text-white outline-none transition focus:border-[#1dc465]/50 xsxs:text-[10px] xs:text-[14px]"
            >
              <option value="AUTO">Auto (Continuous)</option>
              <option value="FIXED">Fixed On the Hour/Half-Hour</option>
            </select>
            {error?.slotInterval?.message && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error.slotInterval.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 p-4 md:col-span-2">
            <div>
              <p className="font-medium text-white">Auto-Confirm Bookings</p>

              <p className="mt-1 text-xs">
                Automatically accept appointments without manual review.
              </p>

              <button
                type="button"
                onClick={() =>
                  handleChange(
                    "autoConfirmBookings",
                    !rules.autoConfirmBookings,
                  )
                }
                className={`
                  relative mt-2 h-6 w-11 rounded-full
                  transition-colors xsxs:block md:hidden
                  ${rules.autoConfirmBookings ? "bg-[#1dc465]" : "bg-gray-600"}
                `}
              >
                <div
                  className={`
                    absolute left-1 top-1 h-4 w-4 rounded-full bg-white
                    transition-transform
                    ${rules.autoConfirmBookings ? "translate-x-5" : ""}
                  `}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                handleChange("autoConfirmBookings", !rules.autoConfirmBookings)
              }
              className={`
                relative h-6 w-11 shrink-0 rounded-full
                transition-colors xsxs:hidden md:block
                ${rules.autoConfirmBookings ? "bg-[#1dc465]" : "bg-gray-600"}
              `}
            >
              <div
                className={`
                  absolute left-1 top-1 h-4 w-4 rounded-full bg-white
                  transition-transform
                  ${rules.autoConfirmBookings ? "translate-x-5" : ""}
                `}
              />
            </button>
            {error?.autoConfirmBookings?.message && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error.autoConfirmBookings.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 p-4 md:col-span-2">
            <div>
              <p className="font-medium text-white">Allow Rescheduling</p>

              <p className="mt-1 text-xs">
                Allow patients to reschedule existing appointments.
              </p>

              <button
                type="button"
                onClick={() =>
                  handleChange("allowReschedule", !rules.allowReschedule)
                }
                className={`
                  relative mt-2 h-6 w-11 rounded-full
                  transition-colors xsxs:block md:hidden
                  ${rules.allowReschedule ? "bg-[#1dc465]" : "bg-gray-600"}
                `}
              >
                <div
                  className={`
                    absolute left-1 top-1 h-4 w-4 rounded-full bg-white
                    transition-transform
                    ${rules.allowReschedule ? "translate-x-5" : ""}
                  `}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                handleChange("allowReschedule", !rules.allowReschedule)
              }
              className={`
                relative h-6 w-11 shrink-0 rounded-full
                transition-colors xsxs:hidden md:block
                ${rules.allowReschedule ? "bg-[#1dc465]" : "bg-gray-600"}
              `}
            >
              <div
                className={`
                  absolute left-1 top-1 h-4 w-4 rounded-full bg-white
                  transition-transform
                  ${rules.allowReschedule ? "translate-x-5" : ""}
                `}
              />
            </button>
            {error?.allowReschedule?.message && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {error.allowReschedule.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {disabled && (
        <LockedOverlay
          disabled={disabled}
          title="Slot & Booking Rules Locked"
          description="Complete the weekly schedule setup first to configure your slot
             and booking rules."
        />
      )}
    </div>
  );
};
