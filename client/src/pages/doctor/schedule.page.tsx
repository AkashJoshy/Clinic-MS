import { CalendarClock, ChevronDown, CircleHelp, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { SlotRulesPreferences } from "@/components/shared/doctor/slot-schedules/rules-preferences.shared";
import { WeeklySchedule } from "@/components/shared/doctor/slot-schedules/weekly-schedule.shared";
import DoctorPageHeader from "@/components/shared/page-header.shared";
import { Exceptions } from "@/components/shared/doctor/slot-schedules/exceptions.shared";
import { useScheduleForm } from "@/hooks/use-schedule-form.hook";
import { useMutate } from "@/hooks/use-mutate.hook";
import type {
  ConfirmedSlots,
  GenerateSlotsData,
  SlotsWithDate,
} from "@/types/doctor-clinic";
import { useAuthStore } from "@/store";
import { updateDoctorSchedule } from "@/services/doctor.service";

const SchedulePage = () => {
  const [previewSlots, setPreviewSlots] = useState<SlotsWithDate[]>([]);

  const doctor = useAuthStore((state) => state.users.doctor);
  const updateDoctor = useAuthStore((state) => state.updateDoctor);
  const isDark = doctor?.theme === "DARK";

  const { mutate, isPending } = useMutate(updateDoctorSchedule, {
    onSuccess(data) {
      const scheduleData = data.data;

      if (scheduleData) {
        const updatedClinicDetails = doctorDetails?.doctorClinicDetails.map(
          (dc) =>
            dc.clinic?.id === scheduleData.clinicId
              ? {
                  ...dc,
                  weeklySchedule: scheduleData.weeklySchedule,
                  slotRules: scheduleData.slotRules,
                  exceptions: scheduleData.exceptions,
                }
              : dc,
        );

        updateDoctor({
          doctorClinicDetails: updatedClinicDetails,
        });

        reset(scheduleData);

        document.getElementById("doctor-main-layout")?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
  });

  const {
    exceptions,
    handleClinicChange,
    schedule,
    scheduleLength,
    setExceptions,
    setSchedule,
    setSlotRules,
    slotRules,
    selectedClinicId,
    doctorDetails,
    selectedClinic,
    errors,
    handleSubmit,
    register,
    setValue,
    isSubmitted,
    watch,
    trigger,
    isDirty,
    reset,
    handleSchedule,
  } = useScheduleForm<GenerateSlotsData>(mutate);

  const mutedTextClass = isDark ? "text-white/50" : "text-slate-500";
  const headingTextClass = isDark ? "text-white" : "text-slate-900";

  useEffect(() => {
    return () => {
      setPreviewSlots([]);
    };
  }, []);

  return (
    <div
      id="schedule-page"
      className={`relative min-h-full space-y-6 border p-6 shadow-2xs lg:p-8 ${
        isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
      }`}
    >
      <DoctorPageHeader
        icon={CalendarClock}
        title="Session Management"
        description="Manage your weekly appointment slots"
        isDark={isDark}
      />

      <div
        className={`flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className={`text-lg font-semibold ${headingTextClass}`}>
              Session Schedule
            </h2>

            <CircleHelp
              className={`h-5 w-5 cursor-help transition-colors ${
                isDark
                  ? "text-white/40 hover:text-white/70"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            />
          </div>

          <p className={`text-[15px] ${mutedTextClass}`}>
            Configure appointment availability for your clinic.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-[240px]">
            <label
              className={`mb-1.5 block text-[11px] font-medium uppercase tracking-wider ${
                isDark ? "text-white/40" : "text-slate-500"
              }`}
            >
              Managing clinic
            </label>

            <div className="group relative">
              <select
                value={selectedClinicId ?? ""}
                onChange={(e) => handleClinicChange(e.target.value)}
                className={`h-10 w-full appearance-none rounded-lg border pl-10 pr-9 text-sm font-medium outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/10 ${
                  isDark
                    ? "border-white/10 bg-white/[0.04] text-white hover:border-white/20"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {doctorDetails?.doctorClinicDetails
                  .filter((dc) => dc.clinic !== null)
                  .map((dc) => (
                    <option
                      key={dc?.clinic?.id}
                      value={dc?.clinic?.id!}
                      className={
                        isDark
                          ? "bg-[#0d1a27] text-white"
                          : "bg-white text-slate-700"
                      }
                    >
                      {dc?.clinic?.name}
                    </option>
                  ))}
              </select>

              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />

              <ChevronDown
                className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform group-focus-within:rotate-180 ${
                  isDark ? "text-white/40" : "text-slate-400"
                }`}
              />
            </div>

            {selectedClinic && (
              <p
                className={`mt-1 truncate px-1 text-[11px] ${
                  isDark ? "text-white/35" : "text-slate-400"
                }`}
              >
                {selectedClinic.clinicAddress?.country}
                {", "}
                {selectedClinic.clinicAddress?.city}
              </p>
            )}
          </div>
        </div>
      </div>

      {selectedClinic && (
        <div
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
            isDark
              ? "border-primary/10 bg-primary/[0.04]"
              : "border-primary/20 bg-primary/[0.04]"
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-4 w-4 text-primary" />
          </div>

          <div className="min-w-0">
            <p
              className={`text-xs ${
                isDark ? "text-white/40" : "text-slate-500"
              }`}
            >
              Currently configuring
            </p>

            <p className={`truncate text-sm font-semibold ${headingTextClass}`}>
              {selectedClinic.clinic?.name}
            </p>
          </div>
        </div>
      )}

      <div className="grid w-full min-w-0 grid-cols-1 gap-5 2xl:grid-cols-2">
        <div className="min-w-0">
          {selectedClinic && schedule && selectedClinicId && (
            <WeeklySchedule
              schedule={schedule}
              scheduleLength={scheduleLength}
              selectedClinicId={selectedClinicId}
              isDark={isDark}
              onChange={async (value) => {
                const updatedSchedule = schedule.map((sc) =>
                  sc.dayOfWeek === value.dayOfWeek
                    ? { ...sc, shifts: value.shifts }
                    : sc,
                );

                setSchedule(updatedSchedule);
                setValue("weeklySchedule", updatedSchedule, {
                  shouldValidate: isSubmitted,
                });

                if (isSubmitted) {
                  await trigger("weeklySchedule");
                }
              }}
              error={errors.weeklySchedule}
            />
          )}
        </div>

        <div className="min-w-0">
          {slotRules && (
            <SlotRulesPreferences
              rules={slotRules}
              isDark={isDark}
              onChange={(value) => {
                setSlotRules(value);
                setValue("slotRules", value, {
                  shouldDirty: true,
                  shouldValidate: isSubmitted,
                });
              }}
              disabled={scheduleLength === 0}
              error={errors.slotRules}
            />
          )}
        </div>

        <div className="min-w-0">
          {exceptions && (
            <Exceptions
              exceptions={exceptions}
              isDark={isDark}
              onChange={(value) => {
                setExceptions(value);
                setValue("exceptions", value);
              }}
              isPending={isPending}
              isDirty={isDirty}
              handleSchedule={handleSchedule}
              disabled={scheduleLength === 0}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
