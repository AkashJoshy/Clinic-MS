import {
  CALENDAR_STATUS_LABELS,
  CALENDAR_STATUSES,
} from "@/constants/color-palette.constant";
import { getColorPalettePreviewTheme } from "@/helpers/admin/subscription.helper";
import type { PaletteColors } from "@/types/admin/color-palette.types";
import React from "react";

interface ColorPalettePreviewProps {
  colors: PaletteColors;
  isDark: boolean;
  compact?: boolean;
}

const ColorPalettePreview: React.FC<ColorPalettePreviewProps> = ({
  colors,
  isDark,
  compact = false,
}) => {
  const theme = getColorPalettePreviewTheme(isDark);

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {CALENDAR_STATUSES.map((status) => {
        const color = colors[status];
        const label = CALENDAR_STATUS_LABELS[status];

        return (
          <div key={status} className="flex items-center justify-between gap-3">
            <span className={`text-xs font-medium ${theme.label}`}>
              {label}
            </span>

            <div className="flex items-center gap-2">
              {!compact && (
                <span className={`font-mono text-[10px] ${theme.hexCode}`}>
                  {color.toUpperCase()}
                </span>
              )}

              <span
                className="h-3 w-3 rounded-full ring-1 ring-black/5"
                style={{ backgroundColor: color }}
              />

              <span
                className="rounded-md px-2.5 py-1 text-[10px] font-semibold"
                style={{
                  color,
                  backgroundColor: `${color}18`,
                  boxShadow: `inset 0 0 0 1px ${color}45`,
                }}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColorPalettePreview;
