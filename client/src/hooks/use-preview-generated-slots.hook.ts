import { useMemo, useState } from "react";

import { dateKey } from "@/helpers/session-slot.helper";
import type {
  PreviewHookProps,
  SlotStatus,
  UsePreviewGeneratedSlotsReturn,
} from "@/types/doctor-clinic";

const TOTAL_DAYS = 30;

export const usePreviewGeneratedSlots = ({
  previewSlots,
  onDateChange,
}: PreviewHookProps): UsePreviewGeneratedSlotsReturn => {
  const [index, setIndex] = useState(0);

  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, SlotStatus>
  >({});

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const days = useMemo(() => {
    const byDate = new Map(
      previewSlots.map((preview) => [dateKey(preview.date), preview.slots]),
    );

    const today = new Date();

    return Array.from({ length: TOTAL_DAYS }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      return {
        date,
        slots: byDate.get(dateKey(date)) ?? [],
      };
    });
  }, [previewSlots]);

  const currentDay = days[index];
  const date = currentDay.date;
  const slots = currentDay.slots;
  const dayKey = dateKey(date);

  const slotKey = (startTime: string) => `${dayKey}|${startTime}`;

  const getStatus = (slot: (typeof slots)[number]): SlotStatus => {
    const originalStatus = (slot as { status?: SlotStatus }).status;

    return (
      statusOverrides[slotKey(slot.startTime)] ?? originalStatus ?? "AVAILABLE"
    );
  };
  const availableSlots = slots.filter(
    (slot) => getStatus(slot) === "AVAILABLE",
  );

  const replaceableSlots = slots.filter(
    (slot) => getStatus(slot) === "REPLACEABLE",
  );

  const handleAvailableClick = (startTime: string) => {
    const key = slotKey(startTime);

    setSelectedKey((previous) => (previous === key ? null : key));
  };

  const handleReplaceableClick = (startTime: string) => {
    if (!selectedKey) return;

    const replaceKey = slotKey(startTime);

    setStatusOverrides((previous) => ({
      ...previous,
      [selectedKey]: "REPLACEABLE",
      [replaceKey]: "AVAILABLE",
    }));

    setSelectedKey(null);
  };

  const go = (step: number) => {
    const next = Math.min(Math.max(index + step, 0), TOTAL_DAYS - 1);

    setIndex(next);
    setSelectedKey(null);

    onDateChange?.(days[next].date);
  };

  return {
    index,
    totalDays: TOTAL_DAYS,
    date,
    slots,
    selectedKey,
    availableSlots,
    replaceableSlots,
    slotKey,
    handleAvailableClick,
    handleReplaceableClick,
    go,
  };
};
