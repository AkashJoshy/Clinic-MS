import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import type { PreviewGeneratedSlotsProps } from "@/types/doctor-clinic";
import { NumberBadge } from "../../number-badge.shared";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  arrowCls,
  slotCardCls,
  slotGridCls,
} from "@/constants/doctor-clinic.constant";
import { usePreviewGeneratedSlots } from "@/hooks/use-preview-generated-slots.hook";
import { LockedOverlay } from "./locked-overlay.shared";

const TOTAL_DAYS = 30;

export const PreviewGeneratedSlots: React.FC<PreviewGeneratedSlotsProps> = ({
  previewSlots,
  onUnlock,
  onDateChange,
  isPending,
  onConfirm,
  existingBookings,
  isDark,
}) => {
  const {
    availableSlots,
    date,
    go,
    handleAvailableClick,
    handleReplaceableClick,
    index,
    replaceableSlots,
    selectedKey,
    slotKey,
    slots,
  } = usePreviewGeneratedSlots({
    previewSlots,
    onDateChange,
  });

  const cardClass = isDark
    ? "border-primary/30 bg-[#0d1a27] text-[#8b9ab0]"
    : "border-slate-200 bg-white text-slate-600";

  const headingClass = isDark ? "text-white" : "text-slate-900";

  const mutedTextClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";

  const navigationClass = isDark ? "bg-white/5" : "bg-slate-100";

  const emptyClass = isDark
    ? "border-white/10 text-[#8b9ab0]"
    : "border-slate-200 text-slate-500";

  const slotBaseClass = isDark
    ? "border-white/10 bg-white/5 hover:bg-white/10"
    : "border-slate-200 bg-slate-50 hover:bg-slate-100";

  const slotTextClass = isDark ? "text-white" : "text-slate-800";

  const slotModeClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";

  return (
    <div
      className={`relative w-full min-w-0 rounded-lg border p-3 shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_5%,transparent)] sm:p-5 lg:p-6 ${cardClass}`}
    >
      {/* Header */}
      <div className="mb-5 flex min-w-0 flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <div className="shrink-0 [&_*]:!border-primary [&_*]:!bg-primary/10 [&_*]:!text-primary">
            <NumberBadge number={4} className="shrink-0" />
          </div>

          <h2
            className={`min-w-0 text-base font-semibold leading-snug sm:text-lg lg:text-xl ${headingClass}`}
          >
            Preview Generated Slots
          </h2>
        </div>

        {/* Date Navigation */}
        <div
          className={`flex w-full min-w-0 items-center justify-between gap-1 rounded-lg p-1 sm:w-auto sm:shrink-0 ${navigationClass}`}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous day"
            className={arrowCls}
          >
            <ChevronLeft size={18} />
          </button>

          <span
            className={`min-w-0 flex-1 px-1 text-center text-xs font-medium sm:min-w-[140px] sm:px-2 sm:text-sm ${headingClass}`}
          >
            {index === 0 && <span className="mr-1 text-primary">Today ·</span>}

            {date.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>

          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === TOTAL_DAYS - 1}
            aria-label="Next day"
            className={arrowCls}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slot Summary */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs sm:text-sm">
          Total Slots:{" "}
          <span className={`font-bold ${headingClass}`}>{slots.length}</span>
        </p>

        <span className="rounded bg-primary/10 px-2 py-1 text-[10px] text-primary sm:text-xs">
          Day {index + 1} of {TOTAL_DAYS}
        </span>
      </div>

      {/* Slots */}
      <ScrollArea className="mb-5 h-[320px] w-full sm:mb-6 sm:h-[360px]">
        <div className="min-w-0 space-y-5 pr-3 sm:space-y-6">
          {/* Available Slots */}
          <section className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                Available ({availableSlots.length})
              </h3>

              {selectedKey && (
                <span className="text-[10px] leading-relaxed text-orange-400 sm:text-xs">
                  Pick a replaceable slot to swap
                </span>
              )}
            </div>

            <div className={slotGridCls}>
              {availableSlots.length === 0 ? (
                <div
                  className={`col-span-full rounded-lg border border-dashed px-3 py-6 text-center text-xs sm:text-sm ${emptyClass}`}
                >
                  No available slots on this date.
                </div>
              ) : (
                availableSlots.map((slot) => {
                  const selected = selectedKey === slotKey(slot.startTime);

                  return (
                    <button
                      type="button"
                      key={slot.startTime}
                      onClick={() => handleAvailableClick(slot.startTime)}
                      aria-pressed={selected}
                      className={`${slotCardCls} ${
                        selected
                          ? "border-primary bg-primary/15 ring-1 ring-primary"
                          : slotBaseClass
                      }`}
                    >
                      <span
                        className={`flex min-w-0 items-start gap-2 text-xs font-medium sm:text-sm ${slotTextClass}`}
                      >
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />

                        <span className="min-w-0 wrap-break-word">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </span>

                      <span
                        className={`wrap-break-word pl-4 text-[10px] uppercase sm:text-xs ${slotModeClass}`}
                      >
                        {slot.mode}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          {/* Replaceable Slots */}
          <section className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Replaceable ({replaceableSlots.length})
              </h3>

              {!selectedKey && replaceableSlots.length > 0 && (
                <span className={`text-[10px] sm:text-xs ${mutedTextClass}`}>
                  Select an available slot first
                </span>
              )}
            </div>

            <div className={slotGridCls}>
              {replaceableSlots.length === 0 ? (
                <div
                  className={`col-span-full rounded-lg border border-dashed px-3 py-6 text-center text-xs sm:text-sm ${emptyClass}`}
                >
                  No replaceable slots on this date.
                </div>
              ) : (
                replaceableSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot.startTime}
                    disabled={!selectedKey}
                    onClick={() => handleReplaceableClick(slot.startTime)}
                    className={`${slotCardCls} ${
                      selectedKey
                        ? "border-orange-400/50 bg-orange-500/10 hover:bg-orange-500/20"
                        : `cursor-not-allowed border-transparent opacity-60 ${
                            isDark ? "bg-white/5" : "bg-slate-100"
                          }`
                    }`}
                  >
                    <span
                      className={`flex min-w-0 items-start gap-2 text-xs font-medium sm:text-sm ${slotTextClass}`}
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-400" />

                      <span className="min-w-0 wrap-break-word">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </span>

                    <span
                      className={`wrap-break-word pl-4 text-[10px] uppercase sm:text-xs ${slotModeClass}`}
                    >
                      {slot.mode}
                    </span>
                  </button>
                ))
              )}
            </div>
          </section>
        </div>

        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {/* Existing Booking Warnings */}
      {existingBookings && existingBookings.length > 0 && (
        <div className="mb-5 flex min-w-0 items-start gap-3 rounded-lg border border-orange-500/20 bg-orange-500/10 p-3 sm:mb-6 sm:p-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-orange-400" />

          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-medium text-orange-400 sm:text-sm">
              Warning: Conflict with existing bookings
            </p>

            <p className={`mb-2 text-xs leading-relaxed ${mutedTextClass}`}>
              Changing these rules may affect slots that already have patients
              scheduled.
            </p>

            <ul className="list-disc space-y-1 wrap-break-word pl-4 text-xs text-orange-400">
              {existingBookings.map((booking) => (
                <li key={booking.slotId}>
                  {booking.date} at {booking.startTime} - {booking.patientName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Confirm Generation */}
      {previewSlots.length > 0 && (
        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className="w-full cursor-pointer rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 sm:text-base"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating Slots...
            </span>
          ) : (
            "Confirm & Generate Slots"
          )}
        </button>
      )}

      {/* Locked State */}
      {previewSlots.length === 0 && (
        <LockedOverlay
          disabled={previewSlots.length === 0}
          title="Slot Preview Locked"
          description="Complete your weekly schedule and generate slots to unlock the preview and review available appointment times."
          isPreviousWarns={true}
          previousWarnMessage="Generate Slot Preview"
          isDark={isDark}
        />
      )}
    </div>
  );
};
