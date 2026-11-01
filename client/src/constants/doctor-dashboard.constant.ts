import type { SlotStatus } from "@/types/doctor-clinic";


export const CALENDAR_STATUS_STYLES: Record<SlotStatus, string> = {
  AVAILABLE:
    "border border-[#287EBB]/50 bg-[#122D45] text-[#B9E2FF] shadow-sm shadow-[#38A8FF]/5 transition-all duration-200 hover:border-[#38A8FF]/70 hover:bg-[#173955] hover:shadow-md hover:shadow-[#38A8FF]/10",

  REPLACEABLE:
    "border border-[#9155C3]/50 bg-[#30213F] text-[#E6C8FF] shadow-sm shadow-[#C084FC]/5 transition-all duration-200 hover:border-[#C084FC]/70 hover:bg-[#3A2850] hover:shadow-md hover:shadow-[#C084FC]/10",

  BOOKED:
    "border border-[#B77B22]/50 bg-[#3D2C19] text-[#FFE0A3] shadow-sm shadow-[#F59E0B]/5 transition-all duration-200 hover:border-[#F59E0B]/70 hover:bg-[#49351D] hover:shadow-md hover:shadow-[#F59E0B]/10",

  APPROVED:
    "border border-[#218A68]/50 bg-[#15372F] text-[#A7F3D0] shadow-sm shadow-[#10B981]/5 transition-all duration-200 hover:border-[#10B981]/70 hover:bg-[#1B4438] hover:shadow-md hover:shadow-[#10B981]/10",

  CANCELLED:
    "border border-[#B84D5A]/45 bg-[#402327] text-[#FFC1C1] line-through decoration-[#F87171]/50 shadow-sm transition-all duration-200 hover:border-[#F87171]/65 hover:bg-[#4C292F]",

  EXPIRED:
    "border border-dashed border-[#64748B]/40 bg-[#283442]/60 text-[#C0CAD7]/60 opacity-60 cursor-not-allowed",
};

export const CALENDAR_STATUS_PARTS: Record<
  SlotStatus,
  { card: string; badge: string; dot: string }
> = {
  AVAILABLE: {
    card: CALENDAR_STATUS_STYLES.AVAILABLE,
    badge:
      "bg-[#38A8FF]/10 text-[#B9E2FF] ring-1 ring-inset ring-[#38A8FF]/30",
    dot: "bg-[#38A8FF] shadow-[0_0_8px_1px] shadow-[#38A8FF]/50",
  },

  REPLACEABLE: {
    card: CALENDAR_STATUS_STYLES.REPLACEABLE,
    badge:
      "bg-[#C084FC]/10 text-[#E6C8FF] ring-1 ring-inset ring-[#C084FC]/30",
    dot: "bg-[#C084FC] shadow-[0_0_8px_1px] shadow-[#C084FC]/50",
  },

  BOOKED: {
    card: CALENDAR_STATUS_STYLES.BOOKED,
    badge:
      "bg-[#F59E0B]/10 text-[#FFE0A3] ring-1 ring-inset ring-[#F59E0B]/30",
    dot: "bg-[#F59E0B] shadow-[0_0_8px_1px] shadow-[#F59E0B]/50",
  },

  APPROVED: {
    card: CALENDAR_STATUS_STYLES.APPROVED,
    badge:
      "bg-[#10B981]/10 text-[#A7F3D0] ring-1 ring-inset ring-[#10B981]/30",
    dot: "bg-[#10B981] shadow-[0_0_8px_1px] shadow-[#10B981]/50",
  },

  CANCELLED: {
    card: CALENDAR_STATUS_STYLES.CANCELLED,
    badge:
      "bg-[#F87171]/10 text-[#FFC1C1] ring-1 ring-inset ring-[#F87171]/30",
    dot: "bg-[#F87171]",
  },

  EXPIRED: {
    card: CALENDAR_STATUS_STYLES.EXPIRED,
    badge:
      "bg-[#94A3B8]/10 text-[#C0CAD7] ring-1 ring-inset ring-[#94A3B8]/20",
    dot: "bg-[#94A3B8]",
  },
};

export const STATUS_LABELS: Record<SlotStatus, string> = {
  AVAILABLE: "Available",
  REPLACEABLE: "Replaceable",
  BOOKED: "Booked",
  APPROVED: "Approved",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
};

export const MOBILE_BREAKPOINT = 1024;

export const TIME_COLUMN_WIDTH = "100px";
