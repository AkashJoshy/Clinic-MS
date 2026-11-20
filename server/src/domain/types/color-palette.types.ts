import type { ColorPalette } from "../entities/color-palette.entity.ts";

export const CALENDAR_STATUSES = [
  "AVAILABLE",
  "REPLACEABLE",
  "BOOKED",
  "APPROVED",
  "CANCELLED",
  "EXPIRED",
] as const;

export type CalendarStatus = (typeof CALENDAR_STATUSES)[number];

export type PaletteColors = Record<CalendarStatus, string>;

export type BaseColorPalette = Omit<
  ColorPalette,
  "activate" | "updateDetails" | "deactivate"
>;

export type SafeColorPalette = Omit<BaseColorPalette, "createdAt">;

export interface ColorPaletteProps {
  id: string | null;
  name: string;
  colors: PaletteColors;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface UpdatePaletteProps {
  name?: string;
  colors?: PaletteColors;
}

export type CreateColorPaletteData = Omit<SafeColorPalette, "id" | "updatedAt">;
