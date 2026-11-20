import type { CALENDAR_STATUSES } from "@/constants/color-palette.constant";

export type PaletteColors = Record<CalendarStatus, string>;

export interface ColorPalette {
  id: string;
  name: string;
  colors: PaletteColors;
  isActive: boolean;
}

export type CalendarStatus = (typeof CALENDAR_STATUSES)[number];

