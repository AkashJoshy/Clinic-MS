import { ALL_DAYS, DAY_SHORT } from "@/constants/Appointment.constants";
import { useAuthStore } from "@/store";
import type { DoctorProfile } from "@/types/common";
import { MoveRight, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationalModal from "./DeleteConfirmationalModal";
import type { SelectedDept, SelectedDoctor } from "@/types/clinic";
import { useMutate } from "@/hooks/useMutate";

function getInitials(name: string) {
  let initial = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return initial.slice(1, 3) ?? initial.slice(0, 2);
}


function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.236 2.5L10 3.91l-2 1.95.472 2.755L6 7.25l-2.472 1.365L4 5.86 2 3.91l2.764-.41L6 1z"
            fill={star <= Math.round(rating) ? "#1dc465" : "none"}
            stroke={star <= Math.round(rating) ? "#1dc465" : "#334155"}
            strokeWidth="0.8"
          />
        </svg>
      ))}
    </div>
  );
}

export default function DoctorCard({
  clinicDetails,
  doctorClinic,
  doctor,
  departmentDetails,
  user,
  handleDelete
}: DoctorProfile) {
  const [hovered, setHovered] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const userState = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  

  const {
    displayName,
    doctorCode,
    gender,
    specialization,
    qualification,
    experienceYears,
  } = doctor;
  const {
    consultationFee,
    status,
    type,
    isLeave,
    schedule,
    role,
    slotDuration,
  } = doctorClinic;


  const specializationLabel = Array.isArray(specialization)
    ? (specialization as string[]).join(", ") || "—"
    : specialization || "—";

  const statusConfig = {
    ACTIVE: {
      label: "Active",
      dot: "bg-[#1dc465]",
      text: "text-[#1dc465]",
      ring: "border-[#1dc465]/20 bg-[#1dc465]/8",
    },
    INACTIVE: {
      label: "Inactive",
      dot: "bg-[#8b9ab0]",
      text: "text-[#8b9ab0]",
      ring: "border-white/10 bg-white/5",
    },
    TERMINATED: {
      label: "Terminated",
      dot: "bg-red-400",
      text: "text-red-400",
      ring: "border-red-400/20 bg-red-400/8",
    },
  }[status];

  const typeConfig = {
    ONLINE: {
      label: "Online",
      icon: "🌐",
      color: "text-blue-400",
      ring: "border-blue-400/20 bg-blue-400/8",
    },
    OFFLINE: {
      label: "In-Person",
      icon: "🏥",
      color: "text-amber-400",
      ring: "border-amber-400/20 bg-amber-400/8",
    },
    BOTH: {
      label: "Both",
      icon: "⚡",
      color: "text-violet-400",
      ring: "border-violet-400/20 bg-violet-400/8",
    },
  }[type];

  const roleConfig = {
    CONSULTANT: {
      label: "Consultant",
      color: "text-sky-400",
      ring: "border-sky-400/20 bg-sky-400/8",
    },
    RESIDENT: {
      label: "Resident",
      color: "text-lime-400",
      ring: "border-lime-400/20 bg-lime-400/8",
    },
    VISITING: {
      label: "Visiting",
      color: "text-orange-400",
      ring: "border-orange-400/20 bg-orange-400/8",
    },
    PERMANENT: {
      label: "Permanent",
      color: "text-teal-400",
      ring: "border-teal-400/20 bg-teal-400/8",
    },
  }[role];

  const avatarGradient = {
    Male: "from-blue-600/80 to-[#0d1a27]",
    Female: "from-pink-600/80 to-[#0d1a27]",
    Others: "from-violet-600/80 to-[#0d1a27]",
    PREFER_NOT_TO_SAY: "from-violet-600/80 to-[#0d1a27]",
  }[doctor.gender.toLowerCase()];

  const todayName =
    ALL_DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  return (
    <div
      key={doctor.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative w-full max-w-sm rounded-2xl overflow-hidden select-none
        bg-[#0d1a27] border transition-all duration-300
        ${
          hovered
            ? "border-[#1dc465]/30 shadow-[0_8px_32px_rgba(29,196,101,0.08)] -translate-y-1"
            : "border-white/8 shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
        }
        ${isLeave ? "opacity-60 grayscale-[0.4]" : ""}
      `}
    >
      <div
        className={`h-0.75 w-full bg-linear-to-r ${
          isLeave
            ? "from-[#8b9ab0] to-[#334155]"
            : "from-[#1dc465] to-[#0ea5e9]"
        }`}
      />

      {departmentDetails && departmentDetails.status === "INACTIVE" && (
        <div className="flex items-center justify-center gap-2 bg-red-400/10 border-b border-amber-400/20 py-1.5">
          <span className="text-xs font-semibold text-red-500 tracking-wide">
            Department is currently inactive
          </span>
        </div>
      )}

      {isLeave && (
        <div className="flex items-center justify-center gap-2 bg-amber-400/10 border-b border-amber-400/20 py-1.5">
          <span className="text-xs font-semibold text-amber-400 tracking-wide">
            🏖️ On Leave yes,
          </span>
        </div>
      )}

      <div
        className={`p-5 ${departmentDetails ? (departmentDetails.status === "INACTIVE" ? `blur-[2px] pointer-events-none` : "") : ""}`}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`relative shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center border border-white/10`}
          >
            <span className="text-white font-bold text-lg tracking-tight">
              {getInitials(displayName)}
            </span>
            {status === "ACTIVE" && !isLeave && (
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#1dc465] border-2 border-[#0d1a27]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-[15px] leading-tight truncate">
              {displayName}
            </h3>
            <p className="text-[#8b9ab0] text-xs mt-0.5 truncate">
              {specializationLabel} ·{" "}
              {departmentDetails ? departmentDetails.name : "No Department"}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[#4a5568] text-[11px] font-mono">
                {doctorCode}
              </p>
              <span className="text-[#2d3748] text-[10px]">·</span>
              <p className="text-[#4a5568] text-[11px]">
                {slotDuration}min slots
              </p>
            </div>

            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold ${statusConfig.ring} ${statusConfig.text}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}
                />
                {statusConfig.label}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold ${typeConfig.ring} ${typeConfig.color}`}
              >
                {typeConfig.icon} {typeConfig.label}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold ${roleConfig.ring} ${roleConfig.color}`}
              >
                {roleConfig.label}
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-1">
            <span className="text-[#1dc465] font-bold text-base leading-none">
              ₹{consultationFee}
            </span>
            <span className="text-[#4a5568] text-[10px]">per visit</span>
          </div>
        </div>

        <div className="h-px bg-white/5 mb-4" />

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#4a5568] text-[10px] uppercase tracking-widest font-semibold">
              Qualification
            </span>
            <span className="text-white text-xs font-medium truncate">
              {qualification}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[#4a5568] text-[10px] uppercase tracking-widest font-semibold">
              Experience
            </span>
            <span className="text-white text-xs font-medium">
              {experienceYears} yrs
            </span>
          </div>
          <div className="flex flex-col gap-0.5 items-end">
            <span className="text-[#4a5568] text-[10px] uppercase tracking-widest font-semibold">
              Clinic
            </span>
            <span
              className="text-white text-xs font-medium truncate max-w-20 text-right"
              title={clinicDetails.name}
            >
              {clinicDetails.name}
            </span>
          </div>
        </div>

        {schedule.length > 0 && (
          <button
            type="button"
            onClick={() => setScheduleOpen((p) => !p)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/3 border border-white/6 hover:border-[#1dc465]/20 hover:bg-[#1dc465]/5 transition-all group"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">📅</span>
              <span className="text-[#8b9ab0] text-xs font-semibold group-hover:text-[#1dc465] transition-colors">
                Schedule
              </span>
              {schedule.some((s) => s.dayOfWeek === todayName) && (
                <span className="px-1.5 py-0.5 rounded-md bg-[#1dc465]/10 border border-[#1dc465]/20 text-[#1dc465] text-[10px] font-semibold">
                  Working today
                </span>
              )}
            </div>
            <svg
              className={`w-4 h-4 text-[#4a5568] transition-transform duration-200 ${scheduleOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}

        {scheduleOpen && (
          <div className="mt-2 space-y-1.5">
            {ALL_DAYS.map((day) => {
              const entry = schedule.find((s) => s.dayOfWeek === day);
              const isToday = day === todayName;
              return (
                <div
                  key={day}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all
                    ${
                      isToday
                        ? "bg-[#1dc465]/8 border border-[#1dc465]/15"
                        : "bg-white/2 border border-transparent"
                    }`}
                >
                  <span
                    className={`text-xs font-semibold w-8 ${isToday ? "text-[#1dc465]" : "text-[#4a5568]"}`}
                  >
                    {DAY_SHORT[day]}
                  </span>
                  {entry ? (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {entry.sessions.map((session, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium
                            ${
                              isToday
                                ? "bg-[#1dc465]/15 text-[#1dc465] border border-[#1dc465]/20"
                                : "bg-white/5 text-[#8b9ab0] border border-white/8"
                            }`}
                        >
                          {session.startTime}–{session.endTime}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] text-[#2d3748] font-medium">
                      Off
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {userState?.role === "CLINIC" && (
          <div className="mt-5 flex pt-4 border-t border-white/5">
            <button
              onClick={() => {
                navigate(`/clinic/doctors/${doctorClinic.id}`);
              }}
              className="cursor-pointer group flex items-center justify-end gap-2 text-sm font-semibold text-[#1dc465] transition-all duration-200 hover:gap-3 hover:text-[#27d873]"
            >
              <span>Edit Details</span>
              <MoveRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
            
            <button
              onClick={() => {
                if (doctorClinic.status === "ACTIVE") {
                  handleDelete({
                    id: doctorClinic.id!,
                    name: doctor.displayName,
                    status: doctorClinic.status,
                    mode: doctorClinic.type,
                    action: "DELETE",
                  });
                } else {
                  handleDelete({
                    id: doctorClinic.id!,
                    name: doctor.displayName,
                    status: doctorClinic.status,
                    action: "RESTORE",
                  });
                }
              }}
              className="ml-auto cursor-pointer"
            >
              <Trash size={18} className="text-red-600" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
