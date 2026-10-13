import type { DayOfWeek, ServiceMode } from "@/types/common";
import type { WeeklyScheduleProps } from "@/types/doctor-clinic";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { NumberBadge } from "../../number-badge.shared";
import { useWeeklySchedule } from "@/hooks/use-weekly-schedule.hook";

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  schedule,
  onChange,
  selectedClinicId,
  scheduleLength,
  error,
}) => {
  const [inlineFormDay, setInlineFormDay] = useState<string | null>(null);
  const [showGlobalForm, setShowGlobalForm] = useState(false);
  const [newShift, setNewShift] = useState({
    day: "MONDAY",
    startTime: "09:00",
    endTime: "17:00",
    mode: "ONLINE" as ServiceMode,
  })

  const days = schedule;

  const {
    validateAndAddShift,
    deleteLastShift,
    errorMsg,
    setErrorMsg
  } = useWeeklySchedule({
    schedule,
    onChange,
    selectedClinicId
  })

  return (
    <div className="w-full bg-[#0d1a27] border border-white/10 rounded-lg p-3 xxs:p-4 xs:p-5">
      <div className="flex items-center mb-6">
        <NumberBadge number={1} />
        <h2 className="text-xl font-semibold text-white ml-2">
          Weekly Schedule
        </h2>
      </div>

      <div className="space-y-4 w-full">
        {schedule
          ? days.map((day) => {
              const daySchedule = schedule.find(
                (schedule) => schedule.dayOfWeek === day.dayOfWeek,
              );
              const shifts = daySchedule?.shifts ?? [];
              const hasShifts = shifts.length > 0;
              return (
                <div key={day.dayOfWeek} className="flex flex-col gap-3">
                  {" "}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 min-w-0">
                    {" "}
                    <span className="text-sm font-medium text-white shrink-0 sm:w-14 md:w-16 sm:pt-2">
                      {" "}
                      {day.dayOfWeek.toUpperCase().slice(0, 3)}{" "}
                    </span>{" "}
                    <div className="flex-1 min-w-0">
                      {" "}
                      {!hasShifts ? (
                        <span className="block w-full text-red-400 border border-red-400/50 p-2 rounded-[10px] text-xs sm:text-sm text-center">
                          {" "}
                          DAY OFF{" "}
                        </span>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {" "}
                          {shifts.map((shift) => {
                            const isOnline = shift.mode === "ONLINE";
                            const isOffline = shift.mode === "OFFLINE";
                            return (
                              <div
                                key={shift.id}
                                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 w-full min-w-0"
                              >
                                {" "}
                                <div className="flex flex-1 items-center gap-2 min-w-0">
                                  {" "}
                                  {/* Start Time */}{" "}
                                  <span className="shrink-0 text-sm font-medium text-white">
                                    {" "}
                                    {shift.startTime}{" "}
                                  </span>{" "}
                                  {/* Mode Indicator */}{" "}
                                  <div className="h-1.5 flex-1 min-w-3 overflow-hidden rounded-full">
                                    {" "}
                                    {isOnline && (
                                      <div className="h-full w-full bg-blue-500" />
                                    )}{" "}
                                    {isOffline && (
                                      <div className="h-full w-full bg-green-500" />
                                    )}{" "}
                                  </div>{" "}
                                  {/* End Time */}{" "}
                                  <span className="shrink-0 text-sm font-medium text-white">
                                    {" "}
                                    {shift.endTime}{" "}
                                  </span>{" "}
                                </div>{" "}
                              </div>
                            );
                          })}{" "}
                        </div>
                      )}{" "}
                    </div>{" "}
                    {/* Actions */}{" "}
                    <div className="flex sm:flex-col items-center justify-end sm:justify-start gap-1 shrink-0">
                      {" "}
                      {/* Add Shift */}{" "}
                      <button
                        onClick={() => {
                          setInlineFormDay(
                            inlineFormDay === day.dayOfWeek
                              ? null
                              : day.dayOfWeek,
                          );
                          setErrorMsg("");
                        }}
                        className="p-2 rounded-full hover:bg-white/10 text-[#1dc465]"
                        title="Add shift"
                      >
                        {" "}
                        <Plus size={18} />{" "}
                      </button>{" "}
                      <button
                        onClick={() => deleteLastShift(day.dayOfWeek)}
                        disabled={!hasShifts}
                        title={hasShifts ? "Clear day" : "No shifts to delete"}
                        className={`p-2 rounded-full transition-colors ${hasShifts ? "hover:bg-white/10 text-[#8b9ab0] hover:text-red-400" : "text-white/10 cursor-not-allowed"}`}
                      >
                        {" "}
                        <Trash2 size={16} />{" "}
                      </button>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Inline Add Shift Form */}{" "}
                  {inlineFormDay === day.dayOfWeek && (
                    <div className="mt-2 w-full p-3 bg-white/5 rounded border border-white/10 flex flex-col sm:flex-row flex-wrap gap-4 sm:items-end">
                      {" "}
                      {/* Start Time */}{" "}
                      <div className="flex flex-col gap-1 w-full sm:w-auto">
                        {" "}
                        <label className="text-xs text-white">
                          {" "}
                          Start Time{" "}
                        </label>{" "}
                        <input
                          type="time"
                          value={newShift.startTime}
                          onChange={(e) =>
                            setNewShift({
                              ...newShift,
                              startTime: e.target.value,
                            })
                          }
                          className="bg-[#0d1a27] border border-white/10 rounded px-2 py-1 text-white text-sm w-full"
                        />{" "}
                      </div>{" "}
                      {/* End Time */}{" "}
                      <div className="flex flex-col gap-1 w-full sm:w-auto">
                        {" "}
                        <label className="text-xs text-white">
                          {" "}
                          End Time{" "}
                        </label>{" "}
                        <input
                          type="time"
                          value={newShift.endTime}
                          onChange={(e) =>
                            setNewShift({
                              ...newShift,
                              endTime: e.target.value,
                            })
                          }
                          className="bg-[#0d1a27] border border-white/10 rounded px-2 py-1 text-white text-sm w-full"
                        />{" "}
                      </div>{" "}
                      {/* Mode */}{" "}
                      <div className="flex flex-col gap-1 w-full sm:w-auto">
                        {" "}
                        <label className="text-xs text-white">
                          {" "}
                          Mode{" "}
                        </label>{" "}
                        <select
                          value={newShift.mode}
                          onChange={(e) =>
                            setNewShift({
                              ...newShift,
                              mode: e.target.value as ServiceMode,
                            })
                          }
                          className="bg-[#0d1a27] border border-white/10 rounded px-2 py-1 text-white text-sm w-full"
                        >
                          {" "}
                          <option value="ONLINE">Online</option>{" "}
                          <option value="OFFLINE">Offline</option>{" "}
                        </select>{" "}
                      </div>{" "}
                      <button
                        onClick={() => {
                          setInlineFormDay(null);
                        }}
                        className="bg-gray-400 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-500 cursor-pointer w-full sm:w-auto"
                      >
                        {" "}
                        Cancel{" "}
                      </button>{" "}
                      <button
                        onClick={() => {
                          if (
                            validateAndAddShift(
                              day.dayOfWeek,
                              newShift.startTime,
                              newShift.endTime,
                              newShift.mode,
                            )
                          ) {
                            setInlineFormDay(null);
                          }
                        }}
                        className="bg-[#1dc465] text-[#0d1a27] px-4 py-1.5 rounded text-sm font-medium hover:bg-[#19a955] cursor-pointer w-full sm:w-auto "
                      >
                        {" "}
                        Save{" "}
                      </button>{" "}
                      {errorMsg && (
                        <p className="text-red-400 text-xs w-full mt-1">
                          {" "}
                          {errorMsg}{" "}
                        </p>
                      )}{" "}
                    </div>
                  )}{" "}
                </div>
              );
            })
          : ""}
      </div>
      {error && <h4 className="text-red-600">{error?.message}</h4>}
      <div className="mt-6">
        {!showGlobalForm ? (
          <button
            onClick={() => {
              setShowGlobalForm(true);
              setErrorMsg("");
            }}
            className="w-full py-3 border border-dashed border-[#1dc465]/50 text-[#1dc465] rounded-lg hover:bg-[#1dc465]/10 flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Add Shift
          </button>
        ) : (
          <div className="p-4 border border-white/10 rounded-lg bg-white/5 space-y-4">
            <h3 className="text-white text-sm font-medium">Add New Shift</h3>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#8b9ab0]">
                  Day
                </label>
                <select
                  value={newShift.day.toUpperCase()}
                  onChange={(e) =>
                    setNewShift({
                      ...newShift,
                      day: e.target.value.toUpperCase(),
                    })
                  }
                  className="bg-[#0d1a27] border border-white/10 rounded-md px-3 py-2 text-white text-sm w-full outline-none focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/40 transition-colors"
                >
                  {schedule.map((d) => (
                    <option key={d.dayOfWeek} value={d.dayOfWeek}>
                      {d.dayOfWeek.charAt(0).toUpperCase() +
                        d.dayOfWeek.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#8b9ab0]">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newShift.startTime}
                  onChange={(e) =>
                    setNewShift({ ...newShift, startTime: e.target.value })
                  }
                  className="bg-[#0d1a27] border border-white/10 rounded-md px-3 py-2 text-white text-sm w-full outline-none focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/40 transition-colors [color-scheme:dark]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#8b9ab0]">
                  End Time
                </label>
                <input
                  type="time"
                  value={newShift.endTime}
                  onChange={(e) =>
                    setNewShift({ ...newShift, endTime: e.target.value })
                  }
                  className="bg-[#0d1a27] border border-white/10 rounded-md px-3 py-2 text-white text-sm w-full outline-none focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/40 transition-colors [color-scheme:dark]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#8b9ab0]">
                  Mode
                </label>
                <select
                  value={newShift.mode}
                  onChange={(e) =>
                    setNewShift({
                      ...newShift,
                      mode: e.target.value as ServiceMode,
                    })
                  }
                  className="bg-[#0d1a27] border border-white/10 rounded-md px-3 py-2 text-white text-sm w-full outline-none focus:border-[#1dc465]/60 focus:ring-1 focus:ring-[#1dc465]/40 transition-colors"
                >
                  <option value="ONLINE">Online</option>
                  <option value="OFFLINE">Offline</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
                {errorMsg}
              </p>
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-1">
              <button
                onClick={() => setShowGlobalForm(false)}
                className="px-4 py-2 text-sm text-[#8b9ab0] hover:text-white transition-colors rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (
                    validateAndAddShift(
                      newShift.day as DayOfWeek,
                      newShift.startTime,
                      newShift.endTime,
                      newShift.mode,
                    )
                  ) {
                    setShowGlobalForm(false);
                  }
                }}
                className="bg-[#1dc465] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#19a955] transition-colors"
              >
                Add Shift
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
