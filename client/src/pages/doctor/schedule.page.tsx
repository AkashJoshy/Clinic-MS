import { CalendarClock, ChevronDown, CircleHelp, MapPin } from "lucide-react";
import { PreviewGeneratedSlots } from "@/components/shared/doctor/slot-schedules/preview-generated-slots.shared";
import { SlotRulesPreferences } from "@/components/shared/doctor/slot-schedules/rules-preferences.shared";
import { WeeklySchedule } from "@/components/shared/doctor/slot-schedules/weekly-schedule.shared";
import DoctorPageHeader from "@/components/shared/page-header.shared";
import { Exceptions } from "@/components/shared/doctor/slot-schedules/exceptions.shared";
import { useScheduleForm } from "@/hooks/use-schedule-form.hook";
import { confirmSlots, generateSlots } from "@/services/doctor.service";
import type {
  ConfirmedSlots,
  GenerateSlotsData,
  SlotsWithDate,
} from "@/types/doctor-clinic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutate } from "@/hooks/use-mutate.hook";

const SchedulePage = () => {
  const [previewSlots, setPreviewSlots] = useState<SlotsWithDate[]>([]);

  const { mutate, isPending } = useMutate(generateSlots, {
    onSuccess(data) {
      console.log(`Data iam getting from API`);
      console.log(data.data.generatedSlots);
      console.log(data.data.generatedSlots.length);
      if (data.data) {
        setSchedule(data.data.weeklySchedule);
        setSlotRules(data.data.slotRules);
        setExceptions(data.data.exceptions);
        setPreviewSlots(data.data.generatedSlots);
      }
    },
  });

  const { mutate: confirmSlotMutate, isPending: confirmSlotIsPending } =
    useMutate(confirmSlots, {
      onSuccess(data) {},
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
    handleGenerateSlots,
  } = useScheduleForm<GenerateSlotsData>(mutate);

  useEffect(() => {
    return () => {
      setPreviewSlots([]);
    };
  }, []);

  return (
    <div className="relative min-h-full space-y-6 border border-white/10 bg-white/[0.02] p-6 shadow-2xs lg:p-8">
      <DoctorPageHeader
        icon={CalendarClock}
        title="Session Management"
        description="Manage your weekly appointment slots"
      />

      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">
              {" "}
              Session Schedule{" "}
            </h2>

            <CircleHelp className="h-5 w-5 cursor-help text-white/40 transition-colors hover:text-white/70" />
          </div>

          <p className="text-[15px] text-white/50">
            Configure appointment availability for your clinic.
          </p>
        </div>

        <div className=" flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          {" "}
          <div className="w-full sm:w-[240px]">
            {" "}
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-white/40">
              {" "}
              Managing clinic{" "}
            </label>{" "}
            <div className="group relative">
              {" "}
              <select
                value={selectedClinicId ?? ""}
                onChange={(e) => handleClinicChange(e.target.value)}
                className=" h-10 w-full appearance-none rounded-lg border border-white/10 bg-white/[0.04] pl-10 pr-9 text-sm font-medium text-white outline-none transition-all hover:border-white/20 focus:border-[#1DC465]/50 focus:ring-2 focus:ring-[#1DC465]/10 "
              >
                {" "}
                {doctorDetails?.doctorClinicDetails
                  .filter((dc) => dc.clinic !== null)
                  .map((dc) => (
                    <option
                      key={dc?.clinic?.id}
                      value={dc?.clinic?.id!}
                      className="bg-[#0d1a27] text-white"
                    >
                      {" "}
                      {dc?.clinic?.name}{" "}
                    </option>
                  ))}{" "}
              </select>{" "}
              <MapPin className=" pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1DC465] " />{" "}
              <ChevronDown className=" pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 transition-transform group-focus-within:rotate-180 " />{" "}
            </div>{" "}
            {selectedClinic && (
              <p className="mt-1 truncate px-1 text-[11px] text-white/35">
                {" "}
                {selectedClinic.clinicAddress?.country}
                {", "}
                {selectedClinic.clinicAddress?.city}{" "}
              </p>
            )}{" "}
          </div>{" "}
        </div>
      </div>

      {selectedClinic && (
        <div className="flex items-center gap-3 rounded-xl border border-[#1DC465]/10 bg-[#1DC465]/[0.04] px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1DC465]/10">
            <MapPin className="h-4 w-4 text-[#1DC465]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-white/40">Currently configuring</p>

            <p className="truncate text-sm font-semibold text-white">
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
              onChange={(value) => {
                setExceptions(value);
                setValue("exceptions", value);
              }}
              generateSlots={handleGenerateSlots}
              disabled={scheduleLength === 0}
            />
          )}
        </div>

        <div className="min-w-0">
          {schedule && slotRules && exceptions && (
            <PreviewGeneratedSlots
              schedule={schedule}
              rules={slotRules}
              previewSlots={previewSlots}
              exceptions={exceptions}
              isPending={confirmSlotIsPending}
              previewDate={new Date("2026-09-03")}
              onDateChange={(newDate) => {
                console.log("Preview date:", newDate);
              }}
              onConfirm={() => {
                console.log(`All Confirmed Slots: `);
                console.log(previewSlots);
                const doctorClinic =
                  doctorDetails?.doctorClinicDetails.find(
                    (dc) => dc.clinic?.id === selectedClinicId,
                  ) ?? null;
                if (!doctorDetails?.doctor?.id || !doctorClinic?.clinic?.id || !doctorClinic.id) {
                  toast.error("Doctor or clinic details are missing");
                  return
                }

                if (doctorClinic && previewSlots.length > 0 && doctorDetails) {
                  const data: ConfirmedSlots = {
                    doctorId: doctorDetails?.doctor?.id!,
                    clinicId: doctorClinic?.clinic?.id!,
                    doctorClinicId: doctorClinic.id!,
                    generatedSlots: previewSlots,
                  };
                  confirmSlotMutate(data);
                }
              }}
              disabled={false}
              onUnlock={() => {
                console.log("Unlock schedule");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
