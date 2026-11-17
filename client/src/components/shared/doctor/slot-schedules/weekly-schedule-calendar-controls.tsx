
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatDate } from "@/helpers/session-slot.helper";

import { STATUS_LABELS } from "@/constants/doctor-dashboard.constant";

import type { CalendarClinicDetails, SlotStatus } from "@/types/doctor-clinic";

interface WeeklyScheduleCalendarControlsProps {
  clinics: CalendarClinicDetails[];
  selectedClinic: string;
  selectedStatus: SlotStatus | "ALL";
  statusOrder: SlotStatus[];
  weekDates: Date[];
  filteredSlotsCount: number;
  setSelectedClinic: (clinicId: string) => void;
  setSelectedStatus: (status: SlotStatus | "ALL") => void;
  clearFilters: () => void;
  goToToday: () => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
}

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
}: WeeklyScheduleCalendarControlsProps) => {
  return (
    <>
      {/* Filters and Navigation */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-[#8b9ab0]">
            <Filter size={16} />
            <span className="text-xs font-medium">Filters</span>
          </div>

          {/* Clinic Filter */}
          <div className="relative">
            <Building2
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9ab0]"
            />

            <select
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(e.target.value)}
              className="h-10 min-w-[155px] appearance-none rounded-lg border border-white/10 bg-[#0d1a27] pl-9 pr-8 text-sm text-white outline-none transition-colors hover:border-white/20 focus:border-primary/50"
            >
              <option value="ALL">All Clinics</option>

              {clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.id ?? "noId"}>
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
              className="h-10 min-w-[155px] appearance-none rounded-lg border border-white/10 bg-[#0d1a27] px-3 pr-8 text-sm text-white outline-none transition-colors hover:border-white/20 focus:border-primary/50"
            >
              <option value="ALL">All Statuses</option>

              {statusOrder.map((status) => (
                <option key={status} value={status}>
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
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Today
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goToPreviousWeek}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <ChevronLeft size={18} />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goToNextWeek}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Calendar Information */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium text-[#8b9ab0]">
          {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
        </span>

        <span className="text-xs text-[#66758a]">
          {filteredSlotsCount} slots
        </span>
      </div>
    </>
  );
};

export default WeeklyScheduleCalendarControls;
