
import { useState } from "react";
import toast from "react-hot-toast";

import { timeToMinutes } from "@/helpers/session-slot.helper";
import { useAuthStore } from "@/store";
import type { DayOfWeek, ServiceMode } from "@/types/common";
import type {
  Shift,
  UseWeeklyScheduleParams,
} from "@/types/doctor-clinic";

export const useWeeklySchedule = ({
  schedule,
  onChange,
  selectedClinicId,
}: UseWeeklyScheduleParams) => {
  const doctorDetails = useAuthStore((state) => state.doctor);
  const [errorMsg, setErrorMsg] = useState("");

  const validateAndAddShift = (
    day: DayOfWeek,
    start: string,
    end: string,
    mode: ServiceMode,
  ): boolean => {
    setErrorMsg("");

    if (!doctorDetails) return false;

    const startMin = timeToMinutes(start);
    const endMin = timeToMinutes(end);

    if (endMin <= startMin) {
      setErrorMsg("End time must be after start time.");
      return false;
    }

    const otherClinics =
      doctorDetails.doctorClinicDetails.filter(
        (dc) => dc.clinic?.id !== selectedClinicId,
      );

    const hasClinicConflict = otherClinics.some((dc) =>
      dc.weeklySchedule.some((daySchedule) =>
        daySchedule.shifts.some((shift) => {
          const existingStart = timeToMinutes(
            shift.startTime,
          );
          const existingEnd = timeToMinutes(
            shift.endTime,
          );

          return (
            startMin < existingEnd &&
            endMin > existingStart
          );
        }),
      ),
    );

    if (hasClinicConflict) {
      setErrorMsg(
        "This time slot conflicts with an existing schedule at another clinic.",
      );
      return false;
    }

    const dayShifts =
      schedule.find((item) => item.dayOfWeek === day)
        ?.shifts ?? [];

    const hasOverlap = dayShifts.some((shift) => {
      const existingStart = timeToMinutes(
        shift.startTime,
      );
      const existingEnd = timeToMinutes(
        shift.endTime,
      );

      return (
        startMin < existingEnd &&
        endMin > existingStart
      );
    });

    if (hasOverlap) {
      setErrorMsg(
        "Shift overlaps with an existing shift on this day.",
      );
      return false;
    }

    const newShift: Shift = {
      id: crypto.randomUUID(),
      startTime: start,
      endTime: end,
      mode,
    };

    const updatedShifts = [...dayShifts, newShift].sort(
      (a, b) =>
        timeToMinutes(a.startTime) -
        timeToMinutes(b.startTime),
    );

    onChange({
      dayOfWeek: day,
      shifts: updatedShifts,
    });

    toast.success(
      `Shift added — ${day.slice(0, 3)} ${start}-${end} (${mode})`,
    );

    return true;
  };

  const deleteLastShift = (day: DayOfWeek) => {
    const dayShifts =
      schedule.find((item) => item.dayOfWeek === day)
        ?.shifts ?? [];

    if (dayShifts.length === 0) return;

    const updatedShifts = dayShifts.slice(0, -1);

    onChange({
      dayOfWeek: day,
      shifts: updatedShifts,
    });

    if (updatedShifts.length === 0) {
      toast.success(
        `${day.slice(0, 3)} cleared — now DAY OFF`,
      );
    }
  };

  return {
    errorMsg,
    setErrorMsg,
    validateAndAddShift,
    deleteLastShift,
  };
};
