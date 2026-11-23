import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

import ColorPalettePreview from "./color-palette-preview.component";
import type { ColorPalette } from "@/types/admin/color-palette.types";
import { getColorPaletteCardTheme } from "@/helpers/admin/subscription.helper";

interface ColorPaletteCardProps {
  palette: ColorPalette;
  isDark: boolean;
  onEdit: (palette: ColorPalette) => void;
  onDelete: (palette: ColorPalette) => void;
}

const humanize = (key: string) => {
  const spaced = key
    .replace(/[\_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .trim();

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const ColorPaletteCard: React.FC<ColorPaletteCardProps> = ({
  palette,
  isDark,
  onEdit,
  onDelete,
}) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const entries = Object.entries(palette.colors);
  const active = entries.find(([key]) => key === activeKey);

  const theme = getColorPaletteCardTheme(isDark);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className={`group min-w-0 overflow-hidden rounded-2xl border p-3 transition-colors duration-200 sm:p-4 ${theme.card}`}
    >
      <div
        className={`flex h-16 gap-1 overflow-hidden rounded-xl ring-1 ring-inset sm:h-20 ${theme.swatchRing}`}
        onMouseLeave={() => setActiveKey(null)}
      >
        {entries.map(([key, color]) => (
          <button
            key={key}
            type="button"
            aria-label={`${humanize(key)}: ${color}`}
            onMouseEnter={() => setActiveKey(key)}
            onFocus={() => setActiveKey(key)}
            onBlur={() => setActiveKey(null)}
            style={{ backgroundColor: color }}
            className={`min-w-0 cursor-default outline-none transition-[flex-grow] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80 ${
              activeKey === key ? "grow-[2.5]" : "grow"
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`truncate text-sm font-semibold ${theme.heading}`}>
              {palette.name}
            </h3>

            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                palette.isActive
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-gray-500/10 text-gray-500"
              }`}
            >
              {palette.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <p
            className={`mt-0.5 flex h-4 items-center gap-1.5 truncate text-xs ${theme.muted}`}
            aria-live="polite"
          >
            {active ? (
              <>
                <span
                  className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ring-1 ${theme.swatchRing}`}
                  style={{ backgroundColor: active[1] }}
                />

                <span className={`truncate font-medium ${theme.value}`}>
                  {humanize(active[0])}
                </span>

                <span className="font-mono tabular-nums">{active[1]}</span>
              </>
            ) : (
              `${entries.length} status colors`
            )}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-0.5 transition-opacity duration-200 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(palette)}
            title="Edit palette"
            aria-label={`Edit ${palette.name}`}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors focus-visible:ring-2 ${theme.action}`}
          >
            <Pencil size={14} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(palette)}
            title="Delete palette"
            aria-label={`Delete ${palette.name}`}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors focus-visible:ring-2 ${theme.delete}`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className={`mt-3 rounded-xl border p-3 ${theme.preview}`}>
        <ColorPalettePreview colors={palette.colors} isDark={isDark} compact />
      </div>
    </motion.div>
  );
};

export default ColorPaletteCard;
