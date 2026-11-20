import type {
  ColorPalette,
  PaletteColors,
} from "@/types/admin/color-palette.types";
import { memo, useEffect, useRef, useState } from "react";

type RowProps = {
  status: string;
  label: string;
  color: string;
  theme: { section: string; heading: string; description: string };
  onCommit: (status: keyof PaletteColors, value: string) => void;
};

export const ColorRow = memo(function ColorRow({
  status,
  label,
  color,
  theme,
  onCommit,
}: RowProps) {
  const [draft, setDraft] = useState(color);
  const frame = useRef<number | null>(null);

  // Keep in sync if the parent changes the color (e.g. reset)
  useEffect(() => setDraft(color), [color]);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const handleChange = (value: string) => {
    setDraft(value); // cheap, local to this row only

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() =>
      onCommit(status as keyof PaletteColors, value),
    );
  };

  return (
    <label
      className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 pr-3
        transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-md
        focus-within:ring-2 focus-within:ring-offset-0 ${theme.section}`}
      style={{ ["--tw-ring-color" as string]: `${draft}66` }}
    >
      <span
        className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg shadow-inner
          ring-1 ring-black/10 transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: draft }}
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
        <input
          type="color"
          value={draft}
          onChange={(e) => handleChange(e.target.value)}
          aria-label={`${label} color`}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className={`truncate text-sm font-semibold ${theme.heading}`}>
          {label}
        </span>
        <span
          className={`font-mono text-[11px] uppercase tracking-wide ${theme.description}`}
        >
          {draft}
        </span>
      </span>
    </label>
  );
});
