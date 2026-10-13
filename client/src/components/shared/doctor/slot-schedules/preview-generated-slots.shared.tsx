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
    totalDays,
  } = usePreviewGeneratedSlots({
    previewSlots,
    onDateChange,
  });

  return (
    <div className="relative w-full min-w-0 rounded-lg border border-[#1dc465]/30 bg-[#0d1a27] p-3 text-[#8b9ab0] shadow-[0_0_20px_rgba(29,196,101,0.05)] sm:p-5 lg:p-6">
      <div className="mb-5 flex min-w-0 flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <NumberBadge number={4} className="shrink-0" />

          <h2 className="min-w-0 text-base font-semibold leading-snug text-white sm:text-lg lg:text-xl">
            Preview Generated Slots
          </h2>
        </div>

        <div className="flex w-full min-w-0 items-center justify-between gap-1 rounded-lg bg-white/5 p-1 sm:w-auto sm:shrink-0">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous day"
            className={arrowCls}
          >
            <ChevronLeft size={18} />
          </button>

          <span className="min-w-0 flex-1 px-1 text-center text-xs font-medium text-white sm:min-w-[140px] sm:px-2 sm:text-sm">
            {index === 0 && (
              <span className="mr-1 text-[#1dc465]">Today ·</span>
            )}

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

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs sm:text-sm">
          Total Slots:{" "}
          <span className="font-bold text-white">{slots.length}</span>
        </p>

        <span className="rounded bg-[#1dc465]/10 px-2 py-1 text-[10px] text-[#1dc465] sm:text-xs">
          Day {index + 1} of {TOTAL_DAYS}
        </span>
      </div>

      <ScrollArea className="mb-5 h-[320px] w-full sm:mb-6 sm:h-[360px]">
        <div className="min-w-0 space-y-5 pr-3 sm:space-y-6">
          <section className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1dc465]">
                Available ({availableSlots.length})
              </h3>

              {selectedKey && (
                <span className="text-[10px] leading-relaxed text-orange-300 sm:text-xs">
                  Pick a replaceable slot to swap
                </span>
              )}
            </div>

            <div className={slotGridCls}>
              {availableSlots.length === 0 ? (
                <div className="col-span-full rounded-lg border border-dashed border-white/10 px-3 py-6 text-center text-xs sm:text-sm">
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
                          ? "border-[#1dc465] bg-[#1dc465]/15 ring-1 ring-[#1dc465]"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="flex min-w-0 items-start gap-2 text-xs font-medium text-white sm:text-sm">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#1dc465]" />

                        <span className="min-w-0 wrap-break-word">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </span>

                      <span className="wrap-break-word pl-4 text-[10px] uppercase text-[#8b9ab0] sm:text-xs">
                        {slot.mode}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          <section className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Replaceable ({replaceableSlots.length})
              </h3>

              {!selectedKey && replaceableSlots.length > 0 && (
                <span className="text-[10px] text-[#8b9ab0] sm:text-xs">
                  Select an available slot first
                </span>
              )}
            </div>

            <div className={slotGridCls}>
              {replaceableSlots.length === 0 ? (
                <div className="col-span-full rounded-lg border border-dashed border-white/10 px-3 py-6 text-center text-xs sm:text-sm">
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
                        : "cursor-not-allowed border-white/10 bg-white/5 opacity-60"
                    }`}
                  >
                    <span className="flex min-w-0 items-start gap-2 text-xs font-medium text-white sm:text-sm">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-400" />

                      <span className="min-w-0 wrap-break-word">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </span>

                    <span className="wrap-break-word pl-4 text-[10px] uppercase text-[#8b9ab0] sm:text-xs">
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

      {existingBookings && existingBookings.length > 0 && (
        <div className="mb-5 flex min-w-0 items-start gap-3 rounded-lg border border-orange-500/20 bg-orange-500/10 p-3 sm:mb-6 sm:p-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-orange-400" />

          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-medium text-orange-400 sm:text-sm">
              Warning: Conflict with existing bookings
            </p>

            <p className="mb-2 text-xs leading-relaxed">
              Changing these rules may affect slots that already have patients
              scheduled.
            </p>

            <ul className="list-disc space-y-1 wrap-break-word pl-4 text-xs text-orange-300">
              {existingBookings.map((booking) => (
                <li key={booking.slotId}>
                  {booking.date} at {booking.startTime} - {booking.patientName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {previewSlots.length > 0 && (
        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className="w-full rounded-lg cursor-pointer bg-[#1dc465] px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#19a955] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 sm:text-base"
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

      {previewSlots.length === 0 && (
        <LockedOverlay
          disabled={previewSlots.length === 0}
          title="Slot Preview Locked"
          description="Complete your weekly schedule and generate slots to unlock the preview and review available appointment times."
          isPreviousWarns={true}
          previousWarnMessage="Generate Slot Preview"
        />
      )}
    </div>
  );
};
