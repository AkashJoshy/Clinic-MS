import type {
  CalendarStatus,
  ColorPalette,
  PaletteColors,
} from "@/types/admin/color-palette.types";

export const DEFAULT_COLORS: PaletteColors = {
  AVAILABLE: "#38A8FF",
  REPLACEABLE: "#C084FC",
  BOOKED: "#F59E0B",
  APPROVED: "#10B981",
  CANCELLED: "#F87171",
  EXPIRED: "#94A3B8",
};

export const CALENDAR_STATUS_LABELS: Record<CalendarStatus, string> = {
  AVAILABLE: "Available",
  REPLACEABLE: "Replaceable",
  BOOKED: "Booked",
  APPROVED: "Approved",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
};

export const CALENDAR_STATUSES = [
  "AVAILABLE",
  "REPLACEABLE",
  "BOOKED",
  "APPROVED",
  "CANCELLED",
  "EXPIRED",
] as const;


export const INITIAL_PALETTES: ColorPalette[] = [
  {
    id: "palette-primary",
    name: "Primary",
    isActive: true,
    colors: {
      AVAILABLE: "#38A8FF",
      REPLACEABLE: "#C084FC",
      BOOKED: "#F59E0B",
      APPROVED: "#10B981",
      CANCELLED: "#F87171",
      EXPIRED: "#94A3B8",
    },
  },
  {
    id: "palette-rose",
    name: "Rose",
    isActive: true,
    colors: {
      AVAILABLE: "#FB7185",
      REPLACEABLE: "#0EA5E9",
      BOOKED: "#F97316",
      APPROVED: "#10B981",
      CANCELLED: "#FCA5A5",
      EXPIRED: "#94A3B8",
    },
  },
];