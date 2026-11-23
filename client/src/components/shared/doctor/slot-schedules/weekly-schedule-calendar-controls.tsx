import { Building2, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/helpers/session-slot.helper";
import { STATUS_LABELS, } from "@/constants/doctor-dashboard.constant";
import type { SlotStatus } from "@/types/doctor-clinic";
import type { WeeklyScheduleCalendarControlsProps } from "@/types/doctor-dashboard";

const WeeklyScheduleCalendarControls = ({
  clinics,
  selectedClinic,
  selectedStatus,
  statusOrder,
  weekDates,
  filteredSlotsCount,
  setSelectedClinic,
  setSelectedStatus,
  clearFilters,
  goToToday,
  goToPreviousWeek,
  goToNextWeek,
  isDark,
}: WeeklyScheduleCalendarControlsProps) => {
  const mutedTextClass = isDark ? "text-[#8b9ab0]" : "text-slate-500";

  const dropdownClass = isDark
    ? "border-white/10 bg-[#0d1a27] text-white hover:border-white/20"
    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300";

  const optionClass = isDark
    ? "bg-[#0d1a27] text-white"
    : "bg-white text-slate-700";

  const navigationButtonClass = isDark
    ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100";

  return (
    <>
      {/* Filters and Navigation */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex items-center gap-2 ${mutedTextClass}`}>
            <Filter size={16} />
            <span className="text-xs font-medium">Filters</span>
          </div>

          {/* Clinic Filter */}
          <div className="relative">
            <Building2
              size={15}
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${mutedTextClass}`}
            />

            <select
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(e.target.value)}
              className={`h-10 min-w-[155px] appearance-none rounded-lg border pl-9 pr-8 text-sm outline-none transition-colors focus:border-primary/50 ${dropdownClass}`}
            >
              <option value="ALL" className={optionClass}>
                All Clinics
              </option>

              {clinics.map((clinic) => (
                <option
                  key={clinic.id}
                  value={clinic.id ?? "noId"}
                  className={optionClass}
                >
                  {clinic.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as SlotStatus | "ALL")
              }
              className={`h-10 min-w-[155px] appearance-none rounded-lg border px-3 pr-8 text-sm outline-none transition-colors focus:border-primary/50 ${dropdownClass}`}
            >
              <option value="ALL" className={optionClass}>
                All Statuses
              </option>

              {statusOrder.map((status) => (
                <option key={status} value={status} className={optionClass}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          {(selectedClinic !== "ALL" || selectedStatus !== "ALL") && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-primary transition-colors hover:text-primary/70"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Week Navigation */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={goToToday}
            className={navigationButtonClass}
          >
            Today
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goToPreviousWeek}
            className={navigationButtonClass}
          >
            <ChevronLeft size={18} />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goToNextWeek}
            className={navigationButtonClass}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Calendar Information */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`text-sm font-medium ${mutedTextClass}`}>
          {weekDates.length > 0 && (
            <>
              {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
            </>
          )}
        </span>

        <span
          className={`text-xs ${isDark ? "text-[#66758a]" : "text-slate-500"}`}
        >
          {filteredSlotsCount} slots
        </span>
      </div>
    </>
  );
};

export default WeeklyScheduleCalendarControls;
