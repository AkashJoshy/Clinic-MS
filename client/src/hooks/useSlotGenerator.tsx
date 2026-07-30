import type { Slot } from "@/types/booking";
import type { DoctorSlot } from "@/types/clinic";
import type { ServiceMode } from "@/types/common";
import { useState } from "react";

function toMinutes(time: string): [number, number] {
  const [h, m] = time.split(":").map(Number);
  return [h * 60 + m, m];
}

function toTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function generateSlots(
  start: string,
  end: string,
  durationMin: number,
  type: ServiceMode,
): DoctorSlot[] {
  const [startMin, startSec] = toMinutes(start);
  const [endMin, endSec] = toMinutes(end);
  const slots: DoctorSlot[] = [];
  for (let t = startMin; t + durationMin <= endMin - endSec; t += durationMin) {
    slots.push({
      id: t,
      startTime: `${toTimeString(t)}`,
      endTime: `${toTimeString(t + durationMin)}`,
      type,
      isSelected: false,
    });
  }
  return slots;
}

function parseSlot(slot: string) {
  const [start, end] = slot.split("–");

  return {
    start: toMinutes(start)[0],
    end: toMinutes(end)[0],
  };
}

function isOverlapping(slot1: string, slot2: string) {
  const a = parseSlot(slot1);
  const b = parseSlot(slot2);

  return a.start < b.end && a.end > b.start;
}

function mergeSlots(existing: string[], incoming: string[]) {
  const merged = [...existing];

  for (const newSlot of incoming) {
    const overlaps = merged.some((slot) => isOverlapping(slot, newSlot));

    if (!overlaps) {
      merged.push(newSlot);
    }
  }

  return merged.sort((a, b) => parseSlot(a).start - parseSlot(b).start);
}

export function useSlotGenerator() {

  const [error, setError] = useState<string | null>(null);

  const generate = (type: ServiceMode, startTime: string, endTime: string, duration: number): DoctorSlot[] | null => {
    if (!startTime || !endTime) return fail("Pick a start and end time.");
    if (!duration || duration <= 0)
      return fail("Duration must be greater than 0.");
    if (toMinutes(endTime)[0] <= toMinutes(startTime)[0])
      return fail("End time must be after start time.");
    if (toMinutes(endTime)[0] - toMinutes(startTime)[0] < duration)
      return fail("The time range is shorter than one slot.");

    setError(null);
    return generateSlots(startTime, endTime, duration, type);
  };

  const fail = (msg: string) => {
    setError(msg);
    return null;
  };

  const mergeGeneratedSlots = (
    existingSlots: string[],
    newGeneratedSlots: string[],
  ) => {
    return mergeSlots(existingSlots, newGeneratedSlots);
  };

  return {
    error,
    generate,
    mergeGeneratedSlots,
  };
}
