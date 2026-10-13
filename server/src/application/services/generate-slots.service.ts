import type {
  DayOfWeek,
} from "../../domain/types/shared.types.ts";
import {
  getDayName,
  minutesToTime,
  timeToMinutes,
} from "../../shared/utils/time.util.ts";
import type {
  DaySlotsDto,
  DoctorClinicScheduleWithoutIdDto,
  SlotsWithDateDto,
} from "../dto/doctor-clinic.dto.ts";
import type { IGenerateSlotsService } from "../i-service/i-generate-slots.service.ts";

export class GenerateSlotsService implements IGenerateSlotsService {
  execute(data: DoctorClinicScheduleWithoutIdDto): SlotsWithDateDto[] {
    const { weeklySchedule, exceptions, slotRules } = data;
    let {
      sessionDuration,
      bufferTime,
      slotInterval,
      bookingWindow,
      maxSessionsPerDay,
    } = slotRules;

    sessionDuration =
      slotInterval === "AUTO"
        ? (Number(sessionDuration) as number)
        : (30 as number);

    const breaks = exceptions.breaks.map((br) => ({
      start: timeToMinutes(br.startTime),
      end: timeToMinutes(br.endTime),
    }));

    const generatedSlots: DaySlotsDto[] = [];

    for (const schedule of weeklySchedule) {
      if (schedule.shifts.length === 0) continue;

      const day: DaySlotsDto = {
        dayOfWeek: schedule.dayOfWeek,
        slots: [],
      };

      for (const shift of schedule.shifts) {
        let cursor = timeToMinutes(shift.startTime);
        const shiftEnd = timeToMinutes(shift.endTime);

        while (cursor + sessionDuration <= shiftEnd) {
          const slotStart = cursor;
          const slotEnd = cursor + sessionDuration;

          const clash = breaks.find(
            (br) => slotStart < br.end && slotEnd > br.start,
          );

          if (clash) {
            cursor = clash.end;
            continue;
          }

          if (day.slots.length >= maxSessionsPerDay) {
            day.slots.push({
              startTime: minutesToTime(slotStart),
              endTime: minutesToTime(slotEnd),
              mode: shift.mode,
              status: "REPLACEABLE"
            });
          } else {
            day.slots.push({
              startTime: minutesToTime(slotStart),
              endTime: minutesToTime(slotEnd),
              mode: shift.mode,
              status: "AVAILABLE"
            });
          }

          cursor = slotEnd + bufferTime;
        }
      }

      generatedSlots.push(day);
    }
    const slotsWithDate: SlotsWithDateDto[] = [];
    const now = new Date();

    const allExceptions = [
      ...exceptions.blackouts,
      ...exceptions.holidays,
      ...exceptions.vacations,
    ];

    const toKey = (d: Date) => d.toLocaleDateString("en-CA"); // YYYY-MM-DD, local

    const findException = (date: Date) => {
      const key = toKey(date);

      return allExceptions.find((ex) => {
        const start = toKey(new Date(ex.startDate));
        const end = toKey(new Date(ex.endDate));

        return key >= start && key <= end;
      });
    };

    for (let i = 0; i < bookingWindow; i++) {
      const currentDate = new Date(now);

      currentDate.setDate(currentDate.getDate() + i);

      currentDate.setHours(0, 0, 0, 0);

      const day = getDayName(currentDate.getDay()) as DayOfWeek;

      const exception = findException(currentDate);

      if (exception) {
        slotsWithDate.push({
          date: toKey(currentDate),
          dayOfWeek: day,
          message: exception.reason,
          slots: [],
        });
        continue;
      }

      const matchingDay = generatedSlots.find((slot) => slot.dayOfWeek === day);

      slotsWithDate.push({
        date: toKey(currentDate),
        dayOfWeek: day,
        message: "Slots are available for this day",
        slots: matchingDay?.slots ?? [],
      });
    }

    return slotsWithDate;
  }
}
